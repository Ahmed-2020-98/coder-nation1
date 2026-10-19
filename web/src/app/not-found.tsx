import Link from "next/link";
import { fontVariables } from "@/lib/fonts";

// Fallback for requests outside any locale segment.
export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={fontVariables}>
      <body className="grid min-h-screen place-items-center bg-bg text-ink">
        <div className="text-center">
          <p className="font-wordmark text-7xl">404</p>
          <Link href="/ar" className="mt-6 inline-block underline underline-offset-4">
            الرئيسية · Home
          </Link>
        </div>
      </body>
    </html>
  );
}
