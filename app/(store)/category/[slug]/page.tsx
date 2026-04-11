"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { use } from "react";
import { ChevronRight, Minus, Plus, SlidersHorizontal, X, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";

// ─── Category Data Registry ───────────────────────────────────────────────────
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  badge?: "Best Selling";
  savePercent?: number;
  subcategory: string;
  brand: string;
};

type CategoryConfig = {
  title: string;
  subcategories: string[];
  brands: string[];
  products: Product[];
};

const categoryData: Record<string, CategoryConfig> = {
  "oil-ghee": {
    title: "Oil & Ghee",
    subcategories: ["Cooking Oil", "Coconut Oil", "Olive Oil", "Ghee", "Mustard Oil"],
    brands: ["Ceylon Naturals", "GhorerBazar", "Glarvest", "Oitalia", "Palermo", "Shosti food"],
    products: [
      { id: 1, name: "Gawa Ghee 500gm", price: 855, originalPrice: 900, image: "https://placehold.co/400x400/FFF8E7/E65100?text=Ghee", savePercent: 5, subcategory: "Ghee", brand: "GhorerBazar" },
      { id: 2, name: "Deshi Mustard Oil 2 liter", price: 585, originalPrice: 620, image: "https://placehold.co/400x400/FFFDE7/F57F17?text=Mustard+Oil", savePercent: 6, subcategory: "Mustard Oil", brand: "Shosti food" },
      { id: 3, name: "Gawa Ghee 1kg", price: 1710, originalPrice: 1800, image: "https://placehold.co/400x400/FFF8E7/E65100?text=Ghee+1kg", badge: "Best Selling", savePercent: 5, subcategory: "Ghee", brand: "GhorerBazar" },
      { id: 4, name: "Deshi Mustard Oil 5 liter", price: 1470, originalPrice: 1550, image: "https://placehold.co/400x400/FFFDE7/F57F17?text=Mustard+Oil+5L", badge: "Best Selling", savePercent: 5, subcategory: "Mustard Oil", brand: "Shosti food" },
      { id: 5, name: "Palermo Extra Virgin Olive Oil In Dark Marasca Glass Bottle 1 Ltr.", price: 2374, originalPrice: 2499, image: "https://placehold.co/400x400/F3F4F6/374151?text=Olive+Oil", savePercent: 5, subcategory: "Olive Oil", brand: "Palermo" },
      { id: 6, name: "Organic Extra Virgin Coconut Oil 1ltr", price: 1925, originalPrice: 2030, image: "https://placehold.co/400x400/E8F5E9/2E7D32?text=Coconut+Oil", savePercent: 5, subcategory: "Coconut Oil", brand: "Ceylon Naturals" },
      { id: 7, name: "Organic Extra Virgin Coconut Oil 500ml", price: 1165, originalPrice: 1230, image: "https://placehold.co/400x400/E8F5E9/2E7D32?text=Coconut+500", savePercent: 5, subcategory: "Coconut Oil", brand: "Ceylon Naturals" },
      { id: 8, name: "Palermo Organic Extra Virgin Olive oil 1ltr", price: 2999, originalPrice: null, image: "https://placehold.co/400x400/F3F4F6/374151?text=Olive+1L", subcategory: "Olive Oil", brand: "Palermo" },
    ],
  },
  "honey": {
    title: "Honey",
    subcategories: ["Pure Honey", "Raw Honey", "Manuka Honey", "Forest Honey", "Sidr Honey"],
    brands: ["GhorerBazar", "Natural Bee", "Sundarbans", "Royal Honey", "Beecraft"],
    products: [
      { id: 1, name: "Sundarban Forest Honey 500gm", price: 450, originalPrice: 500, image: "https://placehold.co/400x400/FFF3E0/E65100?text=Forest+Honey", badge: "Best Selling", savePercent: 10, subcategory: "Forest Honey", brand: "Sundarbans" },
      { id: 2, name: "Pure Raw Honey 1kg", price: 850, originalPrice: 950, image: "https://placehold.co/400x400/FFF8E7/F57F17?text=Raw+Honey", savePercent: 11, subcategory: "Raw Honey", brand: "Natural Bee" },
      { id: 3, name: "Manuka Honey 250gm", price: 1200, originalPrice: 1350, image: "https://placehold.co/400x400/FFFDE7/E65100?text=Manuka", savePercent: 11, subcategory: "Manuka Honey", brand: "Royal Honey" },
      { id: 4, name: "GhorerBazar Pure Honey 500gm", price: 380, originalPrice: 420, image: "https://placehold.co/400x400/FFF3E0/BF360C?text=Pure+Honey", badge: "Best Selling", savePercent: 10, subcategory: "Pure Honey", brand: "GhorerBazar" },
      { id: 5, name: "Sidr Honey Premium 300gm", price: 980, originalPrice: 1100, image: "https://placehold.co/400x400/FFECB3/E65100?text=Sidr+Honey", savePercent: 11, subcategory: "Sidr Honey", brand: "Beecraft" },
      { id: 6, name: "Forest Honey Wild Collection 1kg", price: 750, originalPrice: 840, image: "https://placehold.co/400x400/FFF8E7/BF360C?text=Wild+Honey", savePercent: 11, subcategory: "Forest Honey", brand: "Sundarbans" },
    ],
  },
  "dates": {
    title: "Dates",
    subcategories: ["Ajwa Dates", "Medjool Dates", "Kimia Dates", "Mabroom Dates", "Zahidi Dates"],
    brands: ["Saudi Premium", "Green Date", "GhorerBazar", "Al-Madinah", "Desert King"],
    products: [
      { id: 7, name: "Ajwa Dates 500gm", price: 750, originalPrice: 820, image: "https://placehold.co/400x400/3E2723/D7CCC8?text=Ajwa", badge: "Best Selling", savePercent: 9, subcategory: "Ajwa Dates", brand: "Saudi Premium" },
      { id: 8, name: "Medjool Dates 1kg", price: 1100, originalPrice: 1200, image: "https://placehold.co/400x400/4E342E/EFEBE9?text=Medjool", savePercent: 8, subcategory: "Medjool Dates", brand: "Al-Madinah" },
      { id: 9, name: "Kimia Dates 500gm Premium", price: 480, originalPrice: 530, image: "https://placehold.co/400x400/5D4037/D7CCC8?text=Kimia", savePercent: 9, subcategory: "Kimia Dates", brand: "Green Date" },
      { id: 10, name: "Mabroom Dates 250gm", price: 620, originalPrice: 680, image: "https://placehold.co/400x400/4E342E/BCAAA4?text=Mabroom", badge: "Best Selling", savePercent: 9, subcategory: "Mabroom Dates", brand: "Desert King" },
      { id: 11, name: "GhorerBazar Mixed Dates Box 1kg", price: 890, originalPrice: 980, image: "https://placehold.co/400x400/3E2723/BCAAA4?text=Mixed+Dates", savePercent: 9, subcategory: "Zahidi Dates", brand: "GhorerBazar" },
    ],
  },
  "spices": {
    title: "Spices",
    subcategories: ["Whole Spices", "Ground Spices", "Spice Blends", "Turmeric", "Chili"],
    brands: ["GhorerBazar", "Radhuni", "Shaan", "Ahmed Food", "BD Spice"],
    products: [
      { id: 12, name: "Pure Turmeric Powder 500gm", price: 180, originalPrice: 200, image: "https://placehold.co/400x400/FFF9C4/F9A825?text=Turmeric", badge: "Best Selling", savePercent: 10, subcategory: "Turmeric", brand: "GhorerBazar" },
      { id: 13, name: "Gura Masala Combo (Mini Pack)", price: 935, originalPrice: 985, image: "https://placehold.co/400x400/FBE9E7/BF360C?text=Masala", savePercent: 5, subcategory: "Spice Blends", brand: "Shaan" },
      { id: 14, name: "Red Chili Powder 200gm", price: 95, originalPrice: 110, image: "https://placehold.co/400x400/FFEBEE/C62828?text=Chili", savePercent: 14, subcategory: "Chili", brand: "Radhuni" },
      { id: 15, name: "Whole Black Pepper 100gm", price: 160, originalPrice: 180, image: "https://placehold.co/400x400/ECEFF1/455A64?text=Pepper", savePercent: 11, subcategory: "Whole Spices", brand: "BD Spice" },
      { id: 16, name: "Coriander Powder 300gm", price: 120, originalPrice: 140, image: "https://placehold.co/400x400/F1F8E9/558B2F?text=Coriander", savePercent: 14, subcategory: "Ground Spices", brand: "Ahmed Food" },
      { id: 17, name: "Cumin Seeds Premium 200gm", price: 145, originalPrice: 160, image: "https://placehold.co/400x400/FFF8E7/795548?text=Cumin", badge: "Best Selling", savePercent: 9, subcategory: "Whole Spices", brand: "GhorerBazar" },
    ],
  },
  "nuts-seeds": {
    title: "Nuts & Seeds",
    subcategories: ["Almonds", "Cashews", "Walnuts", "Chia Seeds", "Flax Seeds", "Pistachios"],
    brands: ["NutriBox", "GhorerBazar", "Organic Valley", "Healthy Roots", "NatureFarm"],
    products: [
      { id: 18, name: "Premium Almonds 500gm", price: 680, originalPrice: 750, image: "https://placehold.co/400x400/FFF8E7/795548?text=Almonds", badge: "Best Selling", savePercent: 9, subcategory: "Almonds", brand: "NutriBox" },
      { id: 19, name: "Cashews W320 500gm", price: 590, originalPrice: 650, image: "https://placehold.co/400x400/FFFDE7/F57F17?text=Cashews", savePercent: 9, subcategory: "Cashews", brand: "GhorerBazar" },
      { id: 20, name: "Chia Seeds Organic 250gm", price: 320, originalPrice: 360, image: "https://placehold.co/400x400/ECEFF1/455A64?text=Chia", savePercent: 11, subcategory: "Chia Seeds", brand: "Organic Valley" },
      { id: 21, name: "Walnut Halves Premium 400gm", price: 720, originalPrice: 800, image: "https://placehold.co/400x400/FBE9E7/5D4037?text=Walnuts", savePercent: 10, subcategory: "Walnuts", brand: "NatureFarm" },
      { id: 22, name: "Flax Seeds Golden 500gm", price: 195, originalPrice: 220, image: "https://placehold.co/400x400/F3E5F5/6A1B9A?text=Flax", savePercent: 11, subcategory: "Flax Seeds", brand: "Healthy Roots" },
      { id: 23, name: "Pistachios Roasted 250gm", price: 450, originalPrice: 500, image: "https://placehold.co/400x400/E8F5E9/2E7D32?text=Pistachio", badge: "Best Selling", savePercent: 10, subcategory: "Pistachios", brand: "NutriBox" },
    ],
  },
  "beverage": {
    title: "Beverage",
    subcategories: ["Green Tea", "Black Tea", "Herbal Tea", "Fruit Juice", "Health Drink"],
    brands: ["GhorerBazar", "Tetley", "Lipton", "Ispahani", "Fresh"],
    products: [
      { id: 24, name: "Premium Green Tea 100 Tea Bags", price: 350, originalPrice: 400, image: "https://placehold.co/400x400/E8F5E9/2E7D32?text=Green+Tea", badge: "Best Selling", savePercent: 13, subcategory: "Green Tea", brand: "Tetley" },
      { id: 25, name: "Ispahani Mirzapore Best Leaf Tea 200gm", price: 180, originalPrice: 200, image: "https://placehold.co/400x400/FBE9E7/BF360C?text=Black+Tea", savePercent: 10, subcategory: "Black Tea", brand: "Ispahani" },
      { id: 26, name: "Chamomile Herbal Tea 30 Bags", price: 280, originalPrice: 320, image: "https://placehold.co/400x400/FFFDE7/F9A825?text=Herbal", savePercent: 13, subcategory: "Herbal Tea", brand: "GhorerBazar" },
      { id: 27, name: "Fresh Orange Juice 1 Ltr", price: 120, originalPrice: 140, image: "https://placehold.co/400x400/FFF3E0/E65100?text=OJ", savePercent: 14, subcategory: "Fruit Juice", brand: "Fresh" },
    ],
  },
  "rice": {
    title: "Rice",
    subcategories: ["Basmati Rice", "Miniket Rice", "Kataribhog Rice", "Aromatic Rice", "Parboiled Rice"],
    brands: ["GhorerBazar", "Teer", "ACI", "Priyori", "Chashi"],
    products: [
      { id: 28, name: "Premium Basmati Rice 5kg", price: 850, originalPrice: 920, image: "https://placehold.co/400x400/F5F5F5/616161?text=Basmati", badge: "Best Selling", savePercent: 8, subcategory: "Basmati Rice", brand: "ACI" },
      { id: 29, name: "Miniket Polished Rice 10kg", price: 680, originalPrice: 740, image: "https://placehold.co/400x400/FAFAFA/9E9E9E?text=Miniket", savePercent: 8, subcategory: "Miniket Rice", brand: "Teer" },
      { id: 30, name: "Kataribhog Aromatic Rice 5kg", price: 780, originalPrice: 860, image: "https://placehold.co/400x400/FFF8E7/795548?text=Kataribhog", badge: "Best Selling", savePercent: 9, subcategory: "Kataribhog Rice", brand: "GhorerBazar" },
      { id: 31, name: "Parboiled Rice 25kg Sack", price: 1850, originalPrice: 2000, image: "https://placehold.co/400x400/F3F4F6/374151?text=Parboiled", savePercent: 8, subcategory: "Parboiled Rice", brand: "Chashi" },
    ],
  },
  "flours-lentils": {
    title: "Flours & Lentils",
    subcategories: ["Wheat Flour", "Chickpea Flour", "Masur Dal", "Mung Dal", "Chana Dal"],
    brands: ["GhorerBazar", "ACI", "Teer", "Pran", "RFL"],
    products: [
      { id: 32, name: "Wheat Flour Atta 5kg", price: 280, originalPrice: 310, image: "https://placehold.co/400x400/FAFAFA/9E9E9E?text=Atta", badge: "Best Selling", savePercent: 10, subcategory: "Wheat Flour", brand: "ACI" },
      { id: 33, name: "Chickpea Flour Besan 1kg", price: 120, originalPrice: 135, image: "https://placehold.co/400x400/FFF9C4/F9A825?text=Besan", savePercent: 11, subcategory: "Chickpea Flour", brand: "GhorerBazar" },
      { id: 34, name: "Red Lentils Masur Dal 2kg", price: 240, originalPrice: 270, image: "https://placehold.co/400x400/FBE9E7/D84315?text=Masur", savePercent: 11, subcategory: "Masur Dal", brand: "Teer" },
      { id: 35, name: "Mung Dal Split 1kg Premium", price: 165, originalPrice: 185, image: "https://placehold.co/400x400/F1F8E9/558B2F?text=Mung", savePercent: 11, subcategory: "Mung Dal", brand: "Pran" },
      { id: 36, name: "Chana Dal 2kg", price: 210, originalPrice: 240, image: "https://placehold.co/400x400/FFFDE7/F57F17?text=Chana", badge: "Best Selling", savePercent: 13, subcategory: "Chana Dal", brand: "RFL" },
    ],
  },
  "certified": {
    title: "Certified Products",
    subcategories: ["Organic Certified", "BSTI Certified", "Halal Certified", "ISO Certified"],
    brands: ["GhorerBazar", "Organic Valley", "Ceylon Naturals", "Glarvest"],
    products: [
      { id: 37, name: "Organic Coconut Oil Certified 500ml", price: 890, originalPrice: 980, image: "https://placehold.co/400x400/E8F5E9/2E7D32?text=Organic+Oil", badge: "Best Selling", savePercent: 9, subcategory: "Organic Certified", brand: "Ceylon Naturals" },
      { id: 38, name: "BSTI Certified Mustard Oil 2L", price: 480, originalPrice: 530, image: "https://placehold.co/400x400/FFFDE7/F57F17?text=BSTI+Oil", savePercent: 9, subcategory: "BSTI Certified", brand: "GhorerBazar" },
      { id: 39, name: "Halal Certified Honey 1kg", price: 750, originalPrice: 820, image: "https://placehold.co/400x400/FFF3E0/E65100?text=Halal+Honey", savePercent: 9, subcategory: "Halal Certified", brand: "Organic Valley" },
    ],
  },
  "pickle": {
    title: "Pickle",
    subcategories: ["Mango Pickle", "Mixed Pickle", "Lemon Pickle", "Chili Pickle", "Olive Pickle"],
    brands: ["GhorerBazar", "Pran", "Ahmed Food", "Golden Harvest", "Sundarbans"],
    products: [
      { id: 40, name: "Mango Pickle Spicy 400gm", price: 145, originalPrice: 165, image: "https://placehold.co/400x400/FFF9C4/F57F17?text=Mango+Pickle", badge: "Best Selling", savePercent: 12, subcategory: "Mango Pickle", brand: "Pran" },
      { id: 41, name: "Mixed Pickle Premium 500gm", price: 175, originalPrice: 200, image: "https://placehold.co/400x400/FBE9E7/BF360C?text=Mixed+Pickle", savePercent: 13, subcategory: "Mixed Pickle", brand: "Ahmed Food" },
      { id: 42, name: "Lemon Pickle Sour 250gm", price: 95, originalPrice: 110, image: "https://placehold.co/400x400/FFFDE7/F9A825?text=Lemon+Pickle", savePercent: 14, subcategory: "Lemon Pickle", brand: "GhorerBazar" },
      { id: 43, name: "Chili Pickle Extra Hot 300gm", price: 120, originalPrice: 140, image: "https://placehold.co/400x400/FFEBEE/C62828?text=Chili+Pickle", savePercent: 14, subcategory: "Chili Pickle", brand: "Golden Harvest" },
      { id: 44, name: "Olive Pickle Mediterranean 350gm", price: 280, originalPrice: 320, image: "https://placehold.co/400x400/F1F8E9/558B2F?text=Olive+Pickle", badge: "Best Selling", savePercent: 13, subcategory: "Olive Pickle", brand: "Sundarbans" },
    ],
  },
};

