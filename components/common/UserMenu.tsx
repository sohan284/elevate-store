"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";
import { getProxiedImageUrl, cn } from "@/lib/utils";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const initials =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  const avatarUrl = getProxiedImageUrl(user?.avatar);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center gap-1.5 text-gray-800 hover:text-primary group transition-all duration-300 outline-none"
      >
        <div className="relative group-hover:-translate-y-0.5 transition-transform">
          {avatarUrl ? (
            <div className="w-6 h-6 sm:w-[26px] sm:h-[26px] rounded-full overflow-hidden border border-gray-200">
              <img
                src={avatarUrl}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-6 h-6 sm:w-[26px] sm:h-[26px] rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center text-[10px] text-white font-bold border border-white shadow-sm">
              {initials}
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[1px] shadow-xs border border-gray-100">
            <ChevronDown
              size={8}
              className={cn(
                "text-gray-400 transition-transform duration-300",
                isOpen && "rotate-180",
              )}
            />
          </div>
        </div>
        <span className="text-[10px] sm:text-[12px] font-medium hidden sm:block whitespace-nowrap max-w-[80px] truncate">
          {user.firstName}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <div className="px-4 py-3 border-b border-gray-50 mb-1">
            <p className="text-[13px] font-bold text-gray-900 truncate">
              {user.displayName}
            </p>
            <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            {user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
              >
                <LayoutDashboard size={16} strokeWidth={1.5} />
                Dashboard
              </Link>
            )}
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
            >
              <User size={16} strokeWidth={1.5} />
              My Profile
            </Link>
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
            >
              <Settings size={16} strokeWidth={1.5} />
              Account Settings
            </Link>
          </div>

          <div className="mt-1 pt-1 border-t border-gray-50">
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors font-medium mt-1"
            >
              <LogOut size={16} strokeWidth={1.5} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
