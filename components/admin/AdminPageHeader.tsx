"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable Header for Admin Dashboard pages.
 */
interface AdminPageHeaderProps {
  title: string;
  highlight?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function AdminPageHeader({
  title,
  highlight,
  description,
  actions,
  className
}: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4", className)}>
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          {title} 
          {highlight && (
            <span className="text-primary italic font-medium ml-1">
              {highlight}
            </span>
          )}
        </h1>
        {description && (
          <p className="text-[14px] text-gray-500 mt-1 font-medium italic">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
