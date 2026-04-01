"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye,
  AlertTriangle,
  CheckCircle2,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

const productsData = [
  { id: 1, name: "Sundarban Honey 1kg", category: "Honey", price: "2,200", stock: 45, status: "In Stock", image: "🍯" },
  { id: 2, name: "Gawa Ghee 1kg", category: "Ghee", price: "1,710", stock: 12, status: "Low Stock", image: "🥫" },
  { id: 3, name: "Mustard Oil 5L", category: "Oil", price: "1,470", stock: 85, status: "In Stock", image: "🛢️" },
  { id: 4, name: "Lachcha Semai 1kg", category: "Snacks", price: "1,400", stock: 0, status: "Out of Stock", image: "🍝" },
  { id: 5, name: "Black Seed Honey", category: "Honey", price: "1,440", stock: 28, status: "In Stock", image: "🍯" },
  { id: 6, name: "Premium Ajwa Dates", category: "Dates", price: "1,250", stock: 5, status: "Low Stock", image: "🫘" },
  { id: 7, name: "Mariam Dates 1kg", category: "Dates", price: "850", stock: 120, status: "In Stock", image: "🫘" },
];

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Product <span className="text-primary italic font-medium ml-1">Inventory</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Manage your store's products, stock levels, and categorization.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl text-[14px] font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          <Plus size={20} strokeWidth={3} />
          Add New Product
        </button>
      </div>

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by product name, SKU or category..." 
            className="w-full bg-[#F8F9FA] border border-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-[14px] font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors text-[14px] font-bold">
            <Filter size={18} />
            Filters
          </button>
          <select className="flex-1 md:flex-none bg-white border border-gray-100 rounded-xl px-5 py-3 text-[14px] font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all cursor-pointer min-w-[140px]">
            <option>All Categories</option>
            <option>Honey</option>
            <option>Ghee</option>
            <option>Dates</option>
            <option>Oil</option>
          </select>
        </div>
      </div>

      {/* ── Products Table ────────────────────────────────────── */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-50 bg-[#FBFBFC]/50">
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest bg-emerald-50 content-none"></th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest">Product Info</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Category</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Price</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Stock</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F8F9FA]/80 transition-colors group">
                  <td className="w-2 relative overflow-hidden">
                    <div className={cn(
                      "absolute inset-y-0 left-0 w-1",
                      product.status === "In Stock" && "bg-emerald-500",
                      product.status === "Low Stock" && "bg-amber-500",
                      product.status === "Out of Stock" && "bg-rose-500",
                    )} />
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {product.image}
                      </div>
                      <div>
                        <h4 className="text-[14.5px] font-bold text-gray-900 group-hover:text-primary transition-colors">{product.name}</h4>
                        <p className="text-[11.5px] font-semibold text-gray-400 mt-1 uppercase tracking-wider font-mono">SKU ID: ELV{1000 + product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[12px] font-bold">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-[14.5px] font-black text-gray-900">৳{product.price}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-[14.5px] font-bold text-gray-700">{product.stock} Units</span>
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            product.stock > 50 ? "bg-emerald-500" : product.stock > 10 ? "bg-amber-500" : "bg-rose-500"
                          )} 
                          style={{ width: `${Math.min(product.stock, 100)}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider",
                        product.status === "In Stock" && "bg-emerald-50 text-emerald-600",
                        product.status === "Low Stock" && "bg-amber-50 text-amber-600",
                        product.status === "Out of Stock" && "bg-rose-50 text-rose-600",
                      )}>
                        {product.status === "In Stock" && <CheckCircle2 size={12} />}
                        {product.status === "Low Stock" && <AlertTriangle size={12} />}
                        {product.status === "Out of Stock" && <Package size={12} />}
                        {product.status}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:bg-white hover:text-primary hover:shadow-md rounded-lg transition-all" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-white hover:text-amber-500 hover:shadow-md rounded-lg transition-all" title="Edit Product">
                        <Edit3 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-white hover:text-rose-500 hover:shadow-md rounded-lg transition-all" title="Delete Product">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Summary */}
        <div className="p-6 bg-[#FBFBFC]/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] font-bold text-gray-500 uppercase">Showing <span className="text-gray-900">7</span> of <span className="text-gray-900">142</span> Products</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, '...', 12].map((n, i) => (
              <button 
                key={i} 
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-bold transition-all",
                  n === 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-gray-100 text-gray-500 hover:border-primary/30 hover:text-primary"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
