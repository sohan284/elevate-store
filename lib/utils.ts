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


/**
 * Simple vanilla cookie management
 */
export const cookies = {
  set: (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
  },
  get: (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  remove: (name: string) => {
    document.cookie = `${name}=; Max-Age=-99999999;path=/;`;
  }
};
