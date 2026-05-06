import {
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  updateStoredAccessToken
} from "@/lib/token-storage";
import { clearAuthSession, setAuthSession } from "@/store/auth-store";
import type {
  PaginatedPhotographersResponse,
  PhotographerFavoriteResponse
} from "@/types/photographer";

export type PhotographerQueryInput = URLSearchParams | Record<string, string | number | undefined>;

function toSearchParams(input?: PhotographerQueryInput): URLSearchParams {
  if (!input) {
    return new URLSearchParams();
  }

  if (input instanceof URLSearchParams) {
    return new URLSearchParams(input.toString());
  }

  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });
  return params;
}

function getAuthorizationHeaders(): HeadersInit {
  const accessToken = getAccessToken();
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  const user = getStoredUser();

  if (!refreshToken || !user) {
    clearAuthSession();
    return null;
  }

  const response = await fetch("/api/auth/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refresh: refreshToken }),
    cache: "no-store"
  });

  if (!response.ok) {
    clearAuthSession();
    return null;
  }

  const data = (await response.json()) as { access?: string };
  if (!data.access) {
    clearAuthSession();
    return null;
  }

  updateStoredAccessToken(data.access);
  setAuthSession({
    accessToken: data.access,
    refreshToken,
    user
  });
  return data.access;
}

async function fetchWithAuthRetry(
  input: RequestInfo | URL,
  init: RequestInit,
  retryAsAnonymous = false
): Promise<Response> {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...getAuthorizationHeaders(),
      ...init.headers
    }
  });

  if (response.status !== 401 || !getAccessToken()) {
    return response;
  }

  const nextAccessToken = await refreshAccessToken();

  if (!nextAccessToken) {
    if (retryAsAnonymous) {
      const { Authorization: _authorization, ...headers } = {
        ...getAuthorizationHeaders(),
        ...init.headers
      } as Record<string, string>;

      return fetch(input, {
        ...init,
        headers
      });
    }

    return response;
  }

  return fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${nextAccessToken}`
    }
  });
}

async function readJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

export async function getPhotographers(
  query?: PhotographerQueryInput
): Promise<PaginatedPhotographersResponse> {
  const params = toSearchParams(query);
  const queryString = params.toString();
  const response = await fetchWithAuthRetry(
    `/api/photographers/${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
      cache: "no-store"
    },
    true
  );

  const data = await readJsonResponse<PaginatedPhotographersResponse>(response);

  if (!response.ok) {
    throw new Error("Unable to fetch photographers.");
  }

  return data;
}

export async function favoritePhotographer(
  photographerId: number
): Promise<PhotographerFavoriteResponse> {
  const response = await fetchWithAuthRetry(`/api/photographers/${photographerId}/favorite/`, {
    method: "POST",
    cache: "no-store"
  });

  const data = await readJsonResponse<PhotographerFavoriteResponse>(response);

  if (!response.ok) {
    throw new Error("Unable to favorite photographer.");
  }

  return data;
}

export async function unfavoritePhotographer(
  photographerId: number
): Promise<PhotographerFavoriteResponse> {
  const response = await fetchWithAuthRetry(`/api/photographers/${photographerId}/favorite/`, {
    method: "DELETE",
    cache: "no-store"
  });

  const data = await readJsonResponse<PhotographerFavoriteResponse>(response);

  if (!response.ok) {
    throw new Error("Unable to unfavorite photographer.");
  }

  return data;
}
