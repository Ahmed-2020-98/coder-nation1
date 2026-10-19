"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Monogram, Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t("skip")}
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <nav
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full border px-3 ps-5 transition-all duration-300",
            scrolled || open
              ? "border-line bg-elevated/85 shadow-soft backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" aria-label="Coder Nation" className="shrink-0">
            <Logo className="hidden sm:inline-flex" />
            <Monogram className="h-8 w-auto text-ink sm:hidden" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive(href) ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {t(key)}
                  {isActive(href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LocaleSwitch className="hidden sm:block" />
            <ThemeToggle />
            <ButtonLink href="/contact" className="hidden h-10 px-5 md:inline-flex">
              {t("cta")}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full bg-brand text-white lg:hidden dark:bg-ink dark:text-bg"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("close") : t("menu")}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bg/95 px-6 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col">
              {links.map(({ href, key }, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  <Link
                    href={href}
                    className={cn(
                      "flex items-baseline gap-4 py-5 font-display text-3xl",
                      isActive(href) ? "text-accent" : "text-ink",
                    )}
                  >
                    <span className="font-wordmark text-xs text-muted">0{i + 1}</span>
                    {t(key)}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <ButtonLink href="/contact" className="flex-1">
                {t("cta")}
              </ButtonLink>
              <LocaleSwitch className="h-12" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
