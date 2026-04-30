import { create } from "zustand";
import { clearAuthStorage, getStoredSession, persistAuthSession } from "@/lib/token-storage";
import type { AuthState, StoredAuthSession } from "@/types/auth";

function applySession(set: (partial: Partial<AuthState>) => void, session: StoredAuthSession): void {
  persistAuthSession(session);
  set({
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    user: session.user,
    isAuthenticated: true
  });
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isHydrated: false,
  setSession: (session) => {
    applySession(set, session);
  },
  clearSession: () => {
    clearAuthStorage();
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false
    });
  },
  hydrateFromStorage: () => {
    const session = getStoredSession();

    if (!session) {
      set({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
        isHydrated: true
      });
      return;
    }

    set({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: session.user,
      isAuthenticated: true,
      isHydrated: true
    });
  }
}));

export function setAuthSession(session: StoredAuthSession): void {
  useAuthStore.getState().setSession(session);
}

export function clearAuthSession(): void {
  useAuthStore.getState().clearSession();
}
