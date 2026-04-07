"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Grid2X2,
  Edit3,
  Trash2,
  ChevronRight,
  Layers,
  CheckCircle2,
  X,
  AlertTriangle,
  Loader2,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/lib/hooks/useCategories";
import { Category } from "@/lib/services/category-service";
import { CustomModal } from "@/components/common/CustomModal";
import { Button } from "@/components/ui/button";
import { AdminItemCard, AdminItemCardSkeleton } from "@/components/admin/AdminItemCard";
import { getProxiedImageUrl } from "@/lib/utils";

export default function AdminCategories() {
  const { data: categoriesResponse, isLoading, isError, error } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: string, name: string } | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form States
  const [newCat, setNewCat] = useState<{ name: string, image: File | string, description: string }>({
    name: "",
    image: "",
    description: ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCat({ ...newCat, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredCategories = categoriesResponse?.data?.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      const changedData: Partial<typeof newCat> = {};

      if (newCat.name !== editingCategory.name)
        changedData.name = newCat.name;

      if (newCat.description !== editingCategory.description)
        changedData.description = newCat.description;

      // Check image change
      const isNewFile = newCat.image instanceof File;
      const getEditingImageUrl = typeof editingCategory.image === 'string' ? editingCategory.image : editingCategory.image?.url;
      const isImageUrlChanged = typeof newCat.image === 'string' && newCat.image !== getEditingImageUrl;

      if (isNewFile || isImageUrlChanged) {
        changedData.image = newCat.image;
      }

      // Only proceed if there are changes
      if (Object.keys(changedData).length > 0) {
        await updateMutation.mutateAsync({
          id: editingCategory.id,
          data: changedData
        });
      }
    } else {
      await createMutation.mutateAsync(newCat);
    }

    setNewCat({ name: "", image: "", description: "" });
    setImagePreview(null);
    setEditingCategory(null);
    setIsAddModalOpen(false);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setNewCat({ name: "", image: "", description: "" });
    setImagePreview(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    const catImageUrl = typeof category.image === 'string' ? category.image : category.image?.url;
    setEditingCategory(category);
    setNewCat({
      name: category.name,
      image: catImageUrl || "",
      description: category.description || ""
    });
    setImagePreview(catImageUrl || null);
    setIsAddModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteData) return;
    await deleteMutation.mutateAsync(deleteData.id);
    setIsDeleteModalOpen(false);
    setDeleteData(null);
  };

  if (isError) {
    return (
      <div className="bg-rose-50 border border-rose-100 p-8 rounded-2xl text-center max-w-2xl mx-auto mt-10">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-2">Failed to Load Categories</h2>
        <p className="text-gray-600 font-medium mb-6">{(error as any)?.message || "Something went wrong while fetching data from the API."}</p>
        <Button onClick={() => window.location.reload()} variant="danger">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Product <span className="text-primary italic font-medium ml-1">Categories</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Organize your inventory with categories and descriptions.</p>
        </div>
        <Button
          onClick={openAddModal}
          className="flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Category
        </Button>
      </div>

      {/* ── Search Bar ────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
        <div className="relative group max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-[14px] font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ── Categories Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <AdminItemCardSkeleton key={i} />)
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <AdminItemCard
              key={category._id}
              id={category.id}
              _id={category._id}
              name={category.name}
              imageUrl={typeof category.image === 'string' ? category.image : category.image?.url}
              description={category.description}
              createdAt={category.createdAt}
              FallbackIcon={Grid2X2}
              onEdit={() => openEditModal(category)}
              onDelete={() => {
                setDeleteData({ id: category._id, name: category.name });
                setIsDeleteModalOpen(true);
              }}
            />
          ))
        ) : (
          <div className="lg:col-span-2 py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-300">
              <Search size={32} />
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No categories found matching your search</p>
          </div>
        )}
      </div>

      {/* ── Add Category Modal ────────────────────────────────── */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? "Update Category" : "Add New Category"}
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Category Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Honey, Dates, Spices..."
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
              value={newCat.name}
              onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
            />
          </div>



          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
            <textarea
              required
              placeholder="Describe this category..."
              rows={3}
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900 resize-none"
              value={newCat.description}
              onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Category Image</label>
            <div
              onClick={() => document.getElementById('category-image')?.click()}
              className={cn(
                "group relative w-full h-48 bg-[#F8F9FA] border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/[0.02]",
                imagePreview && "border-solid border-primary/30 bg-white"
              )}
            >
              <input
                id="category-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {imagePreview ? (
                <div className="relative w-full h-full p-2 group/preview">
                  <img
                    src={getProxiedImageUrl(imagePreview)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <p className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon size={14} /> Change Image
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setNewCat({ ...newCat, image: "" });
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-10"
                  >
                    <X size={16} strokeWidth={3} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center px-4">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <Upload size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[14px] font-black text-gray-900 uppercase tracking-tight">Click to upload</p>
                    <p className="text-[12px] font-bold text-gray-400 mt-1 italic">PNG, JPG or WebP (Max 5MB)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending) ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCircle2 size={20} strokeWidth={2.5} />
              )}
              {editingCategory
                ? (updateMutation.isPending ? "Updating..." : "Update Category")
                : (createMutation.isPending ? "Creating..." : "Create Category")
              }
            </Button>
          </div>
        </form>
      </CustomModal>

      {/* ── Delete Confirmation Modal ───────────────────────── */}
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        variant="danger"
        maxWidth="max-w-sm"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-2">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Are you sure?</h3>
            <p className="text-[14px] text-gray-500 font-medium mt-1">
              You are about to delete <span className="text-rose-600 font-bold underline">"{deleteData?.name}"</span>.
              This action cannot be undone.
            </p>
          </div>
          <div className="flex w-full justify-end gap-3 pt-2">
            <Button
              variant='outline'
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant='danger'
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {deleteMutation.isPending ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
