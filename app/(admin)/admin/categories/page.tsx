"use client";

import React, { useState } from "react";
import {
  Plus,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Edit3,
  Trash2,
  Eye,
  Grid2X2,
} from "lucide-react";
import Image from "next/image";
import { cn, getProxiedImageUrl, isPrivateIpImageUrl } from "@/lib/utils";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/lib/hooks/useCategories";
import { useImageUpload } from "@/lib/hooks/useImageUpload";
import { Category } from "@/lib/services/category-service";
import { CustomModal } from "@/components/common/CustomModal";
import { Button } from "@/components/ui/button";
import { DataTable, ColumnDef } from "@/components/common/DataTable";
import {
  DataTableFilterBar,
  DataTableSearch,
} from "@/components/common/DataTableFilters";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImageUploader } from "@/components/admin/ImageUploader";

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
  const { imagePreview, setImagePreview, handleFileChange, clearImage } = useImageUpload();

  const handleCatFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, (file) => setNewCat((prev) => ({ ...prev, image: file })));
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
    clearImage();
    setEditingCategory(null);
    setIsAddModalOpen(false);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setNewCat({ name: "", image: "", description: "" });
    clearImage();
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

  const columns: ColumnDef<Category>[] = [
    {
      header: "Category",
      cell: (cat) => {
        const catImageUrl = typeof cat.image === 'string' ? cat.image : cat.image?.url;
        const proxyUrl = getProxiedImageUrl(catImageUrl);
        const isPrivateIp = isPrivateIpImageUrl(catImageUrl);
        
        return (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
              {proxyUrl ? (
                <Image src={proxyUrl} alt={cat.name} width={48} height={48} unoptimized={isPrivateIp} className="w-full h-full object-cover" />
              ) : (
                <Grid2X2 className="text-gray-300" size={20} />
              )}
            </div>
            <div>
              <h4 className="text-[14.5px] font-bold text-gray-900">{cat.name}</h4>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-mono">ID: {cat.id?.slice(-8)}</p>
            </div>
          </div>
        );
      }
    },
    {
      header: "Description",
      className: "max-w-[400px]",
      cell: (cat) => {
        const text = cat.description || "No description provided.";
        const words = text.split(" ");
        const isLong = words.length > 20;
        const truncated = isLong ? words.slice(0, 20).join(" ") + "..." : text;

        if (!isLong) return <p className="text-[14px] text-gray-600 italic leading-relaxed">{text}</p>;

        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-[14px] text-gray-600 italic leading-relaxed cursor-help">
                {truncated}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] p-4 bg-white border-gray-100 shadow-xl rounded-xl text-[13.5px] font-medium text-gray-600 leading-relaxed italic animate-in fade-in zoom-in-95 duration-200">
              {text}
            </TooltipContent>
          </Tooltip>
        );
      }
    },
    {
      header: "Created",
      headerClassName: "text-center",
      className: "text-center",
      cell: (cat) => (
        <span className="text-[13px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100/50">
          {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
        </span>
      )
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (cat) => (
        <div className="flex items-center justify-end gap-2">
          <button className="p-2 text-gray-400 hover:bg-white hover:text-primary hover:shadow-md rounded-lg transition-all" title="View Details">
            <Eye size={18} />
          </button>
          <button
            onClick={() => openEditModal(cat)}
            className="p-2 text-gray-400 hover:bg-white hover:text-amber-500 hover:shadow-md rounded-lg transition-all"
            title="Edit Category"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => {
              setDeleteData({ id: cat._id, name: cat.name });
              setIsDeleteModalOpen(true);
            }}
            className="p-2 text-gray-400 hover:bg-white hover:text-rose-500 hover:shadow-md rounded-lg transition-all"
            title="Delete Category"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

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
    <div className="flex flex-col h-full space-y-4">
      {/* ── Page Header ───────────────────────────────────────── */}
      <AdminPageHeader
        title="Product"
        highlight="Categories"
        description="Organize your inventory with high-level categories and visual descriptions."
        actions={
          <Button
            onClick={openAddModal}
            className="flex items-center gap-2"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Category
          </Button>
        }
      />

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <DataTableFilterBar>
        <DataTableSearch
          placeholder="Search categories by name..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </DataTableFilterBar>

      {/* ── Categories Table ───────────────────────────────────── */}
      <DataTable
        data={filteredCategories}
        columns={columns}
        isLoading={isLoading}
        height="flex-1"
        currentPage={1}
        totalPages={1}
        emptyMessage="No categories found matching your search."
      />

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
          <ImageUploader
            inputId="category-image"
            label="Category Image"
            imagePreview={imagePreview}
            onFileChange={handleCatFileChange}
            onClear={() => {
              clearImage();
              setNewCat({ ...newCat, image: "" });
            }}
          />
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
