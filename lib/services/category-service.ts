import { apiClient, ApiResponse } from "@/lib/api-client";

export interface CategoryInput {
  name: string;
  image: File | string;
  description: string;
}

export interface Category {
  _id: string; // MongoDB formatted ID
  id: string;   // UI-facing ID
  name: string;
  image: {
    url: string;
    public_id?: string;
  };
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export const categorieservice = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<Category[]>>("/categories");
    return response.data;
  },

  create: async (data: CategoryInput) => {
    let payload: any = data;

    if (data.image instanceof File) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("image", data.image);
      payload = formData;
    }

    const response = await apiClient.post<ApiResponse<Category>>("/categories", payload);
    return response.data;
  },

  update: async (id: string, data: Partial<CategoryInput>) => {
    let payload: any = data;

    if (data.image instanceof File) {
      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);
      formData.append("image", data.image);
      payload = formData;
    }

    const response = await apiClient.patch<ApiResponse<Category>>(`/categories/${id}`, payload);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<any>>(`/categories/${id}`);
    return response.data;
  },
};
