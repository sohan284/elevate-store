import { apiClient, ApiResponse } from "@/lib/api-client";

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: string;
  status: string;
  emailVerifiedAt: string | null;
  bio: string | null;
  address: string;
  phoneNumber: string;
  isDeleted: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  avatar?: File | null;
}

export interface RegisterResponse {
  message: string;
  requiresVerification: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: string;
}

export const authService = {
  register: async (data: RegisterInput) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("address", data.address);
    
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    const response = await apiClient.post<ApiResponse<RegisterResponse>>("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  verifyEmail: async (email: string, code: string) => {
    const response = await apiClient.post<ApiResponse<{ user: User; token: string }>>("/auth/verify-email", {
      email,
      code,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },
};
