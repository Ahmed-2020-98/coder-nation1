import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/layout/Providers";
import { routing, type Locale } from "@/i18n/routing";
import { api } from "@/lib/api";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d1f" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s · ${locale === "ar" ? "كودر نيشن" : "Coder Nation"}` },
    description: t("description"),
    applicationName: "Coder Nation",
    openGraph: { type: "website", siteName: "Coder Nation", images: ["/brand/coder-nation-logo.jpg"] },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const settings = await api.settings(locale);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Coder Nation",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/coder-nation-logo.jpg`,
    email: settings.email,
    telephone: settings.phone,
    sameAs: Object.values(settings.socials ?? {}).filter(Boolean),
  };

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <Providers>
          <NextIntlClientProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
