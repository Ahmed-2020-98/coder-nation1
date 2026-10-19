"use client";

import { Plus, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { RowActions } from "@/components/ui/RowActions";
import { Badge, Card, EmptyState, PageTitle, Skeleton } from "@/components/ui";
import { move, useDeleteResource, useReorder, useResourceList } from "@/lib/resource";
import type { Project } from "@/lib/types";

const categories: Record<string, string> = { web: "موقع", mobile: "تطبيق" };

export default function ProjectsPage() {
  const { data, isLoading } = useResourceList<Project>("projects");
  const reorder = useReorder<Project>("projects");
  const remove = useDeleteResource("projects");
  const [pending, setPending] = useState<Project | null>(null);

  return (
    <>
      <PageTitle
        title="الأعمال"
        description="مشاريع معرض الأعمال. المشاريع المميزة تظهر في الصفحة الرئيسية."
        action={
          <Link href="/projects/new" className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-accent dark:bg-accent">
            <Plus className="size-4" />
            مشروع جديد
          </Link>
        }
      />
      <Card>
        {isLoading ? (
          <div className="space-y-3 p-5">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : !data?.length ? (
          <EmptyState title="لا توجد مشاريع بعد." />
        ) : (
          <ul className="divide-y divide-line">
            {data.map((project, i) => (
              <li key={project.id} className="flex items-center gap-4 px-5 py-3.5">
                <span
                  className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-line"
                  style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}55)` }}
                >
                  {project.cover_url && (
                    // eslint-disable-next-line @next/next/no-img-element -- remote API storage
                    <img src={project.cover_url} alt="" className="size-full object-cover" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/projects/${project.id}`} className="font-semibold text-ink hover:text-accent">
                      {project.title.ar}
                    </Link>
                    <Badge>{categories[project.category] ?? project.category}</Badge>
                    {project.is_featured && (
                      <Badge tone="info">
                        <Star className="me-1 size-3 fill-current" />
                        مميز
                      </Badge>
                    )}
                    {!project.is_active && <Badge tone="warning">مخفي</Badge>}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted">
                    {[project.client, project.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <RowActions
                  editHref={`/projects/${project.id}`}
                  onUp={i > 0 ? () => reorder.mutate(move(data, i, i - 1)) : undefined}
                  onDown={i < data.length - 1 ? () => reorder.mutate(move(data, i, i + 1)) : undefined}
                  onDelete={() => setPending(project)}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
      <ConfirmDialog
        open={!!pending}
        title={`حذف مشروع "${pending?.title.ar}"؟`}
        description="سيتم حذف المشروع نهائياً من معرض الأعمال."
        loading={remove.isPending}
        onClose={() => setPending(null)}
        onConfirm={() => pending && remove.mutate(pending.id, { onSuccess: () => setPending(null) })}
      />
    </>
  );
}
