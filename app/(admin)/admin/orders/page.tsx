"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  MoreVertical,
  Printer,
  ChevronRight,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

const ordersData = [
  { id: "ORD-9402", customer: "Sarah Johnson", email: "sarah@example.com", product: "Sundarban Honey 1kg", items: 2, total: "4,400", status: "Delivered", date: "Mar 28, 2024", time: "10:45 AM" },
  { id: "ORD-9401", customer: "David Miller", email: "david.m@example.com", product: "Gawa Ghee 1kg", items: 1, total: "1,710", status: "Shipped", date: "Mar 28, 2024", time: "09:30 AM" },
  { id: "ORD-9400", customer: "Robert Wilson", email: "robert.w@example.com", product: "Mustard Oil 5L", items: 1, total: "1,470", status: "Processing", date: "Mar 27, 2024", time: "04:15 PM" },
  { id: "ORD-9399", customer: "Emily Davis", email: "emily.d@example.com", product: "Black Seed Honey", items: 1, total: "1,440", status: "Pending", date: "Mar 27, 2024", time: "02:00 PM" },
  { id: "ORD-9398", customer: "Michael Brown", email: "mbrown@example.com", product: "Premium Ajwa Dates", items: 3, total: "3,750", status: "Cancelled", date: "Mar 27, 2024", time: "11:20 AM" },
  { id: "ORD-9397", customer: "Jessica Lee", email: "jlee@example.com", product: "Mariam Dates 1kg", items: 1, total: "850", status: "Delivered", date: "Mar 26, 2024", time: "05:50 PM" },
  { id: "ORD-9396", customer: "Kevin White", email: "kwhite@example.com", product: "Sundarban Honey 1kg", items: 1, total: "2,200", status: "Shipped", date: "Mar 26, 2024", time: "03:10 PM" },
];

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState("All Orders");

  const tabs = ["All Orders", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Order <span className="text-primary italic font-medium ml-1">Fulfillment</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Track, fulfill, and manage your store's customer orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-100 text-gray-700 px-5 py-3 rounded-xl text-[14px] font-bold hover:bg-gray-50 hover:shadow-md transition-all flex items-center justify-center gap-2">
            <Printer size={18} />
            Bulk Print
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl text-[14px] font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <Download size={18} />
            Export Orders
          </button>
        </div>
      </div>

      {/* ── Tabs & Search ─────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-full text-[13.5px] font-bold whitespace-nowrap transition-all",
                activeTab === tab 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-white border border-gray-100 text-gray-400 hover:border-primary/30 hover:text-primary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search orders (ID, customer name, email)..." 
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-[14px] font-medium"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors text-[14px] font-bold w-full md:w-auto">
            <Filter size={18} />
            More Filters
          </button>
        </div>
      </div>

      {/* ── Orders Table ──────────────────────────────────────── */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="border-b border-gray-50 bg-[#FBFBFC]/50">
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest">Product & Date</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Items</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Amount</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F8F9FA]/80 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-[14px] font-black text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all cursor-pointer">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div>
                      <h4 className="text-[14.5px] font-bold text-gray-900 leading-tight">{order.customer}</h4>
                      <p className="text-[11.5px] font-semibold text-gray-400 mt-1 lowercase font-mono">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div>
                      <h4 className="text-[14px] font-semibold text-gray-700 leading-tight">{order.product}</h4>
                      <p className="text-[11.5px] font-bold text-gray-400 mt-1 flex items-center gap-1.5">
                        <Clock size={12} strokeWidth={3} />
                        {order.date} <span className="text-gray-300">•</span> {order.time}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-[14px] font-black text-gray-900 bg-[#F8F9FA] w-8 h-8 rounded-full inline-flex items-center justify-center border border-gray-100">
                      {order.items}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-[15px] font-black text-gray-900">৳{order.total}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider",
                        order.status === "Delivered" && "bg-emerald-100 text-emerald-700 shadow-sm shadow-emerald-500/10",
                        order.status === "Shipped" && "bg-blue-100 text-blue-700 shadow-sm shadow-blue-500/10",
                        order.status === "Processing" && "bg-indigo-100 text-indigo-700 shadow-sm shadow-indigo-500/10",
                        order.status === "Pending" && "bg-amber-100 text-amber-700 shadow-sm shadow-amber-500/10",
                        order.status === "Cancelled" && "bg-rose-100 text-rose-700 shadow-sm shadow-rose-500/10",
                      )}>
                        {order.status === "Delivered" && <CheckCircle2 size={12} strokeWidth={3} />}
                        {order.status === "Shipped" && <Truck size={12} strokeWidth={3} />}
                        {order.status === "Processing" && <Clock size={12} strokeWidth={3} />}
                        {order.status === "Pending" && <Clock size={12} strokeWidth={3} />}
                        {order.status === "Cancelled" && <XCircle size={12} strokeWidth={3} />}
                        {order.status}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-primary hover:text-white transition-all text-[12.5px] font-bold group/btn">
                         Manage
                         <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                       </button>
                       <button className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                         <MoreVertical size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status Indicators Legend */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-4">
           <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
             <span className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Payments Verified</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
             <span className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Unverified Payments</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
             <span className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Expedited Delivery</span>
           </div>
        </div>
      </div>
    </div>
  );
}
