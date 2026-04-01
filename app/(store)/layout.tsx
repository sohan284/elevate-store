import Navbar from "@/components/common/Navbar";
import CategoryNavbar from "@/components/common/CategoryNavbar";
import Footer from "@/components/common/Footer";
import CartDrawer from "@/components/common/CartDrawer";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CategoryNavbar />
      <main className="flex-1 w-full bg-slate-50/50">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <ScrollToTop />
    </>
  );
}
