import type { InternalAxiosRequestConfig } from "axios";

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token: string | null = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
