import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TopSelling from "@/components/home/TopSelling";
import OurBrands from "@/components/home/OurBrands";
import ProductSlider, { Product } from "@/components/common/ProductSlider";

// Mock data based on the requested images
const honeyProducts: Product[] = [
  { id: 'h1', name: "Black Seed Honey 1kg", currentPrice: 1440, originalPrice: 1600, image: "🍯", tags: { left: "Offered items", right: "Save 10%" } },
  { id: 'h2', name: "Crystal Honey 1kg", currentPrice: 1000, originalPrice: 1100, image: "🏺", tags: { right: "Save 9%" } },
  { id: 'h3', name: "Lichu Flower Honey 1kg", currentPrice: 1140, originalPrice: 1200, image: "🍯", tags: { right: "Save 5%" } },
  { id: 'h4', name: "African Organic Wild Honey 1kg", currentPrice: 2375, originalPrice: 2500, image: "🏺", tags: { right: "Save 5%" } },
  { id: 'h5', name: "Sundarban Honey 1kg", currentPrice: 2200, originalPrice: 2500, image: "🍯", tags: { left: "Offered items", right: "Save 12%" } },
];

const datesProducts: Product[] = [
  { id: 'd1', name: "Premium Ajwa Dates 500g", currentPrice: 1250, originalPrice: 1500, image: "🫘", tags: { left: "Best Selling", right: "Save 15%" } },
  { id: 'd2', name: "Mariam Dates 1kg", currentPrice: 850, originalPrice: 950, image: "🫘", tags: { right: "Save 10%" } },
  { id: 'd3', name: "Medjool Dates Large 500g", currentPrice: 1100, originalPrice: 1200, image: "🫘", tags: { right: "Save 8%" } },
  { id: 'd4', name: "Safawi Dates 1kg", currentPrice: 950, originalPrice: 1100, image: "🫘", tags: { left: "Offered items", right: "Save 13%" } },
  { id: 'd5', name: "Mabroom Dates 500g", currentPrice: 750, originalPrice: 850, image: "🫘", tags: { right: "Save 11%" } },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full bg-transparent">
      <main className="flex-1 w-full bg-transparent">
        <HeroBanner />
        <FeaturedCategories />
        <TopSelling />
        <ProductSlider title="All Natural Honey" products={honeyProducts} viewAllLink="/category/honey" />
        <OurBrands />
        <ProductSlider title="Premium Dates Collection" products={datesProducts} viewAllLink="/category/dates" />
      </main>
    </div>
  );
}
