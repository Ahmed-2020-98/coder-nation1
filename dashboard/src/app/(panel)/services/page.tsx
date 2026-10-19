"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { RowActions } from "@/components/ui/RowActions";
import { Badge, Card, EmptyState, PageTitle, Skeleton } from "@/components/ui";
import { move, useDeleteResource, useReorder, useResourceList } from "@/lib/resource";
import type { Service } from "@/lib/types";

export default function ServicesPage() {
  const { data, isLoading } = useResourceList<Service>("services");
  const reorder = useReorder<Service>("services");
  const remove = useDeleteResource("services");
  const [pending, setPending] = useState<Service | null>(null);

  return (
    <>
      <PageTitle
        title="الخدمات"
        description="الخدمات المعروضة في الموقع. الترتيب هنا هو نفس ترتيب ظهورها."
        action={
          <Link href="/services/new" className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-accent dark:bg-accent">
            <Plus className="size-4" />
            خدمة جديدة
          </Link>
        }
      />
      <Card>
        {isLoading ? (
          <div className="space-y-3 p-5">{[0, 1].map((i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : !data?.length ? (
          <EmptyState title="لا توجد خدمات بعد." />
        ) : (
          <ul className="divide-y divide-line">
            {data.map((service, i) => (
              <li key={service.id} className="flex items-center gap-4 px-5 py-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface text-ink">
                  <ServiceIcon name={service.icon} className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/services/${service.id}`} className="font-semibold text-ink hover:text-accent">
                      {service.title.ar}
                    </Link>
                    <span className="text-sm text-muted" dir="ltr">{service.title.en}</span>
                    {!service.is_active && <Badge tone="warning">مخفية</Badge>}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted">{service.excerpt.ar}</p>
                </div>
                <span className="hidden text-xs text-muted md:block">{service.messages_count ?? 0} طلب</span>
                <RowActions
                  editHref={`/services/${service.id}`}
                  onUp={i > 0 ? () => reorder.mutate(move(data, i, i - 1)) : undefined}
                  onDown={i < data.length - 1 ? () => reorder.mutate(move(data, i, i + 1)) : undefined}
                  onDelete={() => setPending(service)}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
      <ConfirmDialog
        open={!!pending}
        title={`حذف خدمة "${pending?.title.ar}"؟`}
        description="سيتم حذف الخدمة نهائياً من الموقع. الرسائل المرتبطة بها ستبقى."
        loading={remove.isPending}
        onClose={() => setPending(null)}
        onConfirm={() => pending && remove.mutate(pending.id, { onSuccess: () => setPending(null) })}
      />
    </>
  );
}
