"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface CustomModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  variant?: "default" | "danger";
}

export function CustomModal({
  title,
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-md",
  variant = "default",
}: CustomModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          "p-0 overflow-hidden border-none  rounded-lg",
          maxWidth
        )}
        showCloseButton={false}
      >
        {/* Header with Variant Color */}
        <DialogHeader className={cn(
          "p-6 relative",
          variant === "danger" ? "bg-red-800" : "bg-primary"
        )}>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-black text-white uppercase tracking-tight leading-none">
              {title}
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>
        </DialogHeader>

        {/* Content Body */}
        <div className="p-6 bg-white">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
