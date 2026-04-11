"use client";

import React, { useState } from "react";
import {
  Plus,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Store,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { cn, getProxiedImageUrl, isPrivateIpImageUrl } from "@/lib/utils";
import { useBrands, useCreateBrand, useUpdateBrand, useDeleteBrand } from "@/lib/hooks/useBrands";
import { useImageUpload } from "@/lib/hooks/useImageUpload";
import { Brand } from "@/lib/services/brand-service";
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
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImageUploader } from "@/components/admin/ImageUploader";

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
  const { imagePreview, setImagePreview, handleFileChange, clearImage } = useImageUpload();

  const handleBrandFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, (file) => setNewBrand((prev) => ({ ...prev, logo: file })));
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
    clearImage();
    setEditingBrand(null);
    setIsAddModalOpen(false);
  };

  const openAddModal = () => {
    setEditingBrand(null);
    setNewBrand({ name: "", logo: "", description: "" });
    clearImage();
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

  const columns: ColumnDef<Brand>[] = [
    {
      header: "Brand",
      cell: (brand) => {
        const logoUrl = typeof brand.logo === 'string' ? brand.logo : brand.logo?.url;
        const proxyUrl = getProxiedImageUrl(logoUrl);
        const isPrivateIp = isPrivateIpImageUrl(logoUrl);
        
        return (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
              {proxyUrl ? (
                <Image src={proxyUrl} alt={brand.name} width={48} height={48} unoptimized={isPrivateIp} className="w-full h-full object-cover" />
              ) : (
                <Store className="text-gray-300" size={20} />
              )}
            </div>
            <div>
              <h4 className="text-[14.5px] font-bold text-gray-900">{brand.name}</h4>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-mono">ID: {brand.id?.slice(-8)}</p>
            </div>
          </div>
        );
      }
    },
    {
      header: "Description",
      className: "max-w-[450px]",
      cell: (brand) => {
        const text = brand.description || "No description provided.";
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
      cell: (brand) => (
        <span className="text-[13px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100/50">
          {brand.createdAt ? new Date(brand.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
        </span>
      )
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (brand) => (
        <div className="flex items-center justify-end gap-2">
          <button className="p-2 text-gray-400 hover:bg-white hover:text-primary hover:shadow-md rounded-lg transition-all" title="View Brand Products">
            <Eye size={18} />
          </button>
          <button
            onClick={() => openEditModal(brand)}
            className="p-2 text-gray-400 hover:bg-white hover:text-amber-500 hover:shadow-md rounded-lg transition-all"
            title="Edit Brand"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => {
              setDeleteData({ id: brand._id, name: brand.name });
              setIsDeleteModalOpen(true);
            }}
            className="p-2 text-gray-400 hover:bg-white hover:text-rose-500 hover:shadow-md rounded-lg transition-all"
            title="Delete Brand"
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
        <h2 className="text-xl font-black text-gray-900 mb-2">Failed to Load Brands</h2>
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
        highlight="Brands"
        description="Manage the manufacturers and brand names associated with your merchandise."
        actions={
          <Button
            onClick={openAddModal}
            className="flex items-center gap-2"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Brand
          </Button>
        }
      />

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <DataTableFilterBar>
        <DataTableSearch
          placeholder="Search brands by name..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </DataTableFilterBar>

      {/* ── Brands Table ──────────────────────────────────────── */}
      <DataTable
        data={filteredBrands}
        columns={columns}
        isLoading={isLoading}
        height="flex-1"
        currentPage={1}
        totalPages={1}
        emptyMessage="No brands found matching your search."
      />

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
              placeholder="Describe this brand's history and focus..."
              rows={3}
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900 resize-none"
              value={newBrand.description}
              onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
            />
          </div>

          <ImageUploader
            inputId="brand-image"
            label="Brand Logo / Image"
            imagePreview={imagePreview}
            onFileChange={handleBrandFileChange}
            onClear={() => {
              clearImage();
              setNewBrand({ ...newBrand, logo: "" });
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
