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
  Store,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBrands, useCreateBrand, useUpdateBrand, useDeleteBrand } from "@/lib/hooks/useBrands";
import { Brand } from "@/lib/services/brand-service";
import { CustomModal } from "@/components/common/CustomModal";
import { Button } from "@/components/ui/button";
import { AdminItemCard, AdminItemCardSkeleton } from "@/components/admin/AdminItemCard";
import { getProxiedImageUrl } from "@/lib/utils";

export default function AdminBrands() {
  const { data: brandsResponse, isLoading, isError, error } = useBrands();
  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand();
  const deleteMutation = useDeleteBrand();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: string, name: string } | null>(null);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  // Form States
  const [newBrand, setNewBrand] = useState<{ name: string, logo: File | string, description: string }>({
    name: "",
    logo: "",
    description: ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBrand({ ...newBrand, logo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredBrands = brandsResponse?.data?.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBrand) {
      const changedData: Partial<typeof newBrand> = {};

      if (newBrand.name !== editingBrand.name)
        changedData.name = newBrand.name;

      if (newBrand.description !== editingBrand.description)
        changedData.description = newBrand.description;

      // Check image change
      const isNewFile = newBrand.logo instanceof File;
      const getEditingLogoUrl = typeof editingBrand.logo === 'string' ? editingBrand.logo : editingBrand.logo?.url;
      const isImageUrlChanged = typeof newBrand.logo === 'string' && newBrand.logo !== getEditingLogoUrl;

      if (isNewFile || isImageUrlChanged) {
        changedData.logo = newBrand.logo;
      }

      // Only proceed if there are changes
      if (Object.keys(changedData).length > 0) {
        await updateMutation.mutateAsync({
          id: editingBrand.id,
          data: changedData
        });
      }
    } else {
      await createMutation.mutateAsync(newBrand);
    }

    setNewBrand({ name: "", logo: "", description: "" });
    setImagePreview(null);
    setEditingBrand(null);
    setIsAddModalOpen(false);
  };

  const openAddModal = () => {
    setEditingBrand(null);
    setNewBrand({ name: "", logo: "", description: "" });
    setImagePreview(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (brand: Brand) => {
    const brandLogoUrl = typeof brand.logo === 'string' ? brand.logo : brand.logo?.url;
    setEditingBrand(brand);
    setNewBrand({
      name: brand.name,
      logo: brandLogoUrl || "",
      description: brand.description || ""
    });
    setImagePreview(brandLogoUrl || null);
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
        <h2 className="text-xl font-black text-gray-900 mb-2">Failed to Load Brands</h2>
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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Product <span className="text-primary italic font-medium ml-1">Brands</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Manage the brands and manufacturers associated with your products.</p>
        </div>
        <Button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-white hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Brand
        </Button>
      </div>

      {/* ── Search Bar ────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="relative group max-w-md w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-[14px] font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg text-emerald-600 border border-emerald-100">
          <Store size={16} />
          <span className="text-[12px] font-bold uppercase tracking-wider">Total: {filteredBrands.length} Brands</span>
        </div>
      </div>

      {/* ── Brands Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <AdminItemCardSkeleton key={i} />)
        ) : filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <AdminItemCard
              key={brand._id}
              id={brand.id}
              _id={brand._id}
              name={brand.name}
              imageUrl={typeof brand.logo === 'string' ? brand.logo : brand.logo?.url}
              description={brand.description}
              createdAt={brand.createdAt}
              FallbackIcon={Store}
              onEdit={() => openEditModal(brand)}
              onDelete={() => {
                setDeleteData({ id: brand._id, name: brand.name });
                setIsDeleteModalOpen(true);
              }}
            />
          ))
        ) : (
          <div className="lg:col-span-2 py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-300">
              <Search size={32} />
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No brands found matching your search</p>
          </div>
        )}
      </div>

      {/* ── Add/Edit Brand Modal ──────────────────────────────── */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingBrand(null);
        }}
        title={editingBrand ? "Update Brand" : "Add New Brand"}
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Brand Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Sony, Apple, Samsung..."
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
              value={newBrand.name}
              onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
            <textarea
              required
              placeholder="Describe this brand..."
              rows={3}
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900 resize-none"
              value={newBrand.description}
              onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Brand Logo / Image</label>
            <div
              onClick={() => document.getElementById('brand-image')?.click()}
              className={cn(
                "group relative w-full h-48 bg-[#F8F9FA] border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/[0.02]",
                imagePreview && "border-solid border-primary/30 bg-white"
              )}
            >
              <input
                id="brand-image"
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
                      setNewBrand({ ...newBrand, logo: "" });
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
              {editingBrand
                ? (updateMutation.isPending ? "Updating..." : "Update Brand")
                : (createMutation.isPending ? "Creating..." : "Create Brand")
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
