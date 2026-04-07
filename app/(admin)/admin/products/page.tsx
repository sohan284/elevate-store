"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import { useProducts, useDeleteProduct } from "@/lib/hooks/useProducts";
import { useCategories } from "@/lib/hooks/useCategories";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function AdminProducts() {
  const { data: productResp, isLoading } = useProducts();
  const { data: categoryResp } = useCategories();
  const deleteMutation = useDeleteProduct();

  const [searchTerm, setSearchTerm] = useState("");

  const products = productResp?.data || [];
  const categories = categoryResp?.data || [];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Product <span className="text-primary italic font-medium ml-1">Inventory</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Manage your store's products, stock levels, and categorization.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-primary text-white px-6 py-3 rounded-lg text-[14px] font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Plus size={20} strokeWidth={3} />
          Add New Product
        </Link>
      </div>

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-[14px] font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors text-[14px] font-bold">
            <Filter size={18} />
            Filters
          </button>
          <Select defaultValue="all">
            <SelectTrigger className="flex-1 md:flex-none bg-white border-gray-100 py-3 px-5 rounded-lg font-bold text-gray-700 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all min-w-[160px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 shadow-xl overflow-hidden bg-white/95 backdrop-blur-md">
              <SelectItem value="all" className="py-2.5 px-4 font-bold text-gray-600 focus:bg-primary/5 focus:text-primary transition-colors cursor-pointer">
                All Categories
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem 
                  key={cat.id} 
                  value={cat.id}
                  className="py-2.5 px-4 font-bold text-gray-600 focus:bg-primary/5 focus:text-primary transition-colors cursor-pointer"
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Products Table ────────────────────────────────────── */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
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
              {isLoading ? (
                 <tr>
                    <td colSpan={7} className="px-8 py-20 text-center">
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <Loader2 className="animate-spin" size={24} />
                        <span className="font-bold tracking-widest uppercase text-sm">Fetching Inventory...</span>
                      </div>
                    </td>
                 </tr>
              ) : filteredProducts.length > 0 ? filteredProducts.map((product) => {
                const productImageUrl = typeof product.images?.[0] === 'string' ? product.images[0] : product.images?.[0]?.url;
                
                return (
                <tr key={product._id} className="border-b border-gray-50 last:border-0 hover:bg-[#F8F9FA]/80 transition-colors group">
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
                      <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {productImageUrl ? (
                          <img src={productImageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="text-gray-300" size={24} />
                        )}
                      </div>
                      <div>
                        <h4 className="text-[14.5px] font-bold text-gray-900 group-hover:text-primary transition-colors">{product.name}</h4>
                        <p className="text-[11.5px] font-semibold text-gray-400 mt-1 uppercase tracking-wider font-mono">SKU: {product.sku || product.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[12px] font-bold">
                      {categories.find(c => c.id === product.categoriesId)?.name || "Uncategorized"}
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
                          style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider",
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
                      <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="p-2 text-gray-400 hover:bg-white hover:text-amber-500 hover:shadow-md rounded-lg transition-all"
                        title="Edit Product"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${product.name}?`)) {
                            deleteMutation.mutate(product._id);
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-gray-400 hover:bg-white hover:text-rose-500 hover:shadow-md rounded-lg transition-all disabled:opacity-50"
                        title="Delete Product"
                      >
                        {deleteMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              )}) : (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-300">
                        <Package size={40} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-gray-400 uppercase tracking-widest">No products found</p>
                        <p className="text-[13px] font-bold text-gray-400/60 mt-1">Start adding your inventory to see it here.</p>
                      </div>
                      <Link
                        href="/admin/products/new"
                        className="mt-2 bg-primary text-white px-6 py-3 rounded-lg text-[14px] font-bold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <Plus size={18} strokeWidth={3} />
                        Add First Product
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Summary */}
        {!isLoading && products.length > 0 && (
          <div className="p-6 bg-[#FBFBFC]/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[13px] font-bold text-gray-500 uppercase">Showing <span className="text-gray-900">{filteredProducts.length}</span> of <span className="text-gray-900">{products.length}</span> Products</p>
            <div className="flex items-center gap-2">
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-bold bg-primary text-white shadow-lg shadow-primary/20 transition-all"
              >
                1
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
