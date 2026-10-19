import { Alexandria, Cinzel, IBM_Plex_Sans_Arabic, Instrument_Serif, Manrope } from "next/font/google";

export const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-en",
});

export const sans = Manrope({ subsets: ["latin"], variable: "--font-sans-en" });

export const wordmark = Cinzel({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-wordmark" });

export const displayAr = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "500", "700"],
  variable: "--font-display-ar",
});

export const sansAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-ar",
});

export const fontVariables = [display, sans, wordmark, displayAr, sansAr].map((f) => f.variable).join(" ");
