"use client";

import React from "react";
import { Star } from "lucide-react";

const ProductReviews = () => {
  const ratingDistribution = [
    { stars: 5, percentage: 0 },
    { stars: 4, percentage: 0 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <div className="flex flex-col w-[80vw] lg:max-w-[600px] xl:max-w-[1010px] lg:flex-row gap-12 py-6 px-2">
      {/* ── Left Column: Review Summary ─────────────────────────── */}
      <div className="flex-1 w-full">
        <div className="flex items-start gap-4 mb-8">
          <div className="text-[56px] font-bold text-[#1E2A3B] leading-none">0.0</div>
          <div className="flex flex-col gap-1 pt-1">
            <span className="text-[14px] font-bold text-[#2D333A]">Average Rating</span>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className="text-gray-300 fill-transparent" />
                ))}
              </div>
              <span className="text-[12px] text-gray-400">(0 Reviews)</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-[20px] font-bold text-[#1E2A3B]">0.00% <span className="text-[14px] font-medium text-gray-500 ml-1">Recommended <span className="text-gray-400 font-normal ml-1 text-[12px]">(1 of 3)</span></span></div>
        </div>

        {/* Rating Distribution Bars */}
        <div className="space-y-3">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <div className="flex w-24 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < item.stars ? "text-orange-500 fill-orange-500" : "text-gray-200 fill-gray-200"}
                  />
                ))}
              </div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-[12px] font-medium text-gray-500 min-w-[30px]">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Column: Submit Review Form ──────────────────── */}
      <div className="flex-[1.5]">
        <div className="relative mb-6">
          <h3 className="text-[20px] font-bold text-[#1E2A3B]">Submit Your Review</h3>
          <div className="w-12 h-1 bg-orange-500 mt-2 rounded-full" />
        </div>

        <p className="text-[13px] text-gray-500 mb-6 italic">
          Your email address will not be published. Required fields are marked *
        </p>

        <form className="space-y-6">
          {/* Review Textarea */}
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-gray-700">
              Write your opinion about the product
            </label>
            <textarea
              placeholder="Write Your Review Here..."
              className="w-full min-h-[160px] p-4 text-[14px] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-none"
            />
          </div>

          {/* Rating Selection */}
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-gray-700">
              Your Rating:
            </label>
            <div className="relative">
              <select className="w-full p-3 text-[14px] border border-gray-200 rounded-md bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all text-gray-500">
                <option value="">Select One</option>
                <option value="5">5 Stars - Excellent</option>
                <option value="4">4 Stars - Very Good</option>
                <option value="3">3 Stars - Good</option>
                <option value="2">2 Stars - Fair</option>
                <option value="1">1 Star - Poor</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              className="bg-[#333333] hover:bg-[#1E2A3B] text-white font-bold py-3.5 px-8 rounded-md transition-colors text-[13px] tracking-wider"
            >
              SUBMIT REVIEW
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;
