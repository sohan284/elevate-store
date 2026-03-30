"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      const scrollable = docHeight - winHeight;
      const progress = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;

      // Clamp progress explicitly strictly between 0 and 100
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Show button after scrolling down 150px
      setIsVisible(scrollTop > 150);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger immediately to compute initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Geometry Settings
  const size = 54;
  const strokeWidth = 2.5;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  // Calculate dash offset factoring the current scroll percent
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 transition-all duration-500 ease-in-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
    >
      <div
        className="relative flex items-center justify-center cursor-pointer group"
        onClick={scrollToTop}
      >
        {/* Radial Progress Ring */}
        <svg fill="none" width={size} height={size} className="transform -rotate-90">
          <circle
            stroke="currentColor"
            fill="none"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            className="text-primary/5" // Faint invisible track mapping standard designs
          />
          <circle
            stroke="currentColor"
            fill="none"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-primary transition-all duration-50 ease-out drop-shadow-sm"
          />
        </svg>

        {/* Solid Floating Button */}
        <div className="absolute inset-0 flex items-center justify-center m-auto w-[42px] h-[42px] bg-primary rounded-full text-white shadow-md group-hover:bg-primary/90  transition-all duration-300">
          <ChevronUp size={22} strokeWidth={2.5} className="mt-[-2px] group-hover:scale-120 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}
