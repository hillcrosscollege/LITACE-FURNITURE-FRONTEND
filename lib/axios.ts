import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

// Main API instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Separate instance for refresh — uses same base URL
// but NEVER goes through the main interceptor (avoids infinite loop)
const refreshApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Token helpers
export const tokenStorage = {
  getAccess: () => localStorage.getItem("access_token"),
  getRefresh: () => localStorage.getItem("refresh_token"),
  setAccess: (t: string) => localStorage.setItem("access_token", t),
  setRefresh: (t: string) => localStorage.setItem("refresh_token", t),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  },
  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

// Track if a refresh is already in flight
// so concurrent 401s don't trigger multiple refresh calls
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
  refreshQueue.forEach((resolve) => resolve(token));
  refreshQueue = [];
};

const redirectToLogin = () => {
  tokenStorage.clearTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/sign-in";
  }
};

// ── Request interceptor ───────────────────────────────────────────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccess();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ──────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Not a 401 or already retried → reject immediately
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Mark this request as retried so we don't loop
    originalRequest._retry = true;

    // If a refresh is already in progress, queue this request
    // and wait for the new token
    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push((newToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = tokenStorage.getRefresh();

      if (!refreshToken) {
        redirectToLogin();
        return Promise.reject(error);
      }

      // Call refresh endpoint using the separate instance
      // to avoid triggering this same interceptor again
      const { data } = await refreshApi.post("/auth/refresh", {
        refreshToken,
      });

      const newAccessToken = data.accessToken;
      const newRefreshToken = data.refreshToken ?? refreshToken;

      // Persist new tokens
      tokenStorage.setTokens(newAccessToken, newRefreshToken);

      // Resolve queued requests with the new token
      processQueue(newAccessToken);

      // Retry the original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh itself failed — session is dead
      refreshQueue = [];
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
