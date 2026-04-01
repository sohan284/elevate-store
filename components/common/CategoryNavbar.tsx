"use client";

import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { featuredCategories } from "@/lib/categories";

export default function CategoryNavbar() {
  // Categories with dropdown are those that have subcategories in our data
  const navCategories = featuredCategories.map((cat) => ({
    ...cat,
    hasDropdown: !["rice", "certified", "pickle"].includes(cat.slug),
  }));

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
          {navCategories.map((cat) => (
            <li key={cat.slug} className="shrink-0 relative group h-full flex items-center">
              <Link
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1 hover:text-white text-gray-200 transition-colors h-full py-2 cursor-pointer"
              >
                {cat.name}
                {cat.hasDropdown && (
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                )}
              </Link>

              {/* Dropdown Menu */}
              {cat.hasDropdown && (
                <div className="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 w-48 bg-white text-gray-800 shadow-xl rounded-b-md border-t-2 border-primary overflow-hidden transition-all duration-200 z-50 translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <Link href={`/category/${cat.slug}`} className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary transition-colors">
                      All {cat.name}
                    </Link>
                    <Link href={`/category/${cat.slug}?filter=best-selling`} className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary transition-colors">
                      Best Selling
                    </Link>
                    <Link href={`/category/${cat.slug}?filter=offers`} className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary transition-colors">
                      Special Offers
                    </Link>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
