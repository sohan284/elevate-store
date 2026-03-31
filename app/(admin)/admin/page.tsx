"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity,
  MoreVertical,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

const kpiData = [
  { 
    name: "Total Revenue", 
    value: "৳158,400", 
    change: "+12.5%", 
    trend: "up", 
    icon: DollarSign, 
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20"
  },
  { 
    name: "Total Orders", 
    value: "1,280", 
    change: "+5.2%", 
    trend: "up", 
    icon: ShoppingBag, 
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20"
  },
  { 
    name: "Average Order", 
    value: "৳2,450", 
    change: "-2.1%", 
    trend: "down", 
    icon: Activity, 
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20"
  },
  { 
    name: "Active Customers", 
    value: "840", 
    change: "+18.4%", 
    trend: "up", 
    icon: Users, 
    color: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20"
  },
];

const recentOrders = [
  { id: "ORD-7392", customer: "Sarah Johnson", product: "Gawa Ghee 1kg", amount: "৳1,710", status: "Delivered", date: "2 mins ago" },
  { id: "ORD-7391", customer: "David Miller", product: "Sundarban Honey 1kg", amount: "৳2,200", status: "Pending", date: "15 mins ago" },
  { id: "ORD-7390", customer: "Robert Wilson", product: "Mustard Oil 5L", amount: "৳1,470", status: "Shipped", date: "1 hour ago" },
  { id: "ORD-7389", customer: "Emily Davis", product: "Black Seed Honey", amount: "৳1,440", status: "Delivered", date: "3 hours ago" },
  { id: "ORD-7388", customer: "Michael Brown", product: "Medjool Dates", amount: "৳1,100", status: "Cancelled", date: "5 hours ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard <span className="text-primary italic font-medium ml-1">Overview</span></h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">Welcome back, here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-[13.5px] font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all cursor-pointer">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-[13.5px] font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center gap-2">
            Download Report
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* ── KPI Grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <div key={kpi.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
            <div className={cn("absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-[0.03] -mr-8 -mt-8 rounded-full", kpi.color)} />
            
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg", kpi.color, kpi.shadow)}>
                <kpi.icon size={22} />
              </div>
              <div className={cn(
                "flex items-center gap-0.5 text-[12.5px] font-bold px-2 py-1 rounded-lg",
                kpi.trend === "up" ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
              )}>
                {kpi.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.change}
              </div>
            </div>
            <div>
              <p className="text-[13.5px] font-semibold text-gray-500 uppercase tracking-wider">{kpi.name}</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
        {/* ── Sales Analytics Chart Area ──────────────────────── */}
        <section className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[480px]">
          <div className="p-7 border-b border-gray-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h2 className="text-lg font-black text-gray-900 tracking-tight">Revenue <span className="text-gray-400 font-medium">Statistics</span></h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[12.5px] font-bold text-gray-500 uppercase">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-100" />
                <span className="text-[12.5px] font-bold text-gray-500 uppercase">Target</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors ml-4">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-8 flex flex-col relative overflow-hidden">
            {/* Mock SVG Chart Rendering */}
            <div className="flex-1 relative flex items-end justify-between gap-2 pt-10">
              {[45, 62, 48, 84, 76, 52, 92, 68, 74, 98, 82, 95].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-4 group">
                  <div className="relative w-full flex justify-center">
                     <span className="absolute -top-8 bg-[#1A1F26] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">৳{val}k</span>
                     <div 
                      className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-primary/80 to-primary group-hover:to-blue-400 transition-all duration-500 shadow-xl shadow-primary/10" 
                      style={{ height: `${val}%` }} 
                    />
                  </div>
                  <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-tighter">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                  </span>
                </div>
              ))}
              
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12 pt-10">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="w-full border-t border-gray-50" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Recent Activity/Orders ──────────────────────────── */}
        <section className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-7 border-b border-gray-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
              <h2 className="text-lg font-black text-gray-900 tracking-tight">Recent <span className="text-gray-400 font-medium">Orders</span></h2>
            </div>
            <Link href="/admin/orders" className="text-[13px] font-bold text-primary hover:underline flex items-center gap-1 group">
              View All
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto">
            {recentOrders.map((order, idx) => (
              <div key={order.id} className={cn(
                "p-5 flex items-center justify-between hover:bg-[#F8F9FA] transition-colors border-b border-gray-50 last:border-0 group",
                idx % 2 === 0 ? "bg-white" : "bg-[#FBFBFC]/50"
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[13px] text-white",
                    "bg-gradient-to-br from-slate-700 to-slate-900"
                  )}>
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 leading-tight">{order.customer}</h4>
                    <p className="text-[12.5px] font-semibold text-gray-500 mt-0.5">{order.product}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[14px] font-black text-gray-900">{order.amount}</span>
                  <div className={cn(
                    "mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                    order.status === "Delivered" && "bg-emerald-100 text-emerald-700",
                    order.status === "Pending" && "bg-amber-100 text-amber-700",
                    order.status === "Shipped" && "bg-blue-100 text-blue-700",
                    order.status === "Cancelled" && "bg-rose-100 text-rose-700",
                  )}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Summary Footer */}
          <div className="p-6 bg-[#1A1F26] text-white rounded-t-3xl mt-auto">
             <div className="flex items-center justify-between mb-4">
               <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Active Store Statistics</span>
               <div className="flex items-center gap-1.5 text-emerald-400 animate-pulse">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                 <span className="text-[10px] font-black uppercase tracking-widest leading-none">Live</span>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                 <p className="text-[11px] font-bold text-gray-500 uppercase">Items Sold Today</p>
                 <h5 className="text-xl font-black mt-1 tracking-tight">242</h5>
               </div>
               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                 <p className="text-[11px] font-bold text-gray-500 uppercase">New Signups</p>
                 <h5 className="text-xl font-black mt-1 tracking-tight">18 <span className="text-[10px] text-primary">+3</span></h5>
               </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
