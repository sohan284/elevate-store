"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useAdminStore } from "@/lib/store/admin-store";

export default function OurBrands() {
  const { brands } = useAdminStore();

  return (
    <section className="w-full py-10 lg:py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 relative border-b border-gray-200 pb-3">
          <div className="relative">
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#2D333A]">
              Our Brands
            </h2>
            <div className="absolute -bottom-[13.5px] left-0 w-16 h-[3px] bg-primary"></div>
          </div>

          <Link href="/brands" className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary/80 transition-colors uppercase tracking-wide">
            SEE ALL
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {brands.length > 0 ? (
          /* Brands Slider */
          <div className="relative group px-1 pb-12">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 28 },
              }}
              pagination={{
                clickable: true,
                el: '.brands-pagination',
              }}
              className="w-full px-1! py-2!"
            >
              {brands.map((brand) => (
                <SwiperSlide key={brand.id}>
                  <div className="h-[90px] md:h-[110px] bg-white rounded-lg border border-gray-100/80 flex items-center justify-center p-4 cursor-pointer hover:border-primary/30 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-500 group/brand relative">
                    <div className="grayscale group-hover/brand:grayscale-0 transition-all duration-500 opacity-70 group-hover/brand:opacity-100 scale-[0.98] group-hover/brand:scale-105 flex items-center justify-center w-full h-full gap-2">
                      <span className="text-2xl md:text-3xl drop-shadow-sm">{brand.logo || "🏭"}</span>
                      <span className="text-[14px] md:text-[16px] font-bold text-[#4B5563] group-hover/brand:text-primary transition-colors">{brand.name}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination Container */}
            <div className="brands-pagination absolute bottom-0 left-0 right-0 flex justify-center z-10 gap-2"></div>
          </div>
        ) : (
          /* Empty State for Brands */
          <div className="flex flex-col items-center justify-center py-16 px-8 bg-[#FBFBFC] rounded-[32px] border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-300 mb-5 shadow-sm">
              <ShoppingBag size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-[18px] font-black text-gray-900 mb-2 uppercase tracking-wide">Brand Partnerships <span className="text-primary">Incoming</span></h3>
            <p className="text-[13px] font-bold text-gray-400 text-center max-w-sm">
              We&apos;re currently onboarding premium partners. Stay tuned for an exclusive selection of global brands.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .brands-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: transparent;
          border: 1.5px solid #ED8833;
          opacity: 1;
          margin: 0 4px !important;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
        }
        .brands-pagination .swiper-pagination-bullet-active {
          background: #ED8833;
        }
      `}</style>
    </section>
  );
}
