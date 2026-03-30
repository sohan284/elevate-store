"use client";

import { useState } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div
        className="fixed top-1/2 right-0 -translate-y-1/2 z-60 cursor-pointer shadow-[-4px_0_15px_rgba(0,0,0,0.06)] rounded-[6px_0_0_6px] overflow-hidden flex flex-col items-center justify-center transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <div className="bg-primary text-white p-2.5 flex flex-col items-center justify-center w-[75px] h-[68px]">
          <ShoppingBag size={24} strokeWidth={1.5} className="mb-1" />
          <span className="text-[13px] font-semibold leading-none tracking-wide">0 Items</span>
        </div>
        <div className="bg-white text-primary w-full py-1 px-2 flex items-center justify-center font-bold text-[14.5px]">
          ৳0.00
        </div>
      </div>

      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-70 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[340px] md:w-[380px] bg-white z-80 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="font-bold text-[#2D333A] tracking-wider text-[15px]">SHOPPING CART</span>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1.5 text-gray-700 hover:text-primary transition-colors text-sm font-medium"
          >
            Close <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Empty State Body */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white pb-20">
          <div className="mb-5 w-40 h-40 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Backdrop Blob */}
              <path fill="#F0F6FE" d="M10,50 C10,15 90,15 90,50 C90,85 10,85 10,50 Z" opacity="0.9" transform="translate(0, 10)" />

              {/* Cart Body */}
              <path d="M22,35 L30,35 M30,35 L40,65 L76,65 L84,38 L42,38" fill="none" stroke="#1A73E8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Wheels */}
              <circle cx="48" cy="78" r="5" fill="#F0F6FE" stroke="#1A73E8" strokeWidth="4.5" />
              <circle cx="70" cy="78" r="5" fill="#F0F6FE" stroke="#1A73E8" strokeWidth="4.5" />

              {/* Circle X */}
              <circle cx="58" cy="30" r="11" fill="#F0F6FE" stroke="#1A73E8" strokeWidth="3" />
              <path d="M54,26 L62,34 M62,26 L54,34" stroke="#1A73E8" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[#3b4148] font-bold text-[17px] tracking-wide">No items in your cart!</p>
        </div>
      </div>
    </>
  );
}
