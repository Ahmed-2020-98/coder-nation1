import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "./utils";

/** Canonical + hreflang alternates for a locale-less path like "/services". */
export function pageMetadata(locale: Locale, path: string, meta: { title?: string; description?: string }): Metadata {
  const clean = path === "/" ? "" : path;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${clean}`,
      languages: Object.fromEntries([
        ...routing.locales.map((l) => [l, `${SITE_URL}/${l}${clean}`]),
        ["x-default", `${SITE_URL}/${routing.defaultLocale}${clean}`],
      ]),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}${clean}`,
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
  };
}
