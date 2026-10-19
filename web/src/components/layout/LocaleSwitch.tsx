"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("locale");
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const next = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      lang={next}
      aria-label={t("label")}
      disabled={pending}
      onClick={() =>
        startTransition(() => {
          router.replace(pathname, { locale: next, scroll: false });
        })
      }
      className={cn(
        "h-10 rounded-full border border-line px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink disabled:opacity-60",
        next === "ar" ? "font-[family-name:var(--font-sans-ar)]" : "font-[family-name:var(--font-sans-en)]",
        className,
      )}
    >
      {t("switch")}
    </button>
  );
}
