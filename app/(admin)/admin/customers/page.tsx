"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  UserPlus,
  Star,
  ChevronRight,
  TrendingUp,
  History,
  Users,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

import { DataTable, ColumnDef } from "@/components/common/DataTable";
import {
  DataTableFilterBar,
  DataTableSearch,
  DataTableFilterButton
} from "@/components/common/DataTableFilters";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const customersData = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", phone: "+880 1711-223344", orders: 12, ltv: "24,500", status: "VIP", joined: "Jan 12, 2024" },
  { id: 2, name: "David Miller", email: "miller.d@example.com", phone: "+880 1822-334455", orders: 5, ltv: "8,200", status: "Regular", joined: "Feb 05, 2024" },
  { id: 3, name: "Robert Wilson", email: "robert.w@gmail.com", phone: "+880 1933-445566", orders: 18, ltv: "42,100", status: "VIP", joined: "Nov 22, 2023" },
  { id: 4, name: "Emily Davis", email: "emily.d@outlook.com", phone: "+880 1644-556677", orders: 1, ltv: "1,440", status: "New", joined: "Mar 25, 2024" },
  { id: 5, name: "Michael Brown", email: "mbrown@yahoo.com", phone: "+880 1555-667788", orders: 3, ltv: "4,850", status: "Regular", joined: "Dec 30, 2023" },
  { id: 6, name: "Jessica Lee", email: "jess.lee@example.com", phone: "+880 1766-778899", orders: 0, ltv: "0", status: "New", joined: "Mar 28, 2024" },
  { id: 7, name: "Tanvir Ahmed", email: "tanvir@example.com", phone: "+880 1311-223344", orders: 9, ltv: "15,600", status: "Regular", joined: "Jan 28, 2024" },
];

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(customersData.length / itemsPerPage);
  const paginatedCustomers = customersData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const customerColumns: ColumnDef<any>[] = [
    {
      header: "Customer Details",
      cell: (customer) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-linear-to-br from-gray-700 to-gray-900 border border-gray-100 flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-[14.5px] font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{customer.name}</h4>
            <p className="text-[11.5px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Joined {customer.joined}</p>
          </div>
        </div>
      )
    },
    {
      header: "Contact Info",
      headerClassName: "text-center",
      className: "text-center",
      cell: (customer) => (
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-[13px] text-gray-600 font-medium">
            <Mail size={12} className="text-gray-400" />
            {customer.email}
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-600 font-medium">
            <Phone size={12} className="text-gray-400" />
            {customer.phone}
          </div>
        </div>
      )
    },
    {
      header: "Total Orders",
      headerClassName: "text-center",
      className: "text-center",
      cell: (customer) => (
        <span className="text-[14.5px] font-black text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
          {customer.orders}
        </span>
      )
    },
    {
      header: "Spend (LTV)",
      headerClassName: "text-center",
      className: "text-center",
      cell: (customer) => (
        <span className="text-[15px] font-black text-primary">৳{customer.ltv}</span>
      )
    },
    {
      header: "Status",
      headerClassName: "text-center",
      className: "text-center",
      cell: (customer) => (
        <div className="flex justify-center">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider",
            customer.status === "VIP" && "bg-amber-100 text-amber-700 shadow-sm shadow-amber-500/10",
            customer.status === "Regular" && "bg-blue-100 text-blue-700 shadow-sm shadow-blue-500/10",
            customer.status === "New" && "bg-emerald-100 text-emerald-700 shadow-sm shadow-emerald-500/10",
          )}>
            {customer.status === "VIP" && <Star size={12} fill="currentColor" />}
            {customer.status === "Regular" && <TrendingUp size={12} />}
            {customer.status === "New" && <History size={12} />}
            {customer.status}
          </div>
        </div>
      )
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (customer) => (
        <div className="flex items-center justify-end gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-[#1A1F26] hover:text-white transition-all text-[12.5px] font-bold group/btn shadow-sm hover:shadow-lg">
            Profile
            <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
          <button className="p-2.5 text-gray-300 hover:text-gray-500 transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* ── Page Header ───────────────────────────────────────── */}
      <AdminPageHeader
        title="Customer"
        highlight="Directory"
        description="Manage your customer base, track lifetime value, and support engagement."
        actions={
          <button className="bg-primary text-white px-6 py-3 rounded-lg text-[14px] font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <UserPlus size={20} strokeWidth={3} />
            Add Customer
          </button>
        }
      />
      {/* ── Filter Bar ────────────────────────────────────────── */}
      <DataTableFilterBar>
        <DataTableSearch
          placeholder="Search by customer name, email or phone..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <DataTableFilterButton icon={Filter}>
          All Segments
        </DataTableFilterButton>
      </DataTableFilterBar>

      <DataTable
        data={paginatedCustomers}
        columns={customerColumns}
        height="flex-1"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Retention Summary Footer */}
      <div className="p-8 bg-[#1A1F26] text-white flex flex-col md:flex-row items-center justify-between gap-6 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Retention Rate</span>
            <div className="flex items-center gap-3">
              <h5 className="text-2xl font-black tracking-tight">84.2%</h5>
              <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-bold bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                <TrendingUp size={10} />
                +2.4%
              </div>
            </div>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Churn Rate</span>
            <h5 className="text-2xl font-black tracking-tight">1.8%</h5>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/5">
          <div className="px-5 py-2.5 rounded-lg bg-primary text-white text-[12px] font-black tracking-widest uppercase shadow-lg shadow-primary/20 cursor-pointer hover:scale-[1.02] transition-transform active:scale-[0.98]">
            Export Data
          </div>
          <div className="px-5 py-2.5 rounded-lg text-gray-400 text-[12px] font-black tracking-widest uppercase cursor-pointer hover:text-white hover:bg-white/5 transition-all">
            Broadcast SMS
          </div>
        </div>
      </div>
    </div>
  );
}
