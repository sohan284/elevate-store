import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely strips private/local hostnames from image URLs 
 * so Next.js can proxy them through its configured API rewrites.
 */
export function getProxiedImageUrl(url?: string | null): string {
  if (!url) return "";
  const isPrivate = url.includes('192.168.') || url.includes('localhost');
  return isPrivate ? url.replace(/https?:\/\/[^\/]+/, '') : url;
}

/**
 * Checks if a given URL is hosted on a private network IP, 
 * which requires Next.js <Image> to bypass strict optimization (unopmitized flag).
 */
export function isPrivateIpImageUrl(url?: string | null): boolean {
  if (!url) return false;
  return url.includes('192.168.') || url.includes('localhost');
}

