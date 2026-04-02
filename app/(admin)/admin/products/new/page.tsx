"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Package,
  Tag,
  DollarSign,
  Image as ImageIcon,
  AlertCircle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore, Product } from "@/lib/store/admin-store";
import { Stepper } from "@/components/admin/Stepper";

const STEPS = [
  { id: 1, label: "Classification", description: "Category & Brand" },
  { id: 2, label: "Core Details", description: "Title & Description" },
  { id: 3, label: "Pricing & Stock", description: "Inventory Levels" },
  { id: 4, label: "Media", description: "Product Images" },
];

export default function NewProductPage() {
  const router = useRouter();
  const { categories, brands, addProduct } = useAdminStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<Product, "id" | "createdAt">>({
    name: "",
    description: "",
    categoryId: "",
    subcategoryId: "",
    brandId: "",
    price: "",
    salePrice: "",
    stock: 0,
    sku: "",
    images: [],
    status: "In Stock",
  });

  // Derived State
  const selectedCategory = categories.find(c => c.id === formData.categoryId);
  const availableSubcategories = selectedCategory?.subcategories || [];

  // Auto-generate SKU
  useEffect(() => {
    if (formData.name && !formData.sku) {
      const prefix = "ELV-";
      const random = Math.floor(1000 + Math.random() * 9000);
      setFormData(prev => ({ ...prev, sku: `${prefix}${formData.name.slice(0, 3).toUpperCase()}-${random}` }));
    }
  }, [formData.name]);

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    addProduct(formData);
    setIsSubmitting(false);
    router.push("/admin/products");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-[14px] font-black uppercase tracking-widest"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to List
        </button>
        <div className="text-right">
          <h1 className="text-2xl font-black text-gray-900 leading-none">Create New <span className="text-primary italic">Product</span></h1>
          <p className="text-[12px] font-bold text-gray-400 mt-2 italic">Follow the steps below to list a new item.</p>
        </div>
      </div>

      {/* ── Stepper ────────────────────────────────────────────── */}
      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
        <Stepper steps={STEPS} currentStep={currentStep} />
      </div>

      {/* ── Form Section ──────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* STEP 1: CLASSIFICATION */}
        {currentStep === 1 && (
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Tag size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Step 1: Classification</h2>
                <p className="text-[13px] font-bold text-gray-400 italic">Select the category, subcategory and brand.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Category Select */}
              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Primary Category</label>
                <select
                  required
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value, subcategoryId: "" })}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Subcategory Select */}
              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Subcategory</label>
                <select
                  required
                  disabled={!formData.categoryId}
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900 appearance-none cursor-pointer disabled:opacity-50"
                  value={formData.subcategoryId}
                  onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
                >
                  <option value="">Select Subcategory</option>
                  {availableSubcategories.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
                {!formData.categoryId && (
                  <p className="text-[11px] font-bold text-amber-500 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> Select a category first
                  </p>
                )}
              </div>

              {/* Brand Select */}
              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Brand Name</label>
                <select
                  required
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                  value={formData.brandId}
                  onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.logo} {brand.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CORE DETAILS */}
        {currentStep === 2 && (
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Package size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Step 2: Core Details</h2>
                <p className="text-[13px] font-bold text-gray-400 italic">Name your product and provide a description.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Product Title</label>
                <input
                  required
                  placeholder="e.g. Premium Sundarban Honey 1kg"
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe the product features, benefits..."
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-3 max-w-sm">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Product SKU (Auto-generated)</label>
                <input
                  readOnly
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 outline-none font-mono font-black text-gray-400 uppercase tracking-widest italic"
                  value={formData.sku}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PRICING & STOCK */}
        {currentStep === 3 && (
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <DollarSign size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Step 3: Pricing & Inventory</h2>
                <p className="text-[13px] font-bold text-gray-400 italic">Set your prices and manage stock availability.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Base Price (৳)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">৳</span>
                  <input
                    required
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 pl-12 pr-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Sale Price (Optional)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">৳</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 pl-12 pr-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Stock Quantity</label>
                <input
                  required
                  type="number"
                  placeholder="e.g. 50"
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
                  value={formData.stock || ""}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Status</label>
                <select
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 px-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Product["status"] })}
                >
                  <option value="In Stock">✅ In Stock</option>
                  <option value="Low Stock">⚠️ Low Stock</option>
                  <option value="Out of Stock">❌ Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: MEDIA */}
        {currentStep === 4 && (
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <ImageIcon size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Step 4: Media Assets</h2>
                <p className="text-[13px] font-bold text-gray-400 italic">Select an emoji or placeholder image for now.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["🍯", "🫘", "🥫", "🛢️", "🥜", "🍵", "🍚", "🌾"].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, images: [emoji] })}
                  className={cn(
                    "h-32 rounded-lg flex items-center justify-center text-5xl border-2 transition-all group relative overflow-hidden",
                    formData.images.includes(emoji)
                      ? "border-primary bg-primary/5 scale-105 shadow-xl shadow-primary/10"
                      : "border-gray-100 bg-gray-50 hover:bg-white hover:border-primary/30"
                  )}
                >
                  {emoji}
                  {formData.images.includes(emoji) && (
                    <div className="absolute top-3 right-3 text-primary animate-in zoom-in duration-300">
                      <CheckCircle2 size={18} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Navigation Buttons ────────────────────────────────── */}
        <div className="flex items-center justify-between gap-6 pt-10 border-t border-gray-100 mt-10">
          <button
            type="button"
            onClick={handleBack}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-black text-[15px] transition-all",
              currentStep === 1 ? "opacity-0 pointer-events-none" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-900 hover:text-gray-900"
            )}
          >
            <ChevronLeft size={20} strokeWidth={3} />
            Previous Step
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && (!formData.categoryId || !formData.subcategoryId || !formData.brandId)) ||
                (currentStep === 2 && (!formData.name || !formData.description)) ||
                (currentStep === 3 && !formData.price)
              }
              className="flex-1 bg-primary text-white py-4 rounded-lg font-black text-[15px] hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to {STEPS[currentStep].label}
              <ChevronRight size={20} strokeWidth={3} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || formData.images.length === 0}
              className={cn(
                "flex-1 bg-gradient-to-br from-emerald-500 to-teal-700 text-white py-4 rounded-lg font-black text-[15px] hover:shadow-xl hover:shadow-emerald-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50",
                isSubmitting && "animate-pulse"
              )}
            >
              {isSubmitting ? "Generating Product..." : "Launch Product Listing"}
              {!isSubmitting && <CheckCircle2 size={20} strokeWidth={2.5} />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
