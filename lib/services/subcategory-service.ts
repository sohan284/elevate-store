import { apiClient, ApiResponse } from "@/lib/api-client";

export interface SubcategoryInput {
  name: string;
  image: File | string;
  description: string;
  categoriesId: string; // Foreign key
}

export interface Subcategory {
  _id: string; // MongoDB formatted ID
  id: string;   // UI-facing ID
  name: string;
  image: string | {
    url: string;
    public_id?: string;
  };
  description: string;
  categoriesId: string;
  category?: {
    _id: string;
    name: string;
  }; // Depending on backend populate
  createdAt?: string;
  updatedAt?: string;
}

export const subcategoryService = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<Subcategory[]>>("/sub-categories");
    return response.data;
  },

  create: async (data: SubcategoryInput) => {
    let payload: any = data;

    if (data.image instanceof File) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("categoriesId", data.categoriesId);
      formData.append("image", data.image);
      payload = formData;
    }

    const response = await apiClient.post<ApiResponse<Subcategory>>("/sub-categories", payload);
    return response.data;
  },

  update: async (id: string, data: Partial<SubcategoryInput>) => {
    let payload: any = data;

    if (data.image instanceof File) {
      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);
      if (data.categoriesId) formData.append("categoriesId", data.categoriesId);
      formData.append("image", data.image);
      payload = formData;
    }

    const response = await apiClient.patch<ApiResponse<Subcategory>>(`/sub-categories/${id}`, payload);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<any>>(`/sub-categories/${id}`);
    return response.data;
  },
};
