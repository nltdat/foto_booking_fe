export type UserRole = "CUSTOMER" | "PHOTOGRAPHER" | "ADMIN";

export interface JwtPayload {
  exp?: number;
  iat?: number;
  role?: UserRole;
  sub?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  detail: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  role?: UserRole;
}

export interface LogoutRequest {
  refresh: string;
}

export interface LogoutResponse {
  detail: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
}

export interface ResetPasswordRequest {
  uid: string;
  token: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ResetPasswordResponse {
  detail: string;
}

export interface TokenVerifyRequest {
  token: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  avatar_url: string | null;
  photographer_profile_id: string | null;
}

export interface TokenPairResponse {
  access: string;
  refresh: string;
  user: UserProfile;
}

export interface StoredAuthSession {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setSession: (session: StoredAuthSession) => void;
  clearSession: () => void;
  hydrateFromStorage: () => void;
}
