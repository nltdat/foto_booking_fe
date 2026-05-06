import { getAccessToken } from "@/lib/token-storage";
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
  const response = await fetch(`/api/photographers${queryString ? `?${queryString}` : ""}`, {
    method: "GET",
    headers: getAuthorizationHeaders(),
    cache: "no-store"
  });

  const data = await readJsonResponse<PaginatedPhotographersResponse>(response);

  if (!response.ok) {
    throw new Error("Unable to fetch photographers.");
  }

  return data;
}

export async function favoritePhotographer(
  photographerId: number
): Promise<PhotographerFavoriteResponse> {
  const response = await fetch(`/api/photographers/${photographerId}/favorite`, {
    method: "POST",
    headers: getAuthorizationHeaders(),
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
  const response = await fetch(`/api/photographers/${photographerId}/favorite`, {
    method: "DELETE",
    headers: getAuthorizationHeaders(),
    cache: "no-store"
  });

  const data = await readJsonResponse<PhotographerFavoriteResponse>(response);

  if (!response.ok) {
    throw new Error("Unable to unfavorite photographer.");
  }

  return data;
}
