import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function whatsappLink(number?: string) {
  return number ? `https://wa.me/${number.replace(/[^\d]/g, "")}` : undefined;
}
