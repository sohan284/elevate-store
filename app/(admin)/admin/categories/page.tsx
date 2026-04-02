"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Grid2X2,
  MoreVertical,
  Edit3,
  Trash2,
  ChevronRight,
  LayoutGrid,
  Layers,
  CheckCircle2,
  X,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore, Category, Subcategory } from "@/lib/store/admin-store";
import { CustomModal } from "@/components/common/CustomModal";
import { Button } from "@/components/ui/button";

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory, addSubcategory, deleteSubcategory } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubcatModalOpen, setIsSubcatModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteData, setDeleteData] = useState<{ id: string, name: string, type: 'category' | 'subcategory', parentId?: string } | null>(null);

  // Form States
  const [newCat, setNewCat] = useState({ name: "", icon: "📦", slug: "" });
  const [newSubcat, setNewSubcat] = useState({ name: "", slug: "" });

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    addCategory({
      ...newCat,
      slug: newCat.name.toLowerCase().replace(/ /g, "-")
    });
    setNewCat({ name: "", icon: "📦", slug: "" });
    setIsAddModalOpen(false);
  };

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory) {
      addSubcategory(selectedCategory.id, {
        ...newSubcat,
        slug: newSubcat.name.toLowerCase().replace(/ /g, "-")
      });
      setNewSubcat({ name: "", slug: "" });
      setIsSubcatModalOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteData) return;
    if (deleteData.type === 'category') {
      deleteCategory(deleteData.id);
    } else if (deleteData.type === 'subcategory' && deleteData.parentId) {
      deleteSubcategory(deleteData.parentId, deleteData.id);
    }
    setIsDeleteModalOpen(false);
    setDeleteData(null);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Product <span className="text-primary italic font-medium ml-1">Categories</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Organize your inventory with categories and subcategories.</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className=""
        >
          <Plus size={20} strokeWidth={3} />
          Add New Category
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden group hover:border-primary/30 transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest font-mono">ID: {category.id.slice(0, 8)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-amber-500 rounded-lg transition-all">
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteData({ id: category.id, name: category.name, type: 'category' });
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Subcategories Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={14} className="text-primary" />
                    Subcategories ({category.subcategories.length})
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsSubcatModalOpen(true);
                    }}
                    className="text-[12px] font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} strokeWidth={3} />
                    Add Sub
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.subcategories.length > 0 ? (
                    category.subcategories.map((sub) => (
                      <div key={sub.id} className="flex items-center gap-2 bg-[#F8F9FA] border border-gray-100 pl-3 pr-1 py-1 rounded-lg group/sub hover:border-primary/30 transition-all">
                        <span className="text-[13px] font-bold text-gray-600">{sub.name}</span>
                        <button
                          onClick={() => {
                            setDeleteData({ id: sub.id, name: sub.name, type: 'subcategory', parentId: category.id });
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all opacity-0 group-hover/sub:opacity-100"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[13px] text-gray-400 italic">No subcategories yet</p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#FBFBFC]/50 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[12px] font-bold text-gray-500">Route: /category/{category.slug}</span>
              <button className="text-primary text-[12px] font-black uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">
                View Products
                <ChevronRight size={14} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Add Category Modal ────────────────────────────────── */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Category"
      >
        <form onSubmit={handleAddCategory} className="space-y-6">
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
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Icon (Emoji)</label>
            <input
              required
              type="text"
              placeholder="🍯, 🫘, 🌶️..."
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
              value={newCat.icon}
              onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full">
              <CheckCircle2 size={20} strokeWidth={2.5} />
              Create Category
            </Button>
          </div>
        </form>
      </CustomModal>

      {/* ── Add Subcategory Modal ─────────────────────────────── */}
      <CustomModal
        isOpen={isSubcatModalOpen}
        onClose={() => setIsSubcatModalOpen(false)}
        title="Add Subcategory"
      >
        <div className="mb-6 p-4 bg-primary/5 rounded-lg flex items-center gap-4 border border-primary/10">
          <div className="text-2xl">{selectedCategory?.icon}</div>
          <div>
            <p className="text-[11px] font-black text-primary uppercase tracking-widest">Adding to Parent:</p>
            <p className="text-[15px] font-bold text-gray-900">{selectedCategory?.name}</p>
          </div>
        </div>

        <form onSubmit={handleAddSubcategory} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Subcategory Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Forest Honey, Madina Dates..."
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
              value={newSubcat.name}
              onChange={(e) => setNewSubcat({ ...newSubcat, name: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg font-black text-[15px] hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <CheckCircle2 size={20} strokeWidth={2.5} />
              Create Subcategory
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
              You are about to delete <span className="text-rose-600 font-bold underline">"{deleteData?.name}"</span>.
              This action cannot be undone.
            </p>
          </div>
          <div className="flex w-full justify-end gap-3 pt-2">

            <Button
              variant='outline'
              className=""
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
