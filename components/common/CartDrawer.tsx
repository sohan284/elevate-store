"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Button */}
      <div
        className="fixed top-1/2 right-0 -translate-y-1/2 z-60 cursor-pointer shadow-[-4px_0_15px_rgba(0,0,0,0.06)] rounded-[6px_0_0_6px] overflow-hidden flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95"
        onClick={() => setIsOpen(true)}
      >
        <div className="bg-primary text-white p-2.5 flex flex-col items-center justify-center w-[75px] h-[68px]">
          <ShoppingBag size={24} strokeWidth={1.5} className="mb-1" />
          <span className="text-[13px] font-semibold leading-none tracking-wide">{totalItems} Items</span>
        </div>
        <div className="bg-white text-primary w-full py-1 px-2 flex items-center justify-center font-bold text-[14.5px]">
          ৳{totalPrice.toLocaleString()}
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
          <div className="flex items-center gap-2">
            <ShoppingCartIcon size={20} className="text-primary" />
            <span className="font-bold text-[#2D333A] tracking-wider text-[15px]">SHOPPING CART</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1.5 text-gray-700 hover:text-primary transition-colors text-sm font-medium"
          >
            Close <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>

        {items.length > 0 ? (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100 group relative">
                  {/* Image Placeholder */}
                  <div className="w-20 h-20 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-3xl shrink-0">
                    {item.image.includes('http') ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                    ) : (
                      item.image
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                    <div>
                      <h4 className="text-[14px] font-bold text-[#2D333A] leading-tight line-clamp-2 pr-6">
                        {item.name}
                      </h4>
                      <p className="text-primary font-bold text-[14px] mt-1.5">৳{item.price.toLocaleString()}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-[13px] font-bold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer / Summary */}
            <div className="p-5 border-t border-gray-100 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 font-semibold text-[14px]">Subtotal</span>
                <span className="text-primary font-black text-[18px]">৳{totalPrice.toLocaleString()}</span>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-md text-[14px]"
                >
                  PROCEED TO CHECKOUT
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-white border border-gray-200 text-[#2D333A] font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all text-[14px]"
                >
                  CONTINUE SHOPPING
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-gray-400 text-[12px] font-medium hover:text-red-500 transition-colors pt-1"
                >
                  Clear all items
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State Body */
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white pb-20">
            <div className="mb-5 w-48 h-48 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path fill="#F0F6FE" d="M10,50 C10,15 90,15 90,50 C90,85 10,85 10,50 Z" opacity="0.9" transform="translate(0, 10)" />
                <path d="M22,35 L30,35 M30,35 L40,65 L76,65 L84,38 L42,38" fill="none" stroke="var(--color-primary)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="48" cy="78" r="5" fill="#F0F6FE" stroke="var(--color-primary)" strokeWidth="4.5" />
                <circle cx="70" cy="78" r="5" fill="#F0F6FE" stroke="var(--color-primary)" strokeWidth="4.5" />
                <circle cx="58" cy="30" r="11" fill="#F0F6FE" stroke="var(--color-primary)" strokeWidth="3" />
                <path d="M54,26 L62,34 M62,26 L54,34" stroke="var(--color-primary)" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[#3b4148] font-bold text-[18px] tracking-wide mb-2">Your cart is empty!</p>
            <p className="text-gray-400 text-[14px] mb-8">Looks like you haven't added anything yet.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all text-sm uppercase tracking-wider"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
