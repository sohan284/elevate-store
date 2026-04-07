/**
 * Senior Developer Tip: Centralizing query keys prevents typos and makes cache invalidation easy.
 */
export const queryKeys = {
  categories: {
    all: ["categories"] as const,
    list: () => [...queryKeys.categories.all, "list"] as const,
    details: (id: string) => [...queryKeys.categories.all, "detail", id] as const,
  },
  subCategories: {
    all: ["sub-categories"] as const,
    list: () => [...queryKeys.subCategories.all, "list"] as const,
  },
  brands: {
    all: ["brands"] as const,
    list: () => [...queryKeys.brands.all, "list"] as const,
  },
  products: {
    all: ["products"] as const,
    list: (filters?: any) => [...queryKeys.products.all, "list", filters] as const,
  },
};
