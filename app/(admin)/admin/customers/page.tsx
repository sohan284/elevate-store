"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  MoreVertical, 
  UserPlus,
  Star,
  ChevronRight,
  TrendingUp,
  History,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Customer <span className="text-primary italic font-medium ml-1">Directory</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Manage your customer base, track lifetime value, and support engagement.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl text-[14px] font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          <UserPlus size={20} strokeWidth={3} />
          Add Customer
        </button>
      </div>

      {/* ── Stats Summary ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-primary/20 transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
             <Users size={24} />
          </div>
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Total Customers</p>
            <h3 className="text-2xl font-black text-gray-900">1,248 <span className="text-[11px] text-emerald-500 font-bold ml-1">+12%</span></h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-amber-400/20 transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
             <Star size={24} />
          </div>
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">VIP Members</p>
            <h3 className="text-2xl font-black text-gray-900">156 <span className="text-[11px] text-amber-500 font-bold ml-1">Top Tier</span></h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-blue-400/20 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
             <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Customer Growth</p>
            <h3 className="text-2xl font-black text-gray-900">4.2% <span className="text-[11px] text-blue-500 font-bold ml-1">This Week</span></h3>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by customer name, email or phone..." 
            className="w-full bg-[#F8F9FA] border border-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-[14px] font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors text-[14px] font-bold w-full md:w-auto">
          <Filter size={18} />
          All Segments
        </button>
      </div>

      {/* ── Customers Table ───────────────────────────────────── */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-50 bg-[#FBFBFC]/50">
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest">Customer Details</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Contact Info</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Total Orders</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Spend (LTV)</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F8F9FA]/80 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gray-700 to-gray-900 border border-gray-100 flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-[14.5px] font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{customer.name}</h4>
                        <p className="text-[11.5px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Joined {customer.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
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
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-[14.5px] font-black text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                      {customer.orders}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-[15px] font-black text-primary">৳{customer.ltv}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider",
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
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-[#1A1F26] hover:text-white transition-all text-[12.5px] font-bold group/btn shadow-sm hover:shadow-lg">
                         Profile
                         <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                       </button>
                       <button className="p-2.5 text-gray-300 hover:text-gray-500 transition-colors">
                         <MoreVertical size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Retention Summary Footer */}
        <div className="p-8 bg-[#1A1F26] text-white flex flex-col md:flex-row items-center justify-between gap-6">
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
           <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
              <div className="px-5 py-2.5 rounded-xl bg-primary text-white text-[12px] font-black tracking-widest uppercase shadow-lg shadow-primary/20 cursor-pointer hover:scale-[1.02] transition-transform active:scale-[0.98]">
                Export Data
              </div>
              <div className="px-5 py-2.5 rounded-xl text-gray-400 text-[12px] font-black tracking-widest uppercase cursor-pointer hover:text-white hover:bg-white/5 transition-all">
                Broadcast SMS
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