const SORT_OPTIONS = [
  { value: "default", label: "Default Sorting" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

const VIEW_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "3-col", label: "3 Column" },
];

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const addItem = useCartStore((state) => state.addItem);

  const category: CategoryConfig = categoryData[slug] ?? {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    subcategories: [],
    brands: [],
    products: [],
  };

  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [bestSellingOnly, setBestSellingOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMin, setAppliedMin] = useState<number | null>(null);
  const [appliedMax, setAppliedMax] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("default");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleSub = (s: string) =>
    setSelectedSubs((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);

  const applyPrice = () => {
    setAppliedMin(minPrice ? Number(minPrice) : null);
    setAppliedMax(maxPrice ? Number(maxPrice) : null);
  };

  const filteredProducts = useMemo(() => {
    let list = [...category.products];
    if (selectedSubs.length) list = list.filter((p) => selectedSubs.includes(p.subcategory));
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    if (bestSellingOnly) list = list.filter((p) => p.badge === "Best Selling");
    if (appliedMin !== null) list = list.filter((p) => p.price >= appliedMin);
    if (appliedMax !== null) list = list.filter((p) => p.price <= appliedMax);
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category.products, selectedSubs, selectedBrands, bestSellingOnly, appliedMin, appliedMax, sortBy]);

  const colClass = viewMode === "3-col"
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3";

  // ─── Collapsible filter panel ─────────────────────────────────────────────
  const FilterPanel = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {
    const [open, setOpen] = useState(true);
    return (
      <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-5 py-4 cursor-pointer select-none"
          onClick={() => setOpen((o) => !o)}
        >
          <h3 className="font-bold text-[14px] text-[#2D333A]">{title}</h3>
          {open
            ? <Minus size={14} className="text-gray-400 shrink-0 transition-transform duration-300" />
            : <Plus size={14} className="text-primary shrink-0 transition-transform duration-300" />}
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-5 pb-5">{children}</div>
        </div>
      </div>
    );
  };

  // ─── Filter sidebar content ───────────────────────────────────────────────
  const FilterSections = (
    <div className="space-y-3">
      <FilterPanel title="Filter By Category">
        <div className="space-y-2.5">
          {category.subcategories.map((sub) => (
            <label key={sub} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={selectedSubs.includes(sub)} onChange={() => toggleSub(sub)} className="w-[15px] h-[15px] accent-primary cursor-pointer" />
              <span className="text-[13.5px] text-gray-600 group-hover:text-primary transition-colors">{sub}</span>
            </label>
          ))}
        </div>
      </FilterPanel>

      <FilterPanel title="Price">
        <div className="flex items-center gap-2">
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="min" className="w-full border border-gray-200 rounded-[6px] px-2.5 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" />
          <span className="text-gray-400 text-[12px] shrink-0">—</span>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="max" className="w-full border border-gray-200 rounded-[6px] px-2.5 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" />
          <button onClick={applyPrice} className="shrink-0 bg-primary text-white px-3 py-2 rounded-[6px] text-[13px] font-bold hover:bg-primary/90 transition-colors">Go</button>
        </div>
        {(appliedMin !== null || appliedMax !== null) && (
          <button onClick={() => { setAppliedMin(null); setAppliedMax(null); setMinPrice(""); setMaxPrice(""); }} className="text-[12px] text-primary mt-2 hover:underline block">Clear price filter</button>
        )}
      </FilterPanel>

      <FilterPanel title="Brands">
        <div className="space-y-2.5">
          {category.brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="w-[15px] h-[15px] accent-primary cursor-pointer" />
              <span className="text-[13.5px] text-gray-600 group-hover:text-primary transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </FilterPanel>

      <FilterPanel title="Product Flag">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input type="checkbox" checked={bestSellingOnly} onChange={() => setBestSellingOnly((b) => !b)} className="w-[15px] h-[15px] accent-primary cursor-pointer" />
          <span className="text-[13.5px] text-gray-600 group-hover:text-primary transition-colors">Best Selling</span>
        </label>
      </FilterPanel>
    </div>
  );

  const activeFilterCount = selectedSubs.length + selectedBrands.length + (bestSellingOnly ? 1 : 0) + (appliedMin !== null || appliedMax !== null ? 1 : 0);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">

        <nav className="hidden sm:flex items-center gap-1.5 text-[12.5px] text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={13} />
          <span className="text-gray-700 font-semibold">{category.title}</span>
        </nav>
        <h1 className="text-[22px] md:text-[26px] font-bold text-[#2D333A] tracking-tight">{category.title}</h1>
      </div>

      {/* ── Sort & Filter Bar ────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white rounded-[10px] border border-gray-100 shadow-sm px-4 py-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[13px] font-semibold text-gray-500">Sort By :</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-200 rounded-[6px] px-3 py-1.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary bg-white cursor-pointer">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Mobile filter toggle */}
          <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden flex items-center gap-1.5 border border-gray-200 rounded-[6px] px-3 py-1.5 text-[13px] text-gray-600 hover:border-primary hover:text-primary transition-colors relative">
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <button onClick={() => { setSelectedSubs([]); setSelectedBrands([]); setBestSellingOnly(false); setAppliedMin(null); setAppliedMax(null); setMinPrice(""); setMaxPrice(""); }} className="hidden lg:flex items-center gap-1 text-[12px] text-red-800 hover:text-red-700 font-medium transition-colors">
              <X size={12} /> Clear all ({activeFilterCount})
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[12px] text-gray-400 hidden sm:block">{filteredProducts.length} products</span>
          <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className="border border-gray-200 rounded-[6px] px-3 py-1.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary bg-white cursor-pointer">
            {VIEW_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* ── Main Layout ──────────────────────────────────────────── */}
      <div className="flex gap-5">

        {/* Sidebar – desktop */}
        <aside className="hidden lg:block w-[200px] shrink-0">{FilterSections}</aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileFilterOpen(false)} />
            <div className="fixed top-0 left-0 h-full w-[280px] bg-primary/5 z-60 overflow-y-auto p-4 lg:hidden shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-[15px] text-[#2D333A]">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-primary shadow-sm">
                  <X size={16} />
                </button>
              </div>
              {FilterSections}
            </div>
          </>
        )}

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm flex flex-col items-center justify-center py-24 text-center w-full lg:w-[72vw] xl:w-[80vw] xl:max-w-[1000px]">
              <div className="text-6xl mb-5">🔍</div>
              <p className="text-[17px] font-semibold text-gray-600 mb-1">No products found</p>
              <p className="text-[13px] text-gray-400">Try adjusting or clearing your filters</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${colClass}`}>
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="bg-white rounded-[12px] border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-square bg-[#FAFAFA] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-5 transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.badge === "Best Selling" && (
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">Best Selling</span>
                      )}
                    </div>
                    {product.savePercent && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                        Save {product.savePercent}%
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3.5 flex flex-col flex-1">
                    <p className="text-[13.5px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-2.5 group-hover:text-primary transition-colors flex-1">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className="text-[15px] font-bold text-primary">৳{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-[12px] text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        });
                      }}
                      className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 rounded-[7px] transition-all text-[13px]"
                    >
                      <ShoppingCart size={14} strokeWidth={2} />
                      Add To Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
