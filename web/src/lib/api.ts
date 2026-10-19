import "server-only";
import type { Locale } from "@/i18n/routing";
import { fallbackServices, fallbackSettings } from "./fallback";
import type { Project, Service, Settings, Testimonial } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

class NotFoundError extends Error {}

async function get<T>(path: string, locale: Locale, params: Record<string, string> = {}): Promise<T> {
  const query = new URLSearchParams({ locale, ...params });
  const res = await fetch(`${API_URL}${path}?${query}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60, tags: [path.split("/")[1]] },
  });

  if (res.status === 404) throw new NotFoundError(path);
  if (!res.ok) throw new Error(`API ${res.status} on ${path}`);

  return ((await res.json()) as { data: T }).data;
}

/** Returns the fallback when the API is down, but lets real 404s surface as `null`. */
async function safe<T>(request: Promise<T>, fallback: T): Promise<T> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof NotFoundError) return null as T;
    console.error("[api]", (error as Error).message);
    return fallback;
  }
}

export const api = {
  services: (locale: Locale) => safe(get<Service[]>("/services", locale), fallbackServices[locale]),
  service: (locale: Locale, slug: string) =>
    safe<Service | null>(
      get<Service>(`/services/${slug}`, locale),
      fallbackServices[locale].find((s) => s.slug === slug) ?? null,
    ),
  projects: (locale: Locale, params: { category?: string; featured?: boolean; limit?: number } = {}) => {
    const query: Record<string, string> = {};
    if (params.category) query.category = params.category;
    if (params.featured) query.featured = "1";
    if (params.limit) query.limit = String(params.limit);
    return safe(get<Project[]>("/projects", locale, query), []);
  },
  project: (locale: Locale, slug: string) => safe<Project | null>(get<Project>(`/projects/${slug}`, locale), null),
  testimonials: (locale: Locale) => safe(get<Testimonial[]>("/testimonials", locale), []),
  settings: (locale: Locale) => safe(get<Settings>("/settings", locale), fallbackSettings),
};
