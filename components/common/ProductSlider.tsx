"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";

export interface Product {
  id: string | number;
  name: string;
  currentPrice: number;
  originalPrice?: number;
  image: string;
  tags?: {
    left?: string;
    right?: string;
  };
}

interface ProductSliderProps {
  title: string;
  viewAllLink?: string;
  products: Product[];
}

export default function ProductSlider({ title, viewAllLink = "#", products }: ProductSliderProps) {
  return (
    <section className="w-full py-8 lg:py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 relative border-b border-gray-200 pb-3">
          <div className="relative">
            <h2 className="text-[20px] md:text-[24px] font-bold text-[#2D333A]">
              {title}
            </h2>
            <div className="absolute -bottom-[13.5px] left-0 w-12 h-[3px] bg-primary"></div>
          </div>
          
          <Link href={viewAllLink} className="flex items-center gap-1.5 text-primary text-[13px] sm:text-sm font-semibold hover:text-primary/80 transition-colors uppercase tracking-wide">
            VIEW ALL ITEMS
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Products Slider */}
        <div className="relative group px-0 sm:px-1 pb-4">
          <Swiper
            spaceBetween={16}
            slidesPerView={1.3}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 16 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
              1280: { slidesPerView: 5, spaceBetween: 24 },
            }}
            className="w-full select-none pb-4" // padding bottom prevents shadow clipping
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <div className="h-full bg-white rounded-lg border border-gray-200/70 p-4 sm:p-5 hover:border-primary/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col relative group/card cursor-pointer">
                  
                  {/* Top Tags */}
                  <div className="flex justify-between items-start mb-2 w-full z-10 absolute top-4 left-0 right-0 px-4">
                    {product.tags?.left ? (
                      <span className="bg-primary text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-[3px] shadow-sm tracking-wide">
                        {product.tags.left}
                      </span>
                    ) : <div></div>}
                    
                    {product.tags?.right ? (
                       <span className="bg-[#10b981] text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-[3px] shadow-sm tracking-wide">
                         {product.tags.right}
                       </span>
                    ) : <div></div>}
                  </div>

                  {/* Product Image */}
                  <div className="w-full aspect-square mt-6 flex items-center justify-center mb-6 group-hover/card:scale-105 transition-transform duration-500">
                     <span className="text-7xl lg:text-8xl drop-shadow-lg">{product.image}</span>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col grow mt-auto justify-end">
                    <h3 className="text-[#3b4148] font-medium text-[15px] sm:text-[16px] mb-2 leading-tight line-clamp-2 h-[40px]">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-primary font-bold text-[17px] sm:text-[18px] leading-none">
                        ৳{product.currentPrice.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[#888888] line-through text-[14px] sm:text-[15px] font-medium leading-none">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 border-[1.5px] border-primary text-primary hover:bg-primary hover:text-white px-3 py-2.5 rounded-md text-[13px] sm:text-[14px] font-bold transition-all duration-300">
                      <ShoppingCart size={16} strokeWidth={2.5} />
                      Add To Cart
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
