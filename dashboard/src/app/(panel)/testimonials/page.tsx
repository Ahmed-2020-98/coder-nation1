"use client";

import { Plus, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { RowActions } from "@/components/ui/RowActions";
import { Badge, Card, EmptyState, PageTitle, Skeleton } from "@/components/ui";
import { move, useDeleteResource, useReorder, useResourceList } from "@/lib/resource";
import type { Testimonial } from "@/lib/types";

export default function TestimonialsPage() {
  const { data, isLoading } = useResourceList<Testimonial>("testimonials");
  const reorder = useReorder<Testimonial>("testimonials");
  const remove = useDeleteResource("testimonials");
  const [pending, setPending] = useState<Testimonial | null>(null);

  return (
    <>
      <PageTitle
        title="آراء العملاء"
        description="الآراء المعروضة في قسم الشهادات بالصفحة الرئيسية."
        action={
          <Link href="/testimonials/new" className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-accent dark:bg-accent">
            <Plus className="size-4" />
            رأي جديد
          </Link>
        }
      />
      <Card>
        {isLoading ? (
          <div className="space-y-3 p-5">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : !data?.length ? (
          <EmptyState title="لا توجد آراء بعد." />
        ) : (
          <ul className="divide-y divide-line">
            {data.map((item, i) => (
              <li key={item.id} className="flex items-center gap-4 px-5 py-4">
                <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-surface font-semibold text-ink">
                  {item.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element -- remote API storage
                    <img src={item.avatar_url} alt="" className="size-full object-cover" />
                  ) : (
                    item.name.charAt(0)
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/testimonials/${item.id}`} className="font-semibold text-ink hover:text-accent">
                      {item.name}
                    </Link>
                    <span className="text-sm text-muted">
                      {item.role.ar}
                      {item.company && ` · ${item.company}`}
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${item.rating}/5`}>
                      {Array.from({ length: item.rating }).map((_, n) => <Star key={n} className="size-3 fill-current" />)}
                    </span>
                    {!item.is_active && <Badge tone="warning">مخفي</Badge>}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted">{item.content.ar}</p>
                </div>
                <RowActions
                  editHref={`/testimonials/${item.id}`}
                  onUp={i > 0 ? () => reorder.mutate(move(data, i, i - 1)) : undefined}
                  onDown={i < data.length - 1 ? () => reorder.mutate(move(data, i, i + 1)) : undefined}
                  onDelete={() => setPending(item)}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
      <ConfirmDialog
        open={!!pending}
        title={`حذف رأي ${pending?.name}؟`}
        loading={remove.isPending}
        onClose={() => setPending(null)}
        onConfirm={() => pending && remove.mutate(pending.id, { onSuccess: () => setPending(null) })}
      />
    </>
  );
}
