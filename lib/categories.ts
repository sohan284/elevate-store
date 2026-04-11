// Shared category slug helper — matches CategoryNavbar and MobileMenu logic
export function getcategorieslug(name: string): string {
  return name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
}

// Master list of featured categories shown on the homepage
export const featuredCategories = [
  { name: "Honey", icon: "🍯", slug: "honey" },
  { name: "Dates", icon: "🫘", slug: "dates" },
  { name: "Spices", icon: "🌶️", slug: "spices" },
  { name: "Nuts & Seeds", icon: "🥜", slug: "nuts-seeds" },
  { name: "Beverage", icon: "🍵", slug: "beverage" },
  { name: "Rice", icon: "🍚", slug: "rice" },
  { name: "Flours & Lentils", icon: "🌾", slug: "flours-lentils" },
  { name: "Oil & Ghee", icon: "🫙", slug: "oil-ghee" },
  { name: "Pickle", icon: "🥒", slug: "pickle" },
  { name: "Certified", icon: "✅", slug: "certified" },
];
