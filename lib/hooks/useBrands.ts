import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { brandService, BrandInput } from "../services/brand-service";
import { queryKeys } from "../query-keys";
import { toast } from "sonner";

export const useBrands = () => {
  return useQuery({
    queryKey: queryKeys.brands.list(),
    queryFn: () => brandService.getAll(),
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BrandInput) => brandService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.brands.all });
      toast.success("Brand Created", {
        description: `"${response.data.name}" has been successfully added.`,
      });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BrandInput> }) =>
      brandService.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.brands.all });
      toast.success("Brand Updated", {
        description: `Changes to "${response.data.name}" saved.`,
      });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => brandService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.brands.all });
      toast.success("Brand Deleted", {
        description: "The brand has been removed.",
      });
    },
  });
};
