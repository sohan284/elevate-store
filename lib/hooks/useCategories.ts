import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categorieservice, CategoryInput } from "../services/category-service";
import { queryKeys } from "../query-keys";
import { toast } from "sonner";

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => categorieservice.getAll(),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInput) => categorieservice.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      toast.success("Category Created", {
        description: `"${response.data.name}" has been successfully added.`,
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryInput> }) =>
      categorieservice.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      toast.success("Category Updated", {
        description: `Changes to "${response.data.name}" saved.`,
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categorieservice.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      toast.success("Category Deleted", {
        description: "The category has been removed.",
      });
    },
  });
};
