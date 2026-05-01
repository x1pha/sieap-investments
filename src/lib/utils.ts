import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Media / image helpers ───────────────────────────────────────────────────

export const isLocalDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

/** Proxy LinkedIn CDN images through Cloudflare Worker in production. No-op on localhost. */
export function proxyImageUrl(url: string): string {
  if (isLocalDev) return url;
  return `/api/img-proxy?url=${encodeURIComponent(url)}`;
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

/**
 * Format an ISO date string for display.
 * @param iso  ISO 8601 date string
 * @param locale  "en-IN" for India (default "en-US")
 */
export function formatDate(iso: string, locale: "en-IN" | "en-US" = "en-US"): string {
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric", month: "short", year: "numeric",
  });
}
