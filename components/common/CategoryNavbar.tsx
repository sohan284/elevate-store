"use client";

import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";

export default function CategoryNavbar() {
  const categories = [
    { name: "Honey", hasDropdown: true },
    { name: "Dates", hasDropdown: true },
    { name: "Spices", hasDropdown: true },
    { name: "Nuts & Seeds", hasDropdown: true },
    { name: "Beverage", hasDropdown: true },
    { name: "Rice", hasDropdown: false },
    { name: "Flours & Lentils", hasDropdown: true },
    { name: "Certified", hasDropdown: false },
    { name: "Pickle", hasDropdown: false },
  ];

  return (
    <div className="w-full bg-[#031B16] text-gray-100 sticky top-0 z-40 hidden md:block border-t border-[#0F352C] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {categories.map((category) => (
            <li key={category.name} className="shrink-0 relative group h-full flex items-center">
              <Link
                href={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="flex items-center gap-1 hover:text-white text-gray-200 transition-colors h-full py-2 cursor-pointer"
              >
                {category.name}
                {category.hasDropdown && (
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                )}
              </Link>

              {/* Dropdown Menu */}
              {category.hasDropdown && (
                <div className="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 w-48 bg-white text-gray-800 shadow-xl rounded-b-md border-t-2 border-primary overflow-hidden transition-all duration-200 z-50 translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <Link href="#" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary transition-colors">
                      All {category.name}
                    </Link>
                    <Link href="#" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary transition-colors">
                      Premium Selection
                    </Link>
                    <Link href="#" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary transition-colors">
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
