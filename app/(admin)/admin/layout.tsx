"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  ChevronDown,
  Grid2X2,
  Tags
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    name: "Catalog",
    icon: Package,
    children: [
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Categories", href: "/admin/categories", icon: Grid2X2 },
      { name: "Brands", href: "/admin/brands", icon: Tags },
    ]
  },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      {/* ── Sidebar (Desktop) ─────────────────────────────────── */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-[#1A1F26] text-white transition-transform duration-300 transform lg:relative lg:translate-x-0 shadow-2xl",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <span className="text-xl font-black italic">E</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Elevate <span className="text-primary/90 text-sm font-medium">Admin</span></span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white p-1">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
            {sidebarItems.map((item) => (
              <SidebarItem key={item.name} item={item} pathname={pathname} />
            ))}
          </nav>

          {/* User Section Bottom */}
          <div className="p-6 border-t border-white/5 bg-black/10">
            <button className="flex items-center gap-4 px-5 py-3 w-full text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-800/10">
              <LogOut size={18} />
              <span className="text-[14.5px] font-semibold">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ─────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-10 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu size={22} />
            </button>

            {/* Page Title or Search */}
            <div className="hidden md:flex items-center bg-[#F8F9FA] rounded-full px-5 py-2.5 w-[360px] border border-gray-100 focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 transition-all group">
              <Search size={18} className="text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search analytics, orders, products..."
                className="bg-transparent border-none outline-none ml-4 text-[14px] w-full text-gray-700 placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Notification Badge */}
            <button className="relative p-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-primary transition-all">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-800 rounded-full border-2 border-white animate-pulse" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3.5 pl-4 sm:pl-6 border-l border-gray-100 cursor-pointer group">
              <div className="hidden sm:block text-right">
                <p className="text-[14px] font-bold text-gray-900 leading-none mb-1">Md Sohan</p>
                <p className="text-[11.5px] font-semibold text-primary/80 uppercase tracking-wider">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                MS
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#FBFBFC]">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
function SidebarItem({ item, pathname }: { item: any, pathname: string }) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.href || (hasChildren && item.children.some((child: any) => pathname === child.href));
  const [isOpen, setIsOpen] = useState(isActive);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group text-[14.5px] font-bold uppercase tracking-widest",
          isActive
            ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        )}
      >
        <item.icon size={18} strokeWidth={2.5} className={cn(isActive ? "text-white" : "text-gray-500 group-hover:text-primary transition-colors")} />
        {item.name}
        {isActive && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />}
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-4 px-5 py-3.5 w-full rounded-xl transition-all duration-300 group text-[14.5px] font-bold uppercase tracking-widest",
          isActive
            ? "text-primary bg-primary/5"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        )}
      >
        <item.icon size={18} strokeWidth={2.5} className={cn(isActive ? "text-primary" : "text-gray-500 group-hover:text-primary transition-colors")} />
        {item.name}
        <div className={cn("ml-auto transition-transform duration-300", isOpen && "rotate-180")}>
          <ChevronDown size={16} strokeWidth={3} />
        </div>
      </button>

      {isOpen && (
        <div className="pl-14 pr-2 space-y-1 animate-in slide-in-from-top-2 duration-300">
          {item.children.map((child: any) => {
            const isChildActive = pathname === child.href;
            return (
              <Link
                key={child.name}
                href={child.href}
                className={cn(
                  "flex items-center gap-3 py-2.5 rounded-lg transition-all duration-200 text-[13px] font-bold uppercase tracking-wider",
                  isChildActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-white"
                )}
              >
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  isChildActive ? "bg-primary scale-125 shadow-[0_0_8px_var(--primary)]" : "bg-gray-700"
                )} />
                {child.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
