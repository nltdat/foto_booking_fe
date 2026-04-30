import { apiClient, publicApiClient } from "@/lib/axios";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  TokenPairResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  UserProfile
} from "@/types/auth";

export type ApiErrorData = {
  detail?: string;
  uid?: string[];
  token?: string[];
  username?: string[];
  email?: string[];
  password?: string[];
  password_confirm?: string[];
  first_name?: string[];
  last_name?: string[];
  role?: string[];
  non_field_errors?: string[];
  new_password?: string[];
  new_password_confirm?: string[];
};

export class ApiError extends Error {
  status: number;
  data: ApiErrorData;

  constructor(status: number, data: ApiErrorData, fallbackMessage: string) {
    super(data.detail ?? fallbackMessage);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function login(payload: LoginRequest): Promise<TokenPairResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json()) as TokenPairResponse & ApiErrorData;

  if (!response.ok) {
    throw new ApiError(response.status, data, "Đăng nhập thất bại.");
  }

  return data;
}

export async function register(payload: RegisterRequest): Promise<UserProfile> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json()) as UserProfile & ApiErrorData;

  if (!response.ok) {
    throw new ApiError(response.status, data, "Đăng ký thất bại.");
  }

  return data;
}

export async function requestPasswordReset(
  payload: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json()) as ForgotPasswordResponse;

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data,
      "Không thể gửi email đặt lại mật khẩu."
    );
  }

  return data;
}

export async function logout(payload: LogoutRequest): Promise<LogoutResponse> {
  const response = await apiClient.post<LogoutResponse>("/api/auth/logout/", payload);
  return response.data;
}

export async function resetPassword(
  payload: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json()) as ResetPasswordResponse & ApiErrorData;

  if (!response.ok) {
    throw new ApiError(response.status, data, "Không thể đặt lại mật khẩu.");
  }

  return data;
}

export async function refreshToken(
  payload: TokenRefreshRequest
): Promise<TokenRefreshResponse> {
  const response = await publicApiClient.post<TokenRefreshResponse>(
    "/api/auth/token/refresh/",
    payload
  );
  return response.data;
}
