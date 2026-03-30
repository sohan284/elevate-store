"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Star,
  MessageCircle,
  Phone,
} from "lucide-react";

// ─── Mock product data ───────────────────────────────────────────
const product = {
  name: "Deshi Mustard Oil 5 liter",
  price: 1470,
  originalPrice: 1550,
  discount: 5,
  brand: "SHOMI",
  sku: "MO-5L-001",
  images: [
    "https://placehold.co/500x500/FFF8E7/F97316?text=Product+1",
    "https://placehold.co/500x500/FFF8E7/F97316?text=Product+2",
    "https://placehold.co/500x500/FFF8E7/F97316?text=Product+3",
    "https://placehold.co/500x500/FFF8E7/F97316?text=Product+4",
  ],
  description:
    "Premium quality Deshi Mustard Oil, cold-pressed and 100% natural. Perfect for cooking, hair care, and skin care. Our mustard oil is sourced from the finest mustard seeds and processed with modern techniques to retain its natural nutrients and authentic flavor.",
};

const relatedProducts = [
  { id: 1, name: "Gawa Ghee 200gm", price: 340, original: 360, image: "https://placehold.co/80x80/FFF8E7/F97316?text=G" },
  { id: 2, name: "Gura Masala Combo (Mini Pack)", price: 935, original: 985, image: "https://placehold.co/80x80/FFF8E7/F97316?text=M" },
  { id: 3, name: "Palermo Organic Extra Virgin Olive...", price: 2999, original: null, image: "https://placehold.co/80x80/FFF3E0/E65100?text=O" },
  { id: 4, name: "Deshi Mustard Oil 2 liter", price: 585, original: 620, image: "https://placehold.co/80x80/FFF8E7/F97316?text=M" },
  { id: 5, name: "Glarvest Organic Extra Virgin Olive...", price: 11000, original: null, image: "https://placehold.co/80x80/FFF3E0/E65100?text=O" },
];

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrement = () => setQuantity((q) => q + 1);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-5">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-5">

        {/* ── Left: Product Image + Info ─────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Image + Info Card */}
          <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 md:p-7 flex flex-col md:flex-row gap-6 mb-5">

            {/* Image Gallery */}
            <div className="flex flex-row md:flex-col gap-2 md:w-[88px] order-2 md:order-1 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-[8px] border-2 overflow-hidden transition-all ${selectedImage === i
                    ? "border-primary shadow-[0_0_0_1px_var(--color-primary)]"
                    : "border-gray-200 hover:border-primary/50"
                    }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 order-1 md:order-2 relative group">
              <div className="relative w-full aspect-square max-w-[380px] mx-auto bg-[#FAFAFA] rounded-[12px] overflow-hidden border border-gray-100">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
                {/* Nav arrows */}
                <button
                  onClick={() => setSelectedImage((s) => (s - 1 + product.images.length) % product.images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setSelectedImage((s) => (s + 1) % product.images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
                >
                  <ChevronRightIcon size={16} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 order-3 flex flex-col">
              <h1 className="text-[22px] md:text-[26px] font-bold text-[#2D333A] leading-tight mb-4 tracking-tight">
                {product.name}
              </h1>

              {/* Pricing */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="text-[26px] font-bold text-primary">৳{product.price.toLocaleString()}.00</span>
                <span className="text-[16px] text-gray-400 line-through font-medium">৳{product.originalPrice.toLocaleString()}.00</span>
                <span className="bg-green-100 text-green-700 text-[12px] font-bold px-2.5 py-1 rounded-full">
                  Save {product.discount}%
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-5" />

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[14px] font-semibold text-gray-600 w-20">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-[8px] overflow-hidden bg-[#F9FAFB]">
                  <button
                    onClick={handleDecrement}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                  >
                    <Minus size={15} strokeWidth={2.5} />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-[15px] font-bold text-gray-800 border-x border-gray-200 bg-white">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                  >
                    <Plus size={15} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-[8px] transition-colors shadow-sm text-[14px]">
                  <ShoppingCart size={17} strokeWidth={2} />
                  ADD TO CART
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#1E2A3B] hover:bg-[#263345] text-white font-bold py-3 rounded-[8px] transition-colors shadow-sm text-[14px]">
                  BUY NOW
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe59] text-white font-bold py-3 rounded-[8px] transition-colors shadow-sm text-[14px]">
                  <MessageCircle size={17} strokeWidth={2} />
                  Order On WhatsApp
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#3B5BDB] hover:bg-[#3451c7] text-white font-bold py-3 rounded-[8px] transition-colors shadow-sm text-[14px]">
                  <Phone size={17} strokeWidth={2} />
                  Call For Order
                </button>
              </div>

              {/* Brand */}
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[13px] font-semibold text-gray-500">Brand:</span>
                <span className="px-4 py-1.5 border border-gray-200 rounded-[6px] text-[14px] font-black text-gray-800 tracking-widest bg-white shadow-sm">
                  {product.brand}
                </span>
              </div>
            </div>
          </div>

          {/* ── Description / Reviews Tabs ──────────────────── */}
          <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden">
            {/* Tab Bar */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 text-[14px] font-semibold transition-colors border-b-2 -mb-px ${activeTab === "description"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 text-[14px] font-semibold transition-colors border-b-2 -mb-px ${activeTab === "reviews"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
              >
                Customer Reviews (0)
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              {activeTab === "description" ? (
                <div className="text-[14.5px] text-gray-600 leading-relaxed space-y-4">
                  <p>{product.description}</p>
                  <ul className="space-y-2 mt-4">
                    {[
                      "100% Pure & Natural cold-pressed mustard oil",
                      "No artificial preservatives or additives",
                      "Rich in Omega-3 and Omega-6 fatty acids",
                      "Authentic flavor with high smoke point",
                      "Ideal for cooking, frying and hair/skin care",
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-1 w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 10 10" fill="none" width="10" height="10">
                            <path d="M2 5.5L4 7.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={28} className="text-gray-200 fill-gray-200" />
                    ))}
                  </div>
                  <p className="text-gray-500 text-[14px] font-medium">No reviews yet.</p>
                  <p className="text-gray-400 text-[13px] mt-1">Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: More Products Sidebar ────────────────────── */}
        <div className="w-full lg:w-[240px] shrink-0">
          <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden sticky top-4">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
              <h3 className="text-[14px] font-bold text-[#2D333A]">More Products</h3>
              <div className="flex gap-1">
                <button className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors">
                  <ChevronLeft size={13} />
                </button>
                <button className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors">
                  <ChevronRightIcon size={13} />
                </button>
              </div>
            </div>

            {/* Product List */}
            <div className="divide-y divide-gray-50">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-[8px] overflow-hidden bg-[#FAFAFA] border border-gray-100 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-gray-700 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="text-[13px] font-bold text-primary">৳{item.price}</span>
                      {item.original && (
                        <span className="text-[11px] text-gray-400 line-through">৳{item.original}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
