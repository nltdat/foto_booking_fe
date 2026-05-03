import Axios, {
  AxiosError,
  AxiosHeaders,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig
} from "axios";
import { clearAuthSession, setAuthSession, useAuthStore } from "@/store/auth-store";
import { getAccessToken, getRefreshToken, getStoredUser, updateStoredAccessToken } from "@/lib/token-storage";

const axiosConfig: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
  timeout: 10000
};

export const apiClient = Axios.create(axiosConfig);
export const publicApiClient = Axios.create(axiosConfig);

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshRequest: Promise<string | null> | null = null;

function attachAuthorizationHeader(
  config: InternalAxiosRequestConfig,
  accessToken: string
): InternalAxiosRequestConfig {
  const headers = AxiosHeaders.from(config.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);
  config.headers = headers;
  return config;
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  const user = getStoredUser();

  if (!refreshToken || !user) {
    clearAuthSession();
    return null;
  }

  try {
    const response = await publicApiClient.post<{ access: string }>("/api/auth/token/refresh/", {
      refresh: refreshToken
    });

    const nextAccessToken = response.data.access;
    updateStoredAccessToken(nextAccessToken);
    setAuthSession({
      accessToken: nextAccessToken,
      refreshToken,
      user
    });
    return nextAccessToken;
  } catch {
    clearAuthSession();
    return null;
  }
}

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken() ?? useAuthStore.getState().accessToken;

  if (accessToken) {
    return attachAuthorizationHeader(config, accessToken);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;

    if (!originalRequest || status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!refreshRequest) {
      refreshRequest = refreshAccessToken().finally(() => {
        refreshRequest = null;
      });
    }

    const nextAccessToken = await refreshRequest;

    if (!nextAccessToken) {
      return Promise.reject(error);
    }

    return apiClient(attachAuthorizationHeader(originalRequest, nextAccessToken));
  }
);

export default apiClient;
