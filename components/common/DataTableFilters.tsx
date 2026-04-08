"use client";

import React from "react";
import { Search, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Container for data table filters.
 * Handles responsive layout and spacing.
 */
interface DataTableFilterBarProps {
  children: React.ReactNode;
  className?: string;
}

export function DataTableFilterBar({ children, className }: DataTableFilterBarProps) {
  return (
    <div className={cn(
      "bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4",
      className
    )}>
      {children}
    </div>
  );
}

/**
 * Reusable Search Input for DataTables.
 * Includes search icon and premium focus styles.
 */
interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DataTableSearch({ value, onChange, placeholder, className }: DataTableSearchProps) {
  return (
    <div className={cn("flex-1 w-full relative group", className)}>
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none"
      />
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="w-full bg-[#F8F9FA] border border-gray-100 rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-[14px] font-medium"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/**
 * Reusable Selection Filter.
 * Wraps Shadcn Select with premium styles.
 */
interface DataTableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}

export function DataTableSelect({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className,
  triggerClassName
}: DataTableSelectProps) {
  return (
    <div className={cn("w-full md:w-auto", className)}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn(
          "flex-1 md:flex-none bg-white border-gray-100 py-3 px-5 h-auto rounded-lg font-bold text-gray-700 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all min-w-[160px]",
          triggerClassName
        )}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-gray-100 shadow-xl overflow-hidden bg-white/95 backdrop-blur-md">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="py-2.5 px-4 font-bold text-gray-600 focus:bg-primary/5 focus:text-primary transition-colors cursor-pointer"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * Reusable Tab Filter for primary status switching.
 */
interface DataTableTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function DataTableTabs({ tabs, activeTab, onTabChange, className }: DataTableTabsProps) {
  return (
    <div className={cn("flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "px-5 py-2.5 rounded-full text-[13.5px] font-bold whitespace-nowrap transition-all",
            activeTab === tab
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white border border-gray-100 text-gray-400 hover:border-primary/30 hover:text-primary"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/**
 * Reusable Filter Button for secondary actions.
 */
interface DataTableFilterButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  className?: string;
}

export function DataTableFilterButton({
  children = "Filter",
  onClick,
  icon: Icon,
  className
}: DataTableFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors text-[14px] font-bold h-auto",
        className
      )}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
