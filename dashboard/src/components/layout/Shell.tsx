"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Briefcase, ExternalLink, Inbox, LayoutDashboard, Layers, LogOut, Menu, MessageSquareQuote, Moon,
  Settings, Sun, X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { Monogram } from "@/components/Logo";
import { api } from "@/lib/api";
import type { Stats } from "@/lib/types";
import { cn, SITE_URL } from "@/lib/utils";

const nav = [
  { href: "/", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/services", label: "الخدمات", icon: Layers },
  { href: "/projects", label: "الأعمال", icon: Briefcase },
  { href: "/testimonials", label: "آراء العملاء", icon: MessageSquareQuote },
  { href: "/messages", label: "الرسائل", icon: Inbox, badge: true },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

export function useStats() {
  return useQuery({ queryKey: ["stats"], queryFn: () => api<{ data: Stats }>("stats").then((r) => r.data) });
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { data: stats } = useStats();

  useEffect(() => setOpen(false), [pathname]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-3 px-5 py-6" dir="ltr">
        <Monogram className="h-7 w-auto text-white" />
        <span className="font-wordmark text-sm font-semibold tracking-[0.16em] text-white">CODER NATION</span>
      </Link>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map(({ href, label, icon: Icon, badge }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
              isActive(href) ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white",
            )}
          >
            <Icon className="size-[18px]" strokeWidth={1.75} />
            <span className="flex-1">{label}</span>
            {badge && !!stats?.new_messages && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#8197ff] px-1.5 text-[11px] font-bold text-[#0b0d1f]">
                {stats.new_messages}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-[18px]" strokeWidth={1.75} />
          عرض الموقع
        </a>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="size-[18px] rtl:-scale-x-100" strokeWidth={1.75} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:ps-64">
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-64 bg-brand lg:block dark:bg-panel dark:border-e dark:border-line">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-label="إغلاق القائمة" />
          <aside className="absolute inset-y-0 start-0 w-72 bg-brand dark:bg-panel">
            <button type="button" onClick={() => setOpen(false)} className="absolute top-6 end-4 text-white/70" aria-label="إغلاق">
              <X className="size-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-line bg-bg/80 px-4 backdrop-blur-xl md:px-8">
        <button type="button" onClick={() => setOpen(true)} className="grid size-9 place-items-center rounded-xl border border-line lg:hidden" aria-label="القائمة">
          <Menu className="size-5" />
        </button>
        <p className="hidden text-sm text-muted lg:block">أهلاً بك في لوحة تحكم كودر نيشن</p>
        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="grid size-9 place-items-center rounded-xl border border-line text-ink transition-colors hover:bg-surface"
          aria-label="تبديل المظهر"
        >
          {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
