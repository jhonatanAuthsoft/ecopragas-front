import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

export const serverRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: { indexes: null },
});

serverRequest.interceptors.request.use((config) => {
  const token = useAuthStore((s) => s.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
