"use client";

import { ShoppingCart, Tag, Flame } from "lucide-react";

export default function TopSelling() {
  const products = [
    {
      id: 1,
      name: "Sundarban Honey 1kg",
      currentPrice: 2200,
      originalPrice: 2500,
      saveText: "Save ৳300",
      image: "🍯",
      tag: "Offered Items",
      tagIcon: "tag",
    },
    {
      id: 2,
      name: "Gawa Ghee 1kg",
      currentPrice: 1710,
      originalPrice: 1800,
      saveText: "Save ৳90",
      image: "🥫",
      tag: "Best Selling",
      tagIcon: "flame",
    },
    {
      id: 3,
      name: "Deshi Mustard Oil 5 liter",
      currentPrice: 1470,
      originalPrice: 1550,
      saveText: "Save ৳80",
      image: "🛢️",
      tag: "Best Selling",
      tagIcon: "flame",
    },
    {
      id: 4,
      name: "Lachcha Semai 1kg",
      currentPrice: 1400,
      originalPrice: 1500,
      saveText: "Save ৳100",
      image: "🍝",
      tag: "Best Selling",
      tagIcon: "flame",
    },
  ];

  return (
    <section className="w-full py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[26px] md:text-[32px] font-semibold text-center text-[#2D333A] mb-8 md:mb-10">
          Top Selling Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-5 sm:p-7 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-row items-center relative overflow-hidden group border border-transparent hover:border-primary/30">

              {/* Top Right Tag */}
              <div className="absolute top-0 right-0 bg-[#FF4F33] text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-bl-lg flex items-center gap-1.5 z-10 shadow-sm">
                {product.tagIcon === 'tag' ? (
                  <Tag size={12} fill="currentColor" />
                ) : (
                  <Flame size={12} fill="currentColor" />
                )}
                {product.tag}
              </div>

              {/* Product Image Placeholder (approx 40%) */}
              <div className="w-[110px] sm:w-[160px] lg:w-[180px] shrink-0 flex items-center justify-center mr-4 sm:mr-6 group-hover:scale-105 transition-transform duration-500 relative">
                <span className="text-7xl sm:text-8xl lg:text-9xl drop-shadow-xl">{product.image}</span>
              </div>

              {/* Product Details (approx 60%) */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-[#3b4148] font-bold text-base sm:text-lg mb-1 lg:mb-2 leading-tight">
                  {product.name}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mb-2 lg:mb-3">
                  <span className="text-primary font-bold text-lg sm:text-[22px] leading-none">
                    ৳{product.currentPrice.toLocaleString()}
                  </span>
                  <span className="text-[#888888] line-through text-[15px] sm:text-base font-medium leading-none">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="mb-5 lg:mb-6">
                  <span className="inline-block bg-[#AEE12C] text-[#3c5000] text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-[4px]">
                    {product.saveText}
                  </span>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full max-w-[320px]">
                  <button className="flex-1 flex items-center justify-center gap-1.5 border-[1.5px] border-primary text-primary hover:bg-primary/10 px-3 py-2 rounded-md text-[13px] sm:text-[14px] font-bold transition-colors">
                    <ShoppingCart size={16} strokeWidth={2.5} />
                    Add To Cart
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white hover:bg-primary/90 px-3 py-2 rounded-md text-[13px] sm:text-[14px] font-bold transition-colors shadow-sm">
                    <ShoppingCart size={16} strokeWidth={2} fill="currentColor" />
                    Buy now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
