import axios from "axios";
import { toast } from "sonner";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ── Define your Base URL here (ONE TIME ONLY) ─────────────────────────
const BASE_URL = "/api-proxy";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

// ── Request Interceptor (Auth, Logging) ─────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMDIzYjFhLWFhMTMtNDBhZS1hYTkxLTg5YjhhMWJjZTRjYSIsImVtYWlsIjoiYWx0YWoxMDE5QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NTI4NTYxNn0.g6SSHxPdSkn1cEhYAHSUBd7rP9BBYjSZcP8fxxWFh5I";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor (Global Error Handling) ─────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    
    // Global toast for errors
    toast.error("API Error", {
      description: message,
    });

    return Promise.reject(error);
  }
);
