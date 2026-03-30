"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroBanner() {
  const slides = [
    {
      id: 1,
      title: "Ramadan Offer 5% Discount",
      bgClass: "bg-gradient-to-r from-[#D68227] to-[#EC9B3B]",
    },
    {
      id: 2,
      title: "Premium Quality Honey",
      bgClass: "bg-gradient-to-r from-[#1E432B] to-[#2B603D]",
    },
    {
      id: 3,
      title: "Fresh & Organic Spices",
      bgClass: "bg-gradient-to-r from-[#8C5A35] to-[#AD7348]",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-6 mb-12">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">

        {/* Left Slider (Approx 68-70%) */}
        <div className="w-full lg:w-[32%] rounded-[14px] overflow-hidden shadow-xs relative aspect-[2/1] lg:aspect-auto lg:h-[380px] xl:h-[410px] bg-gradient-to-b from-primary/20 to-primary/10 group border border-[#E9E4DE]">
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative z-10">
            <div className="mb-2 max-w-[200px] mx-auto">
              <h3 className="text-[17px] md:text-lg font-bold text-[#3E342B] leading-tight">
                শুরু হোক আপনার হেলদি জার্নি
              </h3>
              <h4 className="text-xl md:text-2xl font-black text-[#603828] mt-1 mb-4">
                সাথে আছে ক্রিস্টাল হানি
              </h4>
            </div>

            {/* Mock Product Visual */}
            <div className="w-32 md:w-36 lg:w-44 h-32 md:h-36 lg:h-44 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white/50 mb-6 relative group-hover:scale-105 transition-transform duration-500">
              <div className="text-6xl md:text-7xl drop-shadow-md">🍯</div>
            </div>

            <div className="bg-[#462319] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer">
              অর্ডার করতে<br />
              <span className="text-[15px]">09642922922</span>
            </div>
          </div>
        </div>

        {/* Right Static Banner (Approx 32-30%) */}

        <div className="w-full lg:w-[68%] rounded-[14px] overflow-hidden relative shadow-xs group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full aspect-[2/1] md:aspect-[2.3/1] lg:h-[380px] xl:h-[410px]"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                {/* Visual Placeholder mimicking the image provided */}
                <div className={`w-full h-full ${slide.bgClass} flex items-center justify-center p-8 lg:p-12 relative overflow-hidden`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-10 left-[20%] text-white/50 text-2xl">✧</div>
                  <div className="absolute top-24 right-[30%] text-white/50 text-xl">✧</div>
                  <div className="absolute bottom-16 left-[40%] text-white/40 text-3xl">✧</div>
                  <div className="absolute top-[40%] right-[10%] text-white/40 text-2xl">✧</div>

                  {/* Placeholder Content */}
                  <div className="z-10 text-center px-4 bg-black/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-wide drop-shadow-md">
                      {slide.title}
                    </h2>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition-colors shadow-lg">
                      Explore Products
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className="swiper-button-prev-custom absolute top-1/2 left-0 -translate-y-1/2 w-8 md:w-10 h-12 md:h-16 bg-white/95 flex items-center justify-center z-10 cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-5 h-5 md:w-6 md:h-6"><path d="m15 18-6-6 6-6" /></svg>
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 right-0 -translate-y-1/2 w-8 md:w-10 h-12 md:h-16 bg-white/95 flex items-center justify-center z-10 cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-5 h-5 md:w-6 md:h-6"><path d="m9 18 6-6-6-6" /></svg>
          </div>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom absolute bottom-4 left-6 z-10 flex gap-1.5 items-center justify-start"></div>
        </div>
      </div>
    </div>
  );
}
