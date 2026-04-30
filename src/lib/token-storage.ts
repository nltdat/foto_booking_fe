import Cookies from "js-cookie";
import type { StoredAuthSession } from "@/types/auth";

const ACCESS_TOKEN_KEY = "fotonow.access_token";
const REFRESH_TOKEN_KEY = "fotonow.refresh_token";
const USER_KEY = "fotonow.user";
const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ?? "access_token";

function canUseBrowserStorage(): boolean {
  return typeof window !== "undefined";
}

function removeStoredUser(): void {
  window.localStorage.removeItem(USER_KEY);
}

export function getAccessToken(): string | null {
  if (!canUseBrowserStorage()) {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!canUseBrowserStorage()) {
    return null;
  }

  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser(): StoredAuthSession["user"] | null {
  if (!canUseBrowserStorage()) {
    return null;
  }

  const rawUser = window.localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as StoredAuthSession["user"];
  } catch {
    removeStoredUser();
    return null;
  }
}

export function getStoredSession(): StoredAuthSession | null {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const user = getStoredUser();

  if (!accessToken || !refreshToken || !user) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
    user
  };
}

export function persistAuthSession(session: StoredAuthSession): void {
  if (!canUseBrowserStorage()) {
    return;
  }

  const writtenKeys: string[] = [];
  let cookieWritten = false;

  try {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
    writtenKeys.push(ACCESS_TOKEN_KEY);

    window.localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
    writtenKeys.push(REFRESH_TOKEN_KEY);

    window.localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    writtenKeys.push(USER_KEY);

    Cookies.set(AUTH_COOKIE_NAME, session.accessToken, { sameSite: "lax" });
    cookieWritten = true;
  } catch (error) {
    for (const key of writtenKeys) {
      window.localStorage.removeItem(key);
    }

    if (cookieWritten) {
      Cookies.remove(AUTH_COOKIE_NAME);
    }

    throw error;
  }
}

export function updateStoredAccessToken(accessToken: string): void {
  if (!canUseBrowserStorage()) {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  Cookies.set(AUTH_COOKIE_NAME, accessToken, { sameSite: "lax" });
}

export function clearAuthStorage(): void {
  if (!canUseBrowserStorage()) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  Cookies.remove(AUTH_COOKIE_NAME);
}
