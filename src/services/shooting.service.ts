import type { Booking, CreateBookingInput, PaginatedShootingsResponse } from "@/types/shooting";
import {
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  updateStoredAccessToken
} from "@/lib/token-storage";
import { clearAuthSession, setAuthSession } from "@/store/auth-store";

async function readJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

type ShootingQueryInput = {
  page?: number;
  page_size?: number;
};

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

  try {
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
  } catch {
    clearAuthSession();
    return null;
  }
}

async function fetchWithAuthRetry(
  input: RequestInfo | URL,
  init: RequestInit
): Promise<Response> {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...getAuthorizationHeaders(),
      ...init.headers
    }
  });

  if (response.status !== 401) {
    return response;
  }

  const nextAccessToken = await refreshAccessToken();

  if (!nextAccessToken) {
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

export async function getShootings(query: ShootingQueryInput = {}): Promise<PaginatedShootingsResponse> {
  const params = new URLSearchParams();

  if (query.page) {
    params.set("page", String(query.page));
  }

  if (query.page_size) {
    params.set("page_size", String(query.page_size));
  }

  const queryString = params.toString();
  const response = await fetchWithAuthRetry(`/api/bookings${queryString ? `?${queryString}` : ""}`, {
    method: "GET",
    cache: "no-store"
  });
  const data = await readJsonResponse<PaginatedShootingsResponse>(response);

  if (!response.ok) {
    throw new Error("Unable to fetch shootings.");
  }

  return data;
}

export async function getShooting(id: string): Promise<Booking> {
  const response = await fetchWithAuthRetry(`/api/bookings/${encodeURIComponent(id)}`, {
    method: "GET",
    cache: "no-store"
  });
  const data = await readJsonResponse<Booking>(response);

  if (!response.ok) {
    throw new Error("Unable to fetch shooting.");
  }

  return data;
}

export async function createBooking(payload: CreateBookingInput): Promise<Booking> {
  const response = await fetchWithAuthRetry("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const data = await readJsonResponse<Booking>(response);

  if (!response.ok) {
    throw new Error("Unable to create booking.");
  }

  return data;
}
