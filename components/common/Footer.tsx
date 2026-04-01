import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);

export default function Footer() {
  const informationLinks = [
    { name: "About us", href: "/about" },
    { name: "Contact us", href: "/contact" },
    { name: "Company Information", href: "/company-info" },
    { name: "Elevate Store Stories", href: "/stories" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Careers", href: "/careers" },
    { name: "Data Deletion", href: "/data-deletion" },
  ];

  const shopByLinks = [
    { name: "Oil & Ghee", href: "/category/oil-ghee" },
    { name: "Honey", href: "/category/honey" },
    { name: "Dates", href: "/category/dates" },
    { name: "Spices", href: "/category/spices" },
    { name: "Nuts & Seeds", href: "/category/nuts-seeds" },
    { name: "Beverage", href: "/category/beverage" },
    { name: "Functional Foods", href: "/category/functional-foods" },
  ];

  const supportLinks = [
    { name: "Support Center", href: "/support" },
    { name: "How to Order", href: "/how-to-order" },
    { name: "Order Tracking", href: "/tracking" },
    { name: "Payment", href: "/payment" },
    { name: "Shipping", href: "/shipping" },
    { name: "FAQ", href: "/faq" },
  ];

  const policyLinks = [
    { name: "Happy Return", href: "/return" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Exchange", href: "/exchange" },
    { name: "Cancellation", href: "/cancellation" },
    { name: "Pre-Order", href: "/pre-order" },
    { name: "Extra Discount", href: "/discount" },
  ];

  // Mock array simulating payment icons
  const paymentLogos = ["VISA", "Master", "Amex", "Nexus", "Rocket", "Nagad", "bKash", "Upay", "Tap", "OK Pay", "Sure"];

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-2">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-6">
          
          {/* Brand Info & Apps - Spans 2 columns on lg */}
          <div className="lg:col-span-2 text-left">
            <Link href="/" className="inline-block mb-6">
               <div className="flex items-center gap-1 sm:gap-2">
                 <div className="relative flex items-center justify-center p-1 transform scale-90 sm:scale-100">
                    <Image src="/assets/logo.png" alt="Store Logo" width={55} height={55} className="object-cover" />
                 </div>
                 <div className="flex flex-col tracking-wider font-bold leading-none">
                    <span className="text-[20px] bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">ELEVATE</span>
                    <span className="text-[20px] -mt-1 bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">STORE</span>
                 </div>
               </div>
            </Link>
            
            <p className="text-gray-500 text-[14px] mb-6 leading-relaxed pr-6">
              Elevate Store is an e-commerce platform dedicated to providing safe and reliable food to every home.
            </p>
            
            <ul className="space-y-3.5 mb-8">
              <li className="flex items-start gap-3 text-gray-500 text-[14px]">
                <MapPin size={18} className="text-gray-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Rampura, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-[14px]">
                <Phone size={18} className="text-gray-400 shrink-0" strokeWidth={1.5} />
                <span>09642922922</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-[14px]">
                <Mail size={18} className="text-gray-400 shrink-0" strokeWidth={1.5} />
                <span>contact@elevatestore.com</span>
              </li>
            </ul>
            
            <div className="flex items-center gap-3 mb-10">
              <a href="#" className="w-[38px] h-[38px] rounded-full bg-orange-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="w-[38px] h-[38px] rounded-full bg-orange-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" className="w-[38px] h-[38px] rounded-full bg-orange-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <InstagramIcon />
              </a>
            </div>

            <h4 className="font-semibold text-gray-700 mb-4 text-[15px]">Download App on Mobile :</h4>
            <div className="flex flex-wrap gap-3">
               <button className="flex items-center gap-2.5 bg-[#1F2937] text-white px-3 py-2 rounded-lg hover:bg-black transition-colors min-w-[140px]">
                  <span className="text-2xl drop-shadow-md">▶</span>
                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-[9px] uppercase tracking-wide opacity-90 mb-0.5">Get it on</span>
                    <span className="text-[15px] font-semibold">Google Play</span>
                  </div>
               </button>
               <button className="flex items-center gap-2.5 bg-[#1F2937] text-white px-3 py-2 rounded-lg hover:bg-black transition-colors min-w-[140px]">
                  <span className="text-[26px] drop-shadow-md mt-[-4px]"></span>
                   <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-[9px] uppercase tracking-wide opacity-90 mb-0.5">Download on the</span>
                    <span className="text-[15px] font-semibold">App Store</span>
                  </div>
               </button>
            </div>
          </div>

          {/* Column 2: Information */}
          <div className="mt-2 lg:mt-0 lg:ml-4">
            <h3 className="text-[16.5px] font-bold text-gray-800 mb-5">Information</h3>
            <ul className="space-y-3.5">
              {informationLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-primary text-[14px] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Shop By */}
          <div className="mt-2 lg:mt-0">
            <h3 className="text-[16.5px] font-bold text-gray-800 mb-5">Shop By</h3>
            <ul className="space-y-3.5">
              {shopByLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-primary text-[14px] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="mt-2 lg:mt-0">
            <h3 className="text-[16.5px] font-bold text-gray-800 mb-5">Support</h3>
            <ul className="space-y-3.5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-primary text-[14px] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Consumer Policy */}
          <div className="mt-2 lg:mt-0">
            <h3 className="text-[16.5px] font-bold text-gray-800 mb-5">Consumer Policy</h3>
            <ul className="space-y-3.5">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-primary text-[14px] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom Setup */}
        <div className="border-t border-gray-200 mt-12 pt-6 pb-6 flex flex-col xl:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-[13px] tracking-wide">
            Copyright © 2026 ElevateStore All rights reserved.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center xl:justify-end">
            <span className="text-[#3b4148] text-sm font-semibold tracking-wide mr-2">Pay With</span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[600px]">
              {paymentLogos.map((logo) => (
                 <div key={logo} className="h-8 border border-gray-200 bg-white rounded flex items-center justify-center px-2 min-w-[42px] hover:border-primary/20 transition-colors">
                    <span className="text-[10px] font-black text-[#5a6572] uppercase tracking-tighter">{logo}</span>
                 </div>
              ))}
            </div>
            
            <div className="ml-2 pl-4 border-l-2 border-gray-100 hidden sm:flex sm:flex-col items-start">
              <span className="text-[9px] text-gray-400 mb-0.5 tracking-wider uppercase">Verified by</span>
              <span className="text-[13px] font-black text-[#1F51A4] italic tracking-tighter shadow-sm">SSLCOMMERZ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
