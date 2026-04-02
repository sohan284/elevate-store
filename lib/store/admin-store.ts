import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  brandId: string;
  price: string;
  salePrice?: string;
  stock: number;
  sku: string;
  images: string[];
  status: "In Stock" | "Low Stock" | "Out of Stock";
  createdAt: string;
}

interface AdminState {
  categories: Category[];
  brands: Brand[];
  products: Product[];
  
  // Actions
  addCategory: (category: Omit<Category, "id" | "subcategories">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  addSubcategory: (categoryId: string, subcategory: Omit<Subcategory, "id">) => void;
  updateSubcategory: (categoryId: string, subcategoryId: string, subcategory: Partial<Subcategory>) => void;
  deleteSubcategory: (categoryId: string, subcategoryId: string) => void;
  
  addBrand: (brand: Omit<Brand, "id">) => void;
  updateBrand: (id: string, brand: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      categories: [
        { id: "1", name: "Honey", slug: "honey", icon: "🍯", subcategories: [] },
        { id: "2", name: "Dates", slug: "dates", icon: "🫘", subcategories: [] },
      ],
      brands: [
        { id: "b1", name: "Pran", slug: "pran" },
        { id: "b2", name: "Fresh", slug: "fresh" },
      ],
      products: [],

      addCategory: (cat) => set((state) => ({
        categories: [...state.categories, { ...cat, id: crypto.randomUUID(), subcategories: [] }]
      })),
      
      updateCategory: (id, cat) => set((state) => ({
        categories: state.categories.map((c) => c.id === id ? { ...c, ...cat } : c)
      })),
      
      deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter((c) => c.id !== id)
      })),

      addSubcategory: (categoryId, subcat) => set((state) => ({
        categories: state.categories.map((c) => 
          c.id === categoryId 
            ? { ...c, subcategories: [...c.subcategories, { ...subcat, id: crypto.randomUUID() }] } 
            : c
        )
      })),

      updateSubcategory: (categoryId, subcategoryId, subcat) => set((state) => ({
        categories: state.categories.map((c) => 
          c.id === categoryId 
            ? { 
                ...c, 
                subcategories: c.subcategories.map((sc) => sc.id === subcategoryId ? { ...sc, ...subcat } : sc) 
              } 
            : c
        )
      })),

      deleteSubcategory: (categoryId, subcategoryId) => set((state) => ({
        categories: state.categories.map((c) => 
          c.id === categoryId 
            ? { ...c, subcategories: c.subcategories.filter((sc) => sc.id !== subcategoryId) } 
            : c
        )
      })),

      addBrand: (brand) => set((state) => ({
        brands: [...state.brands, { ...brand, id: crypto.randomUUID() }]
      })),

      updateBrand: (id, brand) => set((state) => ({
        brands: state.brands.map((b) => b.id === id ? { ...b, ...brand } : b)
      })),

      deleteBrand: (id) => set((state) => ({
        brands: state.brands.filter((b) => b.id !== id)
      })),

      addProduct: (product) => set((state) => ({
        products: [
          ...state.products, 
          { 
            ...product, 
            id: crypto.randomUUID(), 
            createdAt: new Date().toISOString() 
          }
        ]
      })),

      updateProduct: (id, product) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...product } : p)
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      })),
    }),
    {
      name: "elevate-admin-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
