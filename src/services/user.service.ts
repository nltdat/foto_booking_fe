import { getAccessToken } from "@/lib/token-storage";
import { ApiError, type ApiErrorData } from "@/services/auth.service";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  UserProfile
} from "@/types/auth";

export type UpdateCurrentUserPayload = {
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  phone?: string;
  gender?: string;
  avatar?: File;
  cover_image?: File;
};

export async function updateCurrentUser(
  payload: UpdateCurrentUserPayload
): Promise<UserProfile> {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await fetch("/api/users/me", {
    method: "PATCH",
    headers: getAuthorizationHeaders(),
    body: formData
  });

  if (!response.ok) {
    throw new Error("Unable to update current user.");
  }

  return (await response.json()) as UserProfile;
}

export async function getCurrentUser(): Promise<UserProfile> {
  const response = await fetch("/api/users/me", {
    method: "GET",
    headers: getAuthorizationHeaders(),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to fetch current user.");
  }

  return (await response.json()) as UserProfile;
}

export async function changeCurrentUserPassword(
  payload: ChangePasswordRequest
): Promise<ChangePasswordResponse> {
  const response = await fetch("/api/auth/change-password", {
    method: "POST",
    headers: {
      ...getAuthorizationHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await readJsonResponse(response)) as ChangePasswordResponse & ApiErrorData;

  if (!response.ok) {
    throw new ApiError(response.status, data, "Không thể đổi mật khẩu.");
  }

  return data;
}

export async function deleteCurrentUser(
  payload: DeleteAccountRequest
): Promise<DeleteAccountResponse> {
  const response = await fetch("/api/users/me", {
    method: "DELETE",
    headers: {
      ...getAuthorizationHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await readJsonResponse(response)) as DeleteAccountResponse & ApiErrorData;

  if (!response.ok) {
    throw new ApiError(response.status, data, "Không thể xóa tài khoản.");
  }

  return data;
}

async function readJsonResponse(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return {};
  }

  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { detail: text };
  }
}

function getAuthorizationHeaders(): HeadersInit {
  const accessToken = getAccessToken();
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}
