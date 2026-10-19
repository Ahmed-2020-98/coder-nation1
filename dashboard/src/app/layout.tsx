import type { Metadata } from "next";
import { Cinzel, IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const sansAr = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-sans-ar" });
const sansEn = Manrope({ subsets: ["latin"], variable: "--font-sans-en" });
const wordmark = Cinzel({ subsets: ["latin"], weight: ["600"], variable: "--font-wordmark" });

export const metadata: Metadata = {
  title: { default: "لوحة التحكم · كودر نيشن", template: "%s · لوحة التحكم" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${sansAr.variable} ${sansEn.variable} ${wordmark.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
