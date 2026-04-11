import axios from "axios";
import { toast } from "sonner";
import { cookies } from "./utils";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const BASE_URL = "/api-proxy";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

apiClient.interceptors.request.use(
  (config) => {
    // Read from cookies (Secure, Experts choice)
    const token = cookies.get("elevate_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    
    // Auto-logout if token is expired or invalid
    if (status === 401) {
      cookies.remove("elevate_token");
      // Use window.location for a hard refresh to clear all app state on logout
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/signin')) {
        window.location.href = "/signin?message=Session expired. Please login again.";
      }
    } else {
      toast.error("API Error", {
        description: message,
      });
    }

    return Promise.reject(error);
  }
);
