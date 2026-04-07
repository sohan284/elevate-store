import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, ProductInput } from "../services/product-service";
import { queryKeys } from "../query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useProducts = (filters?: any) => {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productService.getAll(),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.all, // Can expand queryKeys if needed
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ProductInput) => productService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      toast.success("Product Launched!", {
        description: `"${response.data.name}" is now live in your inventory.`,
      });
      router.push("/admin/products");
    },
    onError: (error: any) => {
      toast.error("Failed to Create Product", {
        description: error?.message || "Something went wrong.",
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductInput> }) =>
      productService.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      toast.success("Product Updated", {
        description: `Changes to "${response.data.name}" saved.`,
      });
      router.push("/admin/products");
    },
    onError: (error: any) => {
      toast.error("Update Failed", {
        description: error?.message || "Something went wrong.",
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      toast.success("Product Deleted", {
        description: "The product has been removed from inventory.",
      });
    },
    onError: (error: any) => {
      toast.error("Deletion Failed", {
        description: error?.message || "Something went wrong.",
      });
    },
  });
};
