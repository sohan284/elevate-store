"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { featuredCategories } from "@/lib/categories";

export default function FeaturedCategories() {
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[26px] md:text-[32px] font-semibold text-center text-[#2D333A] mb-8 md:mb-10">
          Featured Categories
        </h2>

        <div className="relative group px-1 sm:px-4 md:px-14">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={3}
            breakpoints={{
              480: { slidesPerView: 4, spaceBetween: 16 },
              640: { slidesPerView: 5, spaceBetween: 20 },
              768: { slidesPerView: 6, spaceBetween: 20 },
              1024: { slidesPerView: 7, spaceBetween: 24 },
              1280: { slidesPerView: 8, spaceBetween: 24 },
            }}
            navigation={{
              nextEl: ".fc-button-next",
              prevEl: ".fc-button-prev",
            }}
            className="w-full px-1 py-2"
          >
            {featuredCategories.map((cat) => (
              <SwiperSlide key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex flex-col items-center group/item h-full"
                >
                  <div className="w-full aspect-square bg-white rounded-[20px] sm:rounded-[24px] flex items-center justify-center p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 border border-transparent hover:border-primary/30">
                    <span className="text-5xl md:text-6xl drop-shadow-sm group-hover/item:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </span>
                  </div>
                  <span className="mt-4 text-[14px] md:text-[15px] font-medium text-[#4B5563] group-hover/item:text-primary transition-colors text-center leading-tight">
                    {cat.name}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="absolute top-0 bottom-[40px] left-0 right-0 pointer-events-none hidden sm:flex items-center justify-between z-10">
            <button className="fc-button-prev pointer-events-auto w-10 h-10 bg-primary hover:bg-primary/80 disabled:bg-primary/50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shadow-sm -ml-2 lg:ml-0 cursor-pointer">
              <ChevronLeft size={22} strokeWidth={2.5} className="mr-0.5" />
            </button>
            <button className="fc-button-next pointer-events-auto w-10 h-10 bg-primary hover:bg-primary/80 disabled:bg-primary/50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shadow-sm -mr-2 lg:mr-0 cursor-pointer">
              <ChevronRight size={22} strokeWidth={2.5} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
