import axios, { AxiosError, AxiosInstance } from "axios";

import { requestInterceptor } from "./interceptors";

const requestor: AxiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_API_ENDPOINT as string).trim(),
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

requestor.interceptors.request.use(requestInterceptor, (error: AxiosError) => {
  return Promise.reject(error);
});

export default requestor;
