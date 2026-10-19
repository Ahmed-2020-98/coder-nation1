"use client";

import { Briefcase, Inbox, Layers, MessageSquareQuote, Plus } from "lucide-react";
import Link from "next/link";
import { MessageStatusBadge } from "@/components/MessageStatusBadge";
import { useStats } from "@/components/layout/Shell";
import { Card, CardHeader, EmptyState, PageTitle, Skeleton } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export default function OverviewPage() {
  const { data, isLoading } = useStats();

  const cards = [
    { label: "رسائل جديدة", value: data?.new_messages, sub: `من ${data?.messages ?? 0} رسالة`, icon: Inbox, href: "/messages", accent: true },
    { label: "الخدمات", value: data?.services, icon: Layers, href: "/services" },
    { label: "الأعمال", value: data?.projects, icon: Briefcase, href: "/projects" },
    { label: "آراء العملاء", value: data?.testimonials, icon: MessageSquareQuote, href: "/testimonials" },
  ];

  return (
    <>
      <PageTitle title="نظرة عامة" description="ملخص سريع لمحتوى الموقع والرسائل الواردة." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, sub, icon: Icon, href, accent }) => (
          <Link
            key={label}
            href={href}
            className={
              accent
                ? "rounded-2xl bg-brand p-5 text-white transition-opacity hover:opacity-95 dark:bg-accent-soft"
                : "rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-line-strong"
            }
          >
            <div className="flex items-center justify-between">
              <span className={accent ? "text-sm text-white/70" : "text-sm text-muted"}>{label}</span>
              <Icon className={accent ? "size-5 text-white/70" : "size-5 text-muted"} strokeWidth={1.75} />
            </div>
            {isLoading ? (
              <Skeleton className="mt-4 h-9 w-16" />
            ) : (
              <p className="mt-3 font-wordmark text-4xl font-semibold">{value ?? 0}</p>
            )}
            {sub && <p className="mt-1 text-xs text-white/60">{sub}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="أحدث الرسائل"
            action={
              <Link href="/messages" className="text-sm font-medium text-accent hover:underline">
                عرض الكل
              </Link>
            }
          />
          {isLoading ? (
            <div className="space-y-3 p-5">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : data?.latest_messages.length ? (
            <ul className="divide-y divide-line">
              {data.latest_messages.map((message) => (
                <li key={message.id}>
                  <Link href={`/messages?id=${message.id}`} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface font-semibold text-ink">
                      {message.name.charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate font-medium text-ink">{message.name}</span>
                        <MessageStatusBadge status={message.status} />
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-muted">{message.message}</span>
                    </span>
                    <span className="hidden shrink-0 text-xs text-muted sm:block">{formatDate(message.created_at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="لا توجد رسائل بعد." />
          )}
        </Card>

        <Card>
          <CardHeader title="إجراءات سريعة" />
          <div className="grid gap-2 p-5">
            {[
              { href: "/services/new", label: "إضافة خدمة جديدة" },
              { href: "/projects/new", label: "إضافة مشروع للأعمال" },
              { href: "/testimonials/new", label: "إضافة رأي عميل" },
              { href: "/settings", label: "تعديل بيانات التواصل" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-line-strong hover:bg-surface"
              >
                <Plus className="size-4 text-accent" />
                {action.label}
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
