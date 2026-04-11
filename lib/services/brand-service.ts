import { apiClient, ApiResponse } from "@/lib/api-client";

export interface BrandInput {
  name: string;
  logo: File | string;
  description: string;
}

export interface Brand {
  _id: string; // MongoDB formatted ID
  id: string;   // UI-facing ID
  name: string;
  logo: string | {
    url: string;
    public_id?: string;
  };
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export const brandService = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<Brand[]>>("/brands");
    return response.data;
  },

  create: async (data: BrandInput) => {
    let payload: any = data;

    if (data.logo instanceof File) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("image", data.logo);
      payload = formData;
    }

    const response = await apiClient.post<ApiResponse<Brand>>("/brands", payload);
    return response.data;
  },

  update: async (id: string, data: Partial<BrandInput>) => {
    let payload: any = data;

    if (data.logo instanceof File) {
      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);
      formData.append("image", data.logo);
      payload = formData;
    }

    const response = await apiClient.patch<ApiResponse<Brand>>(`/brands/${id}`, payload);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<any>>(`/brands/${id}`);
    return response.data;
  },
};
