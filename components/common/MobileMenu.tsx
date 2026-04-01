"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, User, Contact, Heart, HelpCircle } from "lucide-react";
import { featuredCategories } from "@/lib/categories";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <button
        className="md:hidden flex flex-col items-center justify-center text-gray-800 hover:text-primary transition-colors p-1"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white z-10"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>

        <div className="p-4 pt-4 flex-1 pb-10">
          {/* User Profile Card */}
          <div className="bg-primary text-white p-4 rounded-xl flex items-center gap-3 mb-6 relative overflow-hidden">
            <div className="w-[46px] h-[46px] bg-white/20 rounded-full flex items-center justify-center shrink-0 border-[1.5px] border-white/30 overflow-hidden">
              <User size={36} className="text-white fill-white mt-2" />
            </div>
            <div className="flex flex-col relative z-10">
              <span className="font-semibold text-[17px] leading-tight text-white mb-0.5">Hello there!</span>
              <Link href="/signin" className="text-[14px] font-medium text-white/95" onClick={() => setIsOpen(false)}>
                Signin
              </Link>
            </div>
          </div>

          {/* Categories List — from shared source */}
          <div className="bg-[#F6F7F7] rounded-xl overflow-hidden mb-8">
            <ul className="flex flex-col">
              {featuredCategories.map((cat) => (
                <li key={cat.slug} className="border-b border-[#E8EAEB] last:border-0 mx-4">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex items-center justify-between py-3.5 transition-colors text-gray-700 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-[15px]">{cat.name}</span>
                    <ChevronRight size={18} strokeWidth={1.5} className="text-gray-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="mb-4">
            <div className="inline-block relative">
              <h3 className="text-lg font-bold text-gray-600">Quick Links</h3>
              <div className="absolute -bottom-1.5 left-0 w-8 h-px bg-primary"></div>
            </div>
          </div>

          <div className="bg-[#F6F7F7] rounded-xl overflow-hidden">
            <ul className="flex flex-col">
              <li className="mx-4">
                <Link href="/about" className="flex items-center gap-3.5 py-4 transition-colors text-gray-800" onClick={() => setIsOpen(false)}>
                  <Contact size={22} strokeWidth={1.5} className="text-[#1A2530]" />
                  <span className="text-[15px]">About Us</span>
                </Link>
              </li>
              <li className="mx-4">
                <Link href="/wishlists" className="flex items-center gap-3.5 py-4 transition-colors text-gray-800" onClick={() => setIsOpen(false)}>
                  <Heart size={22} strokeWidth={1.5} className="text-[#1A2530]" />
                  <span className="text-[15px]">Wishlists</span>
                </Link>
              </li>
              <li className="mx-4">
                <Link href="/faqs" className="flex items-center gap-3.5 py-4 transition-colors text-gray-800" onClick={() => setIsOpen(false)}>
                  <HelpCircle size={22} strokeWidth={1.5} className="text-[#1A2530]" />
                  <span className="text-[15px]">Faqs</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
