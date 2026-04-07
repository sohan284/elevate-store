"use client";

import React from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProxiedImageUrl } from "@/lib/utils";

interface ImageUploaderProps {
  /** Unique id for the hidden <input type="file"> — must be unique per page */
  inputId: string;
  /** Label shown above the uploader */
  label?: string;
  /** Base64 data-URL or remote URL to preview. null = show empty state */
  imagePreview: string | null;
  /** onChange handler for the file input (use the one from useImageUpload) */
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when the user clicks the × remove button */
  onClear: () => void;
}

export function ImageUploader({
  inputId,
  label = "Image",
  imagePreview,
  onFileChange,
  onClear,
}: ImageUploaderProps) {
  return (
    <div className="space-y-2">
      <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest pl-1">
        {label}
      </label>

      <div
        onClick={() => document.getElementById(inputId)?.click()}
        className={cn(
          "group relative w-full h-48 bg-[#F8F9FA] border-2 border-dashed border-gray-100 rounded-2xl",
          "flex flex-col items-center justify-center cursor-pointer transition-all",
          "hover:border-primary/50 hover:bg-primary/2",
          imagePreview && "border-solid border-primary/30 bg-white"
        )}
      >
        {/* Hidden file input */}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />

        {imagePreview ? (
          /* ── Preview state ── */
          <div className="relative w-full h-full p-2 group/preview">
            <img
              src={getProxiedImageUrl(imagePreview)}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl shadow-sm"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <p className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} /> Change Image
              </p>
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-10"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>
        ) : (
          /* ── Empty / upload state ── */
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
              <Upload size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[14px] font-black text-gray-900 uppercase tracking-tight">
                Click to upload
              </p>
              <p className="text-[12px] font-bold text-gray-400 mt-1 italic">
                PNG, JPG or WebP (Max 5MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
