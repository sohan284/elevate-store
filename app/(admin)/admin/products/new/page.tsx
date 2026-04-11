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
import { Stepper } from "@/components/admin/Stepper";
import { useCategories } from "@/lib/hooks/useCategories";
import { useSubcategories } from "@/lib/hooks/useSubcategories";
import { useBrands } from "@/lib/hooks/useBrands";
import { useCreateProduct } from "@/lib/hooks/useProducts";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ProductInput } from "@/lib/services/product-service";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STEPS = [
  { id: 1, label: "Classification", description: "Category & Brand" },
  { id: 2, label: "Core Details", description: "Title & Description" },
  { id: 3, label: "Pricing & Stock", description: "Inventory Levels" },
  { id: 4, label: "Media", description: "Product Images" },
];

export default function NewProductPage() {
  const router = useRouter();

  // Real Hooks
  const { data: categoriesResp, isLoading: catsLoading } = useCategories();
  const { data: subcategoriesResp, isLoading: subsLoading } = useSubcategories();
  const { data: brandsResp, isLoading: brandsLoading } = useBrands();
  const createMutation = useCreateProduct();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    description: "",
    categoriesId: "",
    subCategoriesId: "",
    brandId: "",
    price: "",
    discount: "0",
    stock: 0,
    images: [], // This will hold File objects or URLs
  });

  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null]);

  // Data helpers
  const categories = categoriesResp?.data || [];
  const brands = brandsResp?.data || [];
  const allSubcategories = subcategoriesResp?.data || [];
  const availableSubcategories = allSubcategories.filter(sub => sub.categoriesId === formData.categoriesId);

  // SKU logic (Keep for UI only or if API needs it)
  const [sku, setSku] = useState("");
  useEffect(() => {
    if (formData.name && !sku) {
      const prefix = "ELV-";
      const random = Math.floor(1000 + Math.random() * 9000);
      setSku(`${prefix}${formData.name.slice(0, 3).toUpperCase()}-${random}`);
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

    // Filter out nulls from images if any slots were left empty
    const finalImages = formData.images.filter(img => img !== null);

    createMutation.mutate({
      ...formData,
      images: finalImages
    });
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
                <Select
                  value={formData.categoriesId}
                  onValueChange={(value) => setFormData({ ...formData, categoriesId: value, subCategoriesId: "" })}
                  disabled={catsLoading}
                >
                  <SelectTrigger className="w-full bg-[#F8F9FA] border-gray-100 py-4 px-6 rounded-lg font-bold text-gray-900 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all">
                    <SelectValue placeholder={catsLoading ? "Loading..." : "Select Category"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100 shadow-xl overflow-hidden bg-white/95 backdrop-blur-md">
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat.id}
                        value={cat.id}
                        className="py-3 px-4 font-bold text-gray-600 focus:bg-primary/5 focus:text-primary transition-colors cursor-pointer"
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory Select */}
              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Subcategory</label>
                <Select
                  value={formData.subCategoriesId}
                  onValueChange={(value) => setFormData({ ...formData, subCategoriesId: value })}
                  disabled={!formData.categoriesId || subsLoading}
                >
                  <SelectTrigger className="w-full bg-[#F8F9FA] border-gray-100 py-4 px-6 rounded-lg font-bold text-gray-900 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all disabled:opacity-50">
                    <SelectValue placeholder={subsLoading ? "Loading..." : "Select Subcategory"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100 shadow-xl overflow-hidden bg-white/95 backdrop-blur-md">
                    {availableSubcategories.map((sub) => (
                      <SelectItem
                        key={sub.id}
                        value={sub.id}
                        className="py-3 px-4 font-bold text-gray-600 focus:bg-primary/5 focus:text-primary transition-colors cursor-pointer"
                      >
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!formData.categoriesId && !catsLoading && (
                  <p className="text-[11px] font-bold text-amber-500 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> Select a category first
                  </p>
                )}
              </div>

              {/* Brand Select */}
              <div className="space-y-3">
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Brand Name</label>
                <Select
                  value={formData.brandId}
                  onValueChange={(value) => setFormData({ ...formData, brandId: value })}
                  disabled={brandsLoading}
                >
                  <SelectTrigger className="w-full bg-[#F8F9FA] border-gray-100 py-4 px-6 rounded-lg font-bold text-gray-900 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all">
                    <SelectValue placeholder={brandsLoading ? "Loading..." : "Select Brand"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100 shadow-xl overflow-hidden bg-white/95 backdrop-blur-md">
                    {brands.map((brand) => (
                      <SelectItem
                        key={brand.id}
                        value={brand.id}
                        className="py-3 px-4 font-bold text-gray-600 focus:bg-primary/5 focus:text-primary transition-colors cursor-pointer"
                      >
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  value={sku}
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
                <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">Discount (%)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-4 pl-12 pr-6 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-gray-900"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
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
                <p className="text-[13px] font-bold text-gray-400 italic">Upload up to 4 high-quality images of your product.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((index) => (
                <ImageUploader
                  key={index}
                  inputId={`product-image-${index}`}
                  label={`Image ${index + 1}`}
                  imagePreview={previews[index]}
                  onFileChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const newPreviews = [...previews];
                        newPreviews[index] = reader.result as string;
                        setPreviews(newPreviews);

                        const newImages = [...formData.images];
                        newImages[index] = file;
                        setFormData({ ...formData, images: newImages });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  onClear={() => {
                    const newPreviews = [...previews];
                    newPreviews[index] = null;
                    setPreviews(newPreviews);

                    const newImages = [...formData.images];
                    newImages.splice(index, 1); // Or keep index correct if backend expects specific order
                    setFormData({ ...formData, images: newImages });
                  }}
                />
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
                (currentStep === 1 && (!formData.categoriesId || !formData.subCategoriesId || !formData.brandId)) ||
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
              disabled={createMutation.isPending || formData.images.length === 0}
              className={cn(
                "flex-1 bg-gradient-to-br from-emerald-500 to-teal-700 text-white py-4 rounded-lg font-black text-[15px] hover:shadow-xl hover:shadow-emerald-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50",
                createMutation.isPending && "animate-pulse"
              )}
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Launching...
                </>
              ) : (
                <>
                  Launch Product Listing
                  <CheckCircle2 size={20} strokeWidth={2.5} />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
