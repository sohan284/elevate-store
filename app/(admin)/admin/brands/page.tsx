"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Tags,
  MoreVertical,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Store,
  ExternalLink,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore, Brand } from "@/lib/store/admin-store";
import { CustomModal } from "@/components/common/CustomModal";
import { Button } from "@/components/ui/button";

export default function AdminBrands() {
  const { brands, addBrand, updateBrand, deleteBrand } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: "", logo: "🏭" });
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    addBrand({
      ...newBrand,
      slug: newBrand.name.toLowerCase().replace(/ /g, "-")
    });
    setNewBrand({ name: "", logo: "🏭" });
    setIsAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (brandToDelete) {
      deleteBrand(brandToDelete.id);
      setIsDeleteModalOpen(false);
      setBrandToDelete(null);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Product <span className="text-primary italic font-medium ml-1">Brands</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Manage the brands and manufacturers associated with your products.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg text-[14px] font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Plus size={20} strokeWidth={3} />
          Add New Brand
        </button>
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
          <span className="text-[12px] font-bold uppercase tracking-wider">Total: {brands.length} Brands</span>
        </div>
      </div>

      {/* ── Brands Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBrands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden group hover:border-primary/30 transition-all">
            <div className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {brand.logo || "🏭"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                  <CheckCircle2 size={10} className="text-white" strokeWidth={4} />
                </div>
              </div>

              <h3 className="text-[17px] font-black text-gray-900 group-hover:text-primary transition-colors">{brand.name}</h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-mono mt-1">ID: {brand.id.slice(0, 8)}</p>

              <div className="mt-6 flex items-center justify-center gap-2">
                <button className="flex-1 bg-[#F8F9FA] hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-[12px] font-bold transition-colors flex items-center justify-center gap-2">
                  <Edit3 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setBrandToDelete(brand);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-500 p-2.5 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="px-6 py-3 bg-[#FBFBFC]/50 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Slug: {brand.slug}</span>
              <ExternalLink size={14} className="text-gray-300" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Add Brand Modal ───────────────────────────────────── */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Brand"
        maxWidth="max-w-sm"
      >
        <form onSubmit={handleAddBrand} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Brand Logo (Emoji/Char)</label>
            <input
              required
              type="text"
              placeholder="🏭, 🍎, Nestle..."
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
              value={newBrand.logo}
              onChange={(e) => setNewBrand({ ...newBrand, logo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Brand Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Pran, Fresh, Bashundhara..."
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
              value={newBrand.name}
              onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg font-black text-[15px] hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <CheckCircle2 size={20} strokeWidth={2.5} />
              Create Brand
            </button>
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
              You are about to delete <span className="text-rose-600 font-bold underline">"{brandToDelete?.name}"</span>.
              This action cannot be undone.
            </p>
          </div>
          <div className="flex w-full gap-3 pt-2">
            <Button
              variant='outline'
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='danger'
              onClick={handleConfirmDelete}
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
