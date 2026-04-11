"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, User, Heart, ShoppingCart, Menu } from "lucide-react";
import MobileMenu from "@/components/common/MobileMenu";
import { useCartStore } from "@/lib/store/useCartStore";
import { useAuthStore } from "@/lib/store/auth-store";
import UserMenu from "@/components/common/UserMenu";

export default function Navbar() {
  const { items, toggleDrawer } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* flex-wrap ensures search drops to next line on mobile */}
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-2 lg:gap-8">

          {/* Brand/Logo Section with Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <MobileMenu />
            <Link href="/" className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Custom Asset Logo */}
              <div className="relative flex items-center justify-center p-1 transform scale-90 sm:scale-100">
                <Image
                  src="/assets/logo.png"
                  alt="Elevate Store Logo"
                  width={55}
                  height={55}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col ml-1 tracking-wider font-bold leading-none">
                <div className="flex items-start">
                  <span className="text-lg sm:text-[20px] bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">ELEVATE</span>
                  <span className="text-[10px] text-gray-400 font-normal leading-none ml-[2px] mt-1">®</span>
                </div>
                <span className="text-lg sm:text-[20px] -mt-1 bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">STORE</span>
              </div>
            </Link>
          </div>

          {/* Action Icons Section - Moves to right, order 2 on mobile, order 3 on desktop */}
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-7 shrink-0 order-2 lg:order-3">

            <button className="hidden lg:flex flex-col items-center gap-1.5 text-gray-800 hover:text-primary group transition-all duration-300">
              <MapPin size={24} strokeWidth={1.5} className="group-hover:text-primary group-hover:-translate-y-0.5 transition-transform sm:w-[26px] sm:h-[26px]" />
              <span className="text-[10px] sm:text-[12px] font-medium hidden sm:block">Track Order</span>
            </button>

            {mounted && isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link href="/signin" className="hidden sm:flex flex-col items-center gap-1.5 text-gray-800 hover:text-primary group transition-all duration-300">
                <User size={24} strokeWidth={1.5} className="group-hover:text-primary group-hover:-translate-y-0.5 transition-transform sm:w-[26px] sm:h-[26px]" />
                <span className="text-[10px] sm:text-[12px] font-medium hidden sm:block">Sign In</span>
              </Link>
            )}

            <button className="hidden md:flex flex-col items-center gap-1.5 text-gray-800 hover:text-primary group transition-all duration-300">
              <Heart size={24} strokeWidth={1.5} className="group-hover:text-primary group-hover:-translate-y-0.5 transition-transform sm:w-[26px] sm:h-[26px]" />
              <span className="text-[10px] sm:text-[12px] font-medium hidden sm:block">Wishlist</span>
            </button>

            <button 
              onClick={toggleDrawer}
              className="relative flex flex-col items-center gap-1.5 text-gray-800 hover:text-primary group transition-all duration-300"
            >
              <div className="relative">
                <ShoppingCart size={24} strokeWidth={1.5} className="group-hover:text-primary group-hover:-translate-y-0.5 transition-transform sm:w-[26px] sm:h-[26px]" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-3 bg-linear-to-r from-primary to-secondary text-white text-[10px] sm:text-[11px] font-bold h-4 sm:h-5 min-w-[16px] sm:min-w-[20px] flex items-center justify-center rounded-full px-1 sm:px-1.5 shadow-md border border-white animate-in zoom-in-50 duration-300">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[12px] font-medium hidden sm:block">Cart</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 text-gray-800 hover:text-primary group transition-all duration-300">
              <Menu size={24} strokeWidth={1.5} className="group-hover:text-primary group-hover:-translate-y-0.5 transition-transform sm:w-[26px] sm:h-[26px]" />
              <span className="text-[10px] sm:text-[12px] font-medium hidden sm:block">More</span>
            </button>
          </div>

          {/* Search Section - Full width on mobile (order 3), contained on desktop (order 2) */}
          <div className="w-full lg:flex-1 lg:max-w-md lg:mx-auto order-3 lg:order-2">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-[#f3f4f6] hover:bg-[#e5e7eb] focus:bg-white text-gray-900 placeholder:text-gray-500 rounded-lg py-2 sm:py-2.5 px-4 sm:px-5 pr-12 outline-none focus:ring-1 focus:ring-primary transition-all shadow-sm text-sm sm:text-base border border-transparent focus:border-primary/20"
              />
              <button className="absolute right-0 top-0 h-full px-4 sm:px-5 text-gray-500 hover:text-primary transition-colors">
                <Search size={20} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
