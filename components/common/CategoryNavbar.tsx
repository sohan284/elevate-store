"use client";

import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { useAdminStore } from "@/lib/store/admin-store";
import { cn } from "@/lib/utils";

export default function CategoryNavbar() {
  const { categories } = useAdminStore();

  return (
    <div className="w-full bg-[#031B16] text-gray-100 sticky top-0 z-40 hidden md:block border-t border-[#0F352C] shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-between h-[52px] text-[13.5px] lg:text-sm font-medium">
          {/* Flash Sale Button */}
          <li className="shrink-0 h-full flex items-center pr-2 lg:pr-4">
            <Link
              href="/flash-sale"
              className="flex items-center gap-1.5 bg-white text-secondary px-3 py-1.5 rounded-[4px] font-bold uppercase tracking-wider text-xs hover:bg-gray-50 transition-colors"
            >
              <Sparkles size={14} className="fill-secondary text-secondary" strokeWidth={2} />
              FLASH SALE
            </Link>
          </li>

          {/* Categories */}
          {categories.map((cat, index) => {
            const isLastItems = index >= categories.length - 1;
            return (
              <li key={cat.id} className="shrink-0 relative group h-full flex items-center">
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1 hover:text-white text-gray-200 transition-colors h-full py-2 cursor-pointer"
                >
                  {cat.name}
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </Link>

                {/* Dynamic Dropdown Menu */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className={cn(
                    "absolute top-full invisible opacity-0 group-hover:visible group-hover:opacity-100 w-44 bg-white text-gray-800 shadow-2xl rounded-b-xl border-t-4 border-primary overflow-hidden transition-all duration-300 z-50 translate-y-4 group-hover:translate-y-0",
                    isLastItems ? "right-0" : "left-0"
                  )}>
                    <div className="py-2.5">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${cat.slug}?sub=${sub.slug}`}
                          className="block px-3 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-primary/5 hover:text-primary transition-all border-l-4 border-transparent hover:border-primary"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
