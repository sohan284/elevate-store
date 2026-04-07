import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { subcategoryService, SubcategoryInput } from "@/lib/services/subcategory-service";
import { toast } from "sonner";

export const useSubcategories = () => {
  return useQuery({
    queryKey: queryKeys.subCategories.list(),
    queryFn: () => subcategoryService.getAll(),
  });
};

export const useCreateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubcategoryInput) => subcategoryService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subCategories.all });
      toast.success("Subcategory Created", {
        description: `"${response.data.name}" has been successfully added.`,
      });
    },
    onError: (error: any) => {
      toast.error("Failed to create subcategory", {
        description: error.message,
      });
    },
  });
};

export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SubcategoryInput> }) =>
      subcategoryService.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subCategories.all });
      toast.success("Subcategory Updated", {
        description: `Changes to "${response.data.name}" saved.`,
      });
    },
    onError: (error: any) => {
      toast.error("Failed to update subcategory", {
        description: error.message,
      });
    },
  });
};

export const useDeleteSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subcategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subCategories.all });
      toast.success("Subcategory Deleted", {
        description: "The subcategory has been removed.",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to delete subcategory", {
        description: error.message,
      });
    },
  });
};
