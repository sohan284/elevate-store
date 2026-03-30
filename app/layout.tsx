import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import CategoryNavbar from "@/components/common/CategoryNavbar";
import Footer from "@/components/common/Footer";
import CartDrawer from "@/components/common/CartDrawer";
import ScrollToTop from "@/components/common/ScrollToTop";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elevate Store",
  description: "Elevate Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-primary/5 font-sans">
        <Navbar />
        <CategoryNavbar />
        {children}
        <Footer />
        <CartDrawer />
        <ScrollToTop />
      </body>
    </html>
  );
}
