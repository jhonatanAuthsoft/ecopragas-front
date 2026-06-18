import axios from "axios";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth";

export const serverRequest = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: { indexes: null },
});

serverRequest.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

serverRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();

      const isAuthRoute = window.location.pathname.startsWith(ROUTES.AUTH.LOGIN);
      if (!isAuthRoute) {
        window.location.assign(ROUTES.AUTH.LOGIN);
      }
    }

    return Promise.reject(error);
  },
);
