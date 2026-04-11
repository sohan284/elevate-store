import { apiClient, ApiResponse } from "@/lib/api-client";

export interface ProductInput {
  name: string;
  description: string;
  images: (File | string)[];
  price: string | number;
  discount: string | number;
  stock: string | number;
  categoriesId: string;
  subCategoriesId: string;
  brandId: string;
}

export interface Product {
  _id: string;
  id: string;
  name: string;
  description: string;
  images: (string | { url: string; public_id?: string })[];
  price: number;
  discount: number;
  stock: number;
  categoriesId: string;
  subCategoriesId: string;
  brandId: string;
  sku?: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  createdAt?: string;
  updatedAt?: string;
}

export const productService = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<Product[]>>("/products");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  create: async (data: ProductInput) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("stock", data.stock.toString());
    formData.append("categoriesId", data.categoriesId);
    formData.append("subCategoriesId", data.subCategoriesId);
    formData.append("brandId", data.brandId);

    // Append multiple files
    data.images.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      } else {
        formData.append("images", img);
      }
    });

    const response = await apiClient.post<ApiResponse<Product>>("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id: string, data: Partial<ProductInput>) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.price !== undefined) formData.append("price", data.price.toString());
    if (data.discount !== undefined) formData.append("discount", data.discount.toString());
    if (data.stock !== undefined) formData.append("stock", data.stock.toString());
    if (data.categoriesId) formData.append("categoriesId", data.categoriesId);
    if (data.subCategoriesId) formData.append("subCategoriesId", data.subCategoriesId);
    if (data.brandId) formData.append("brandId", data.brandId);

    if (data.images) {
      data.images.forEach((img) => {
        formData.append("images", img);
      });
    }

    const response = await apiClient.patch<ApiResponse<Product>>(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<any>>(`/products/${id}`);
    return response.data;
  },
};
