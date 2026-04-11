"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Package,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProducts, useDeleteProduct } from "@/lib/hooks/useProducts";
import { useCategories } from "@/lib/hooks/useCategories";
import { Loader2 } from "lucide-react";
import { DataTable, ColumnDef } from "@/components/common/DataTable";
import {
  DataTableFilterBar,
  DataTableSearch,
  DataTableSelect,
  DataTableFilterButton
} from "@/components/common/DataTableFilters";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminProducts() {
  const { data: productResp, isLoading } = useProducts();
  const { data: categoryResp } = useCategories();
  const deleteMutation = useDeleteProduct();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Matching the design or choosing a reasonable number

  const products = productResp?.data || [];
  const categories = categoryResp?.data || [];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || p.categoriesId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const columns: ColumnDef<any>[] = [
    {
      header: "",
      className: "w-2 relative overflow-hidden p-0",
      cell: (product) => (
        <div className={cn(
          "absolute inset-y-0 left-0 w-1",
          product.status === "In Stock" && "bg-emerald-500",
          product.status === "Low Stock" && "bg-amber-500",
          product.status === "Out of Stock" && "bg-rose-500",
        )} />
      )
    },
    {
      header: "Product Info",
      cell: (product) => {
        const productImageUrl = typeof product.images?.[0] === 'string' ? product.images[0] : product.images?.[0]?.url;
        return (
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
              <p className="text-[11.5px] font-semibold text-gray-400 mt-1 uppercase tracking-wider font-mono">SKU: {product.sku || (product._id || product.id)?.slice(0, 8)}</p>
            </div>
          </div>
        );
      }
    },
    {
      header: "Category",
      headerClassName: "text-center",
      className: "text-center",
      cell: (product) => (
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[12px] font-bold">
          {categories.find(c => c.id === product.categoriesId)?.name || "Uncategorized"}
        </span>
      )
    },
    {
      header: "Price",
      headerClassName: "text-center",
      className: "text-center",
      cell: (product) => (
        <span className="text-[14.5px] font-black text-gray-900">৳{product.price}</span>
      )
    },
    {
      header: "Stock",
      headerClassName: "text-center",
      className: "text-center",
      cell: (product) => (
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
      )
    },
    {
      header: "Status",
      headerClassName: "text-center",
      className: "text-center",
      cell: (product) => (
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
      )
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (product) => (
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
            onClick={(e) => {
              e.stopPropagation();
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
      )
    }
  ];


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* ── Page Header ───────────────────────────────────────── */}
      <AdminPageHeader
        title="Product"
        highlight="Inventory"
        description="Manage your store's products, stock levels, and categorization."
        actions={
          <Link
            href="/admin/products/new"
            className="bg-primary text-white px-6 py-3 rounded-lg text-[14px] font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Plus size={20} strokeWidth={3} />
            Add New Product
          </Link>
        }
      />

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <DataTableFilterBar>
        <DataTableSearch
          placeholder="Search by product name or SKU..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <div className="flex items-center gap-3 w-full md:w-auto">
          <DataTableSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={[
              { label: "All Categories", value: "all" },
              ...categories.map((cat) => ({ label: cat.name, value: cat.id }))
            ]}
            placeholder="All Categories"
          />
        </div>
      </DataTableFilterBar>

      {/* ── Products Table ────────────────────────────────────── */}
      <DataTable
        data={paginatedProducts}
        columns={columns}
        isLoading={isLoading}
        height="flex-1" // Use the new flex-1 identifier
        emptyMessage={<div className="flex  flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-[32px] flex items-center justify-center text-gray-300">
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
        </div>}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
