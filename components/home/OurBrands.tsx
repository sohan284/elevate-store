"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OurBrands() {
  const brands = [
    {
      id: 1,
      name: "Ghorer Bazar",
      render: (
        <div className="flex justify-center items-center gap-2">
          <div className="relative w-8 h-8 rounded-[8px_8px_0_8px] border-[2.5px] border-[#F8912E] p-1 flex items-end justify-center">
            <div className="w-1.5 h-3 bg-[#4B5563] rounded-full mx-0.5"></div>
            <div className="w-1.5 h-4 bg-[#4B5563] rounded-full mx-0.5"></div>
          </div>
          <div className="flex flex-col leading-none text-[#F8912E] font-bold text-lg">
            <span>GHORER</span>
            <span>BAZAR</span>
          </div>
        </div>
      )
    },
    {
      id: 2,
      name: "Glarvest",
      render: (
        <div className="bg-linear-to-r from-[#17853A] to-[#11692E] text-white px-5 py-2.5 rounded-[0px_20px_0px_20px] shadow-sm transform -skew-x-6 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-4 h-full bg-white/10 -skew-x-12 translate-x-1/2"></div>
          <span className="font-bold text-lg tracking-wider skew-x-6 block">GLARVEST</span>
        </div>
      )
    },
    {
      id: 3,
      name: "Khejuri",
      render: <span className="font-serif text-[32px] font-bold tracking-tight text-[#1C1F22]">Khejuri</span>
    },
    {
      id: 4,
      name: "Shosti",
      render: (
        <div className="font-black text-[32px] italic tracking-tighter text-[#1C1F22] flex items-center">
          SH<span className="relative">O<span className="absolute bottom-1 right-0 w-1.5 h-1.5 bg-[#F8912E] rounded-full"></span></span>STI
        </div>
      )
    },
    {
      id: 5,
      name: "Elevate",
      render: <span className="font-bold text-[28px] tracking-widest text-[#2D333A] uppercase">Elevate</span>
    },
    {
      id: 6,
      name: "PureLife",
      render: <span className="font-semibold text-[26px] text-green-700 font-sans tracking-tight">Pure<span className="text-[#333]">Life</span></span>
    },
  ];

  return (
    <section className="w-full py-10 lg:py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 relative border-b border-gray-200 pb-3">
          <div className="relative">
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#2D333A]">
              Our Brands
            </h2>
            <div className="absolute -bottom-[13.5px] left-0 w-16 h-[3px] bg-[#ED8833]"></div>
          </div>

          <Link href="/brands" className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary/80 transition-colors uppercase tracking-wide">
            SEE ALL
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Brands Slider */}
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
                  <div className="grayscale group-hover/brand:grayscale-0 transition-all duration-500 opacity-70 group-hover/brand:opacity-100 scale-[0.98] group-hover/brand:scale-105 flex items-center justify-center w-full h-full">
                    {brand.render}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Container */}
          <div className="brands-pagination absolute bottom-0 left-0 right-0 flex justify-center z-10"></div>
        </div>

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
