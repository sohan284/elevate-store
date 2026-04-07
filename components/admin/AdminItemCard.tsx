import React from "react";
import Image from "next/image";
import { ChevronRight, Edit3, Trash2 } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { getProxiedImageUrl, isPrivateIpImageUrl } from "@/lib/utils";

interface AdminItemCardProps {
  id: string;
  _id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  createdAt?: string;
  FallbackIcon: LucideIcon;
  onEdit: () => void;
  onDelete: () => void;
}

export function AdminItemCard({
  id,
  name,
  imageUrl,
  description,
  createdAt,
  FallbackIcon,
  onEdit,
  onDelete,
}: AdminItemCardProps) {
  // Next.js explicitly blocks image optimization for private IPs (SSRF protection).
  // We use a Next.js rewrite (in next.config.ts) and unoptimize to safely proxy it!
  const isPrivateIp = isPrivateIpImageUrl(imageUrl);
  const proxyUrl = getProxiedImageUrl(imageUrl);

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden group hover:border-primary/30 transition-all flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
              {proxyUrl ? (
                <Image 
                  src={proxyUrl} 
                  alt={name} 
                  width={64} 
                  height={64} 
                  unoptimized={isPrivateIp}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <FallbackIcon className="text-gray-300" size={32} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors">{name}</h3>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest font-mono">ID: {id?.slice(-8)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:bg-gray-50 hover:text-amber-500 rounded-lg transition-all"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            Description
          </h4>
          <p className="text-[14px] text-gray-600 line-clamp-2 italic">
            {description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 bg-[#FBFBFC]/50 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[12px] font-bold text-gray-500">
          Created: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
        </span>
        <button className="text-primary text-[12px] font-black uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">
          View Products
          <ChevronRight size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

export function AdminItemCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col animate-pulse">
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gray-100/80"></div>
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-100 rounded-md"></div>
              <div className="h-3 w-20 bg-gray-50 rounded-md"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gray-50"></div>
            <div className="w-9 h-9 rounded-lg bg-gray-50"></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-3 w-24 bg-gray-100 rounded-md"></div>
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-gray-50 rounded-md"></div>
            <div className="h-3.5 w-4/5 bg-gray-50 rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-[#FBFBFC]/50 border-t border-gray-50 flex items-center justify-between">
        <div className="h-3 w-28 bg-gray-100 rounded-md"></div>
        <div className="h-3 w-24 bg-gray-100 rounded-md"></div>
      </div>
    </div>
  );
}
