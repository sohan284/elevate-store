"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Layers,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { cn, getProxiedImageUrl, isPrivateIpImageUrl } from "@/lib/utils";
import {
  useSubcategories,
  useCreateSubcategory,
  useUpdateSubcategory,
  useDeleteSubcategory
} from "@/lib/hooks/useSubcategories";
import { useCategories } from "@/lib/hooks/useCategories";
import { useImageUpload } from "@/lib/hooks/useImageUpload";
import { Subcategory } from "@/lib/services/subcategory-service";
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

export default function AdminSubcategories() {
  // Query Data
  const { data: subResp, isLoading, isError, error } = useSubcategories();
  const { data: catResp } = useCategories();

  // Mutations
  const createMutation = useCreateSubcategory();
  const updateMutation = useUpdateSubcategory();
  const deleteMutation = useDeleteSubcategory();

  const subcategories = subResp?.data || [];
  const categories = catResp?.data || [];

  // Local State
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: string; name: string } | null>(null);

  // Form State
  const [newSub, setNewSub] = useState({
    name: "",
    image: "" as string | File,
    description: "",
    categoriesId: ""
  });
  const { imagePreview, setImagePreview, handleFileChange, clearImage } = useImageUpload();

  // Filter Logic
  const filteredSubs = useMemo(() => {
    return subcategories.filter(sub =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subcategories, searchTerm]);

  const handleSubFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, (file) => setNewSub((prev) => ({ ...prev, image: file })));
  };

  // Form Reset
  const resetForm = () => {
    setNewSub({ name: "", image: "", description: "", categoriesId: "" });
    clearImage();
    setEditingSubcategory(null);
  };

  // Submission handles
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSub.categoriesId) {
      alert("Please select a parent Category!");
      return;
    }

    if (editingSubcategory) {
      const changedData: any = {};
      if (newSub.name !== editingSubcategory.name) changedData.name = newSub.name;
      if (newSub.description !== editingSubcategory.description) changedData.description = newSub.description;
      if (newSub.categoriesId !== editingSubcategory.categoriesId) changedData.categoriesId = newSub.categoriesId;

      const isNewFile = newSub.image instanceof File;
      const getEditingImageUrl = typeof editingSubcategory.image === 'string' ? editingSubcategory.image : editingSubcategory.image?.url;
      const isImageUrlChanged = typeof newSub.image === 'string' && newSub.image !== getEditingImageUrl;

      if (isNewFile || isImageUrlChanged) {
        changedData.image = newSub.image;
      }

      if (Object.keys(changedData).length > 0) {
        await updateMutation.mutateAsync({ id: editingSubcategory.id, data: changedData });
      }
    } else {
      await createMutation.mutateAsync(newSub);
    }
    setIsAddModalOpen(false);
    resetForm();
  };

  const confirmDelete = async () => {
    if (!deleteData) return;
    await deleteMutation.mutateAsync(deleteData.id);
    setIsDeleteModalOpen(false);
    setDeleteData(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (sub: Subcategory) => {
    const subImageUrl = typeof sub.image === 'string' ? sub.image : sub.image?.url;
    setEditingSubcategory(sub);
    setNewSub({
      name: sub.name,
      image: subImageUrl || "",
      description: sub.description || "",
      categoriesId: sub.categoriesId || ""
    });
    setImagePreview(subImageUrl || null);
    setIsAddModalOpen(true);
  };

  const columns: ColumnDef<Subcategory>[] = [
    {
      header: "Subcategory",
      cell: (sub) => {
        const subImageUrl = typeof sub.image === 'string' ? sub.image : sub.image?.url;
        const proxyUrl = getProxiedImageUrl(subImageUrl);
        const isPrivateIp = isPrivateIpImageUrl(subImageUrl);
        
        return (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
              {proxyUrl ? (
                <Image src={proxyUrl} alt={sub.name} width={48} height={48} unoptimized={isPrivateIp} className="w-full h-full object-cover" />
              ) : (
                <Layers className="text-gray-300" size={20} />
              )}
            </div>
            <div>
              <h4 className="text-[14.5px] font-bold text-gray-900">{sub.name}</h4>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-mono">ID: {sub.id?.slice(-8)}</p>
            </div>
          </div>
        );
      }
    },
    {
      header: "Parent Category",
      cell: (sub) => {
        const parentCat = categories.find(c => c.id === sub.categoriesId);
        return (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-primary/5 text-primary text-[12px] font-bold border border-primary/10">
              {parentCat?.name || "Uncategorized"}
            </span>
          </div>
        );
      }
    },
    {
      header: "Description",
      className: "max-w-[350px]",
      cell: (sub) => {
        const text = sub.description || "No description provided.";
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
      cell: (sub) => (
        <span className="text-[13px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100/50">
          {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
        </span>
      )
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (sub) => (
        <div className="flex items-center justify-end gap-2">
          <button className="p-2 text-gray-400 hover:bg-white hover:text-primary hover:shadow-md rounded-lg transition-all" title="View Details">
            <Eye size={18} />
          </button>
          <button
            onClick={() => openEditModal(sub)}
            className="p-2 text-gray-400 hover:bg-white hover:text-amber-500 hover:shadow-md rounded-lg transition-all"
            title="Edit Subcategory"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => {
              setDeleteData({ id: sub._id, name: sub.name });
              setIsDeleteModalOpen(true);
            }}
            className="p-2 text-gray-400 hover:bg-white hover:text-rose-500 hover:shadow-md rounded-lg transition-all"
            title="Delete Subcategory"
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
        <h2 className="text-xl font-black text-gray-900 mb-2">Failed to Load Subcategories</h2>
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
        highlight="Subcategories"
        description="Manage deeply nested groupings connected to your base Categories."
        actions={
          <Button
            onClick={openAddModal}
            className="flex items-center gap-2"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Subcategory
          </Button>
        }
      />

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <DataTableFilterBar>
        <DataTableSearch
          placeholder="Search subcategories by name or description..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </DataTableFilterBar>

      {/* ── Subcategories Table ────────────────────────────────── */}
      <DataTable
        data={filteredSubs}
        columns={columns}
        isLoading={isLoading}
        height="flex-1"
        currentPage={1}
        totalPages={1}
        emptyMessage="No subcategories found matching your search."
      />

      {/* ── Add/Edit Modal (With Dropdown!) ───────────────────── */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title={editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleAddSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Parent Category</label>
              <Select
                value={newSub.categoriesId}
                onValueChange={(value) => setNewSub({ ...newSub, categoriesId: value })}
              >
                <SelectTrigger className="w-full bg-[#F8F9FA] border-gray-100 py-3.5 px-4 rounded-xl font-semibold text-gray-700 focus:ring-4 focus:ring-primary/10 transition-all">
                  <SelectValue placeholder="Select a Category..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100 shadow-xl overflow-hidden bg-white/95 backdrop-blur-md">
                  {categories.map((cat) => (
                    <SelectItem 
                      key={cat.id} 
                      value={cat.id}
                      className="py-2.5 px-4 font-semibold text-gray-600 focus:bg-primary/5 focus:text-primary transition-colors cursor-pointer"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Subcategory Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Smart Watches"
                className="w-full bg-[#F8F9FA] border border-gray-100 rounded-xl px-4 py-3.5 text-[15px] font-semibold text-gray-900 outline-none focus:ring-4 focus:ring-primary/10 tracking-tight transition-all placeholder:text-gray-300"
                value={newSub.name}
                onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
            <textarea
              rows={3}
              placeholder="Brief description of this subcategory..."
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-600 outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none placeholder:text-gray-300 placeholder:font-medium"
              value={newSub.description}
              onChange={(e) => setNewSub({ ...newSub, description: e.target.value })}
            />
          </div>

          <ImageUploader
            inputId="sub-image"
            label="Subcategory Image"
            imagePreview={imagePreview}
            onFileChange={handleSubFileChange}
            onClear={() => {
              clearImage();
              setNewSub({ ...newSub, image: "" });
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
              {editingSubcategory
                ? (updateMutation.isPending ? "Updating..." : "Update Subcategory")
                : (createMutation.isPending ? "Creating..." : "Create Subcategory")
              }
            </Button>
          </div>
        </form>
      </CustomModal>

      {/* ── Delete Confirmation Modal ─────────────────────────── */}
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        variant="danger"
        maxWidth="max-w-md"
      >
        <div className="space-y-6">
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl flex items-start gap-4">
            <AlertTriangle className="shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-sm tracking-wide uppercase">Warning</h4>
              <p className="text-sm mt-1 opacity-90 font-medium">
                Are you sure you want to delete <span className="font-bold">"{deleteData?.name}"</span>? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="font-bold px-6"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="font-bold px-6 border-0"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="animate-spin mx-auto text-white" size={20} />
              ) : (
                "Delete Subcategory"
              )}
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
