"use client";

import React, { useState, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Image as ImageIcon,
  AlertTriangle,
  Loader2,
  Layers
} from "lucide-react";
import { 
  useSubcategories, 
  useCreateSubcategory, 
  useUpdateSubcategory, 
  useDeleteSubcategory 
} from "@/lib/hooks/useSubcategories";
import { useCategories } from "@/lib/hooks/useCategories";
import { Subcategory } from "@/lib/services/subcategory-service";
import { CustomModal } from "@/components/common/CustomModal";
import { Button } from "@/components/ui/button";
import { AdminItemCard, AdminItemCardSkeleton } from "@/components/admin/AdminItemCard";
import { getProxiedImageUrl } from "@/lib/utils";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: string; name: string } | null>(null);

  // Form State
  const [newSub, setNewSub] = useState({
    name: "",
    image: "" as string | File,
    description: "",
    categoryId: ""
  });

  // Filter Logic
  const filteredSubs = useMemo(() => {
    return subcategories.filter(sub => 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subcategories, searchTerm]);

  // Handle image upload tracking
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewSub({ ...newSub, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Form Reset
  const resetForm = () => {
    setNewSub({ name: "", image: "", description: "", categoryId: "" });
    setImagePreview(null);
    setEditingSubcategory(null);
  };

  // Submission handles
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSub.categoryId) {
      alert("Please select a parent Category!");
      return;
    }
    
    if (editingSubcategory) {
      const changedData: any = {};
      if (newSub.name !== editingSubcategory.name) changedData.name = newSub.name;
      if (newSub.description !== editingSubcategory.description) changedData.description = newSub.description;
      if (newSub.categoryId !== editingSubcategory.categoryId) changedData.categoryId = newSub.categoryId;
      
      const isNewFile = newSub.image instanceof File;
      const getEditingImageUrl = typeof editingSubcategory.image === 'string' ? editingSubcategory.image : editingSubcategory.image?.url;
      const isImageUrlChanged = typeof newSub.image === 'string' && newSub.image !== getEditingImageUrl;
      
      if (isNewFile || isImageUrlChanged) {
        changedData.image = newSub.image;
      }

      if (Object.keys(changedData).length > 0) {
        await updateMutation.mutateAsync({ id: editingSubcategory._id, data: changedData });
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
      categoryId: sub.categoryId || ""
    });
    setImagePreview(subImageUrl || null);
    setIsAddModalOpen(true);
  };

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
    <div className="space-y-8 pb-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Product <span className="text-primary italic font-medium ml-1">Subcategories</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Manage deeply nested groupings connected to your base Categories.</p>
        </div>
        <Button
          onClick={openAddModal}
          className="flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="font-bold tracking-widest uppercase text-[12px]">Add Subcategory</span>
        </Button>
      </div>

      {/* ── Search Bar ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-2 rounded-xl shadow-sm border border-gray-100/50">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search subcategories..."
            className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-[14px] font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ── Subcategories Grid ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <AdminItemCardSkeleton key={i} />)
        ) : filteredSubs.length > 0 ? (
          filteredSubs.map((sub) => {
            // Find parent category to display within the description dynamically!
            const parentCat = categories.find(c => c._id === sub.categoryId);
            const formattedDesc = parentCat ? `Parent: ${parentCat.name} | ${sub.description}` : sub.description;

            return (
              <AdminItemCard
                key={sub._id}
                id={sub.id}
                _id={sub._id}
                name={sub.name}
                imageUrl={typeof sub.image === 'string' ? sub.image : sub.image?.url}
                description={formattedDesc}
                createdAt={sub.createdAt}
                FallbackIcon={Layers}
                onEdit={() => openEditModal(sub)}
                onDelete={() => {
                  setDeleteData({ id: sub._id, name: sub.name });
                  setIsDeleteModalOpen(true);
                }}
              />
            );
          })
        ) : (
          <div className="lg:col-span-2 xl:col-span-3 py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-300">
              <Search size={32} />
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No subcategories found matching your search</p>
          </div>
        )}
      </div>

      {/* ── Add/Edit Modal (With Dropdown!) ───────────────────── */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title={editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}
        size="md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Parent Category</label>
            <select
              required
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-xl px-4 py-3.5 text-[15px] font-semibold text-gray-700 outline-none focus:ring-4 focus:ring-primary/10 tracking-tight transition-all appearance-none"
              value={newSub.categoryId}
              onChange={(e) => setNewSub({ ...newSub, categoryId: e.target.value })}
            >
              <option value="" disabled>Select a Category...</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
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

          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Subcategory Image</label>
            <div
              onClick={() => document.getElementById('sub-image')?.click()}
              className={`group relative w-full h-48 bg-[#F8F9FA] border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5 ${imagePreview && "border-solid border-primary/30 bg-white"}`}
            >
              <input
                id="sub-image"
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
                      setNewSub({ ...newSub, image: "" });
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-primary transition-colors">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                    <ImageIcon size={24} className="text-primary/60" />
                  </div>
                  <p className="text-[14px] font-bold">Click to upload image</p>
                  <p className="text-[12px] font-medium text-gray-400 mt-1">SVG, PNG, JPG or WEBP (max. 2MB)</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full py-6 text-[15px] font-black uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all rounded-xl cursor-copy"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Saving...
                </div>
              ) : (
                editingSubcategory ? "Update Subcategory" : "Create Subcategory"
              )}
            </Button>
          </div>
        </form>
      </CustomModal>

      {/* ── Delete Confirmation Modal ─────────────────────────── */}
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="sm"
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
