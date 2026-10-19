"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Mail, MessageCircle, Phone, Search, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { MessageStatusBadge, statusLabels } from "@/components/MessageStatusBadge";
import { Button, Card, EmptyState, Input, PageTitle, Skeleton } from "@/components/ui";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { api } from "@/lib/api";
import type { Message, MessageStatus, Paginated } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

const filters: (MessageStatus | "all")[] = ["all", "new", "read", "replied", "archived"];

function Inbox() {
  const router = useRouter();
  const params = useSearchParams();
  const client = useQueryClient();
  const selectedId = params.get("id");
  const [status, setStatus] = useState<MessageStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState(false);

  const query = new URLSearchParams({ page: String(page) });
  if (status !== "all") query.set("status", status);
  if (search.trim()) query.set("search", search.trim());

  const list = useQuery({
    queryKey: ["messages", status, search, page],
    queryFn: () => api<Paginated<Message>>(`messages?${query}`),
    placeholderData: keepPreviousData,
  });

  const detail = useQuery({
    queryKey: ["message", selectedId],
    queryFn: async () => {
      const message = (await api<{ data: Message }>(`messages/${selectedId}`)).data;
      // Opening marks a new message as read on the server.
      client.invalidateQueries({ queryKey: ["messages"] });
      client.invalidateQueries({ queryKey: ["stats"] });
      return message;
    },
    enabled: !!selectedId,
  });

  const select = (id: number | null) => router.replace(id ? `/messages?id=${id}` : "/messages", { scroll: false });

  const refresh = () => {
    client.invalidateQueries({ queryKey: ["messages"] });
    client.invalidateQueries({ queryKey: ["message", selectedId] });
    client.invalidateQueries({ queryKey: ["stats"] });
  };

  const updateStatus = useMutation({
    mutationFn: (next: MessageStatus) => api(`messages/${selectedId}`, { method: "PATCH", json: { status: next } }),
    onSuccess: () => {
      toast.success("تم تحديث الحالة");
      refresh();
    },
  });

  const remove = useMutation({
    mutationFn: () => api(`messages/${selectedId}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("تم حذف الرسالة");
      setConfirm(false);
      select(null);
      refresh();
    },
  });

  const message = detail.data;

  return (
    <>
      <PageTitle title="الرسائل" description="طلبات التواصل وعروض الأسعار القادمة من فورم الموقع." />

      <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
        <Card className={cn("flex flex-col overflow-hidden", selectedId && "hidden lg:flex")}>
          <div className="space-y-3 border-b border-line p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="بحث بالاسم أو البريد…"
                className="ps-9"
                aria-label="بحث"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setStatus(f);
                    setPage(1);
                  }}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                    status === f ? "bg-brand text-white dark:bg-accent" : "text-muted hover:bg-surface hover:text-ink",
                  )}
                >
                  {f === "all" ? "الكل" : statusLabels[f]}
                </button>
              ))}
            </div>
          </div>

          {list.isLoading ? (
            <div className="space-y-2 p-3">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-16" />)}</div>
          ) : !list.data?.data.length ? (
            <EmptyState title="لا توجد رسائل." />
          ) : (
            <ul className="max-h-[65vh] divide-y divide-line overflow-y-auto">
              {list.data.data.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => select(item.id)}
                    className={cn(
                      "block w-full px-4 py-3.5 text-start transition-colors hover:bg-surface",
                      String(item.id) === selectedId && "bg-accent-soft hover:bg-accent-soft",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className={cn("truncate text-sm text-ink", item.status === "new" ? "font-bold" : "font-medium")}>
                        {item.status === "new" && <span className="me-2 inline-block size-2 rounded-full bg-accent" />}
                        {item.name}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted">{formatDate(item.created_at)}</span>
                    </span>
                    <span className="mt-1 block truncate text-xs text-muted">{item.message}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {list.data && list.data.meta.last_page > 1 && (
            <div className="mt-auto flex items-center justify-between border-t border-line p-3 text-xs text-muted">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                السابق
              </Button>
              {page} / {list.data.meta.last_page}
              <Button variant="outline" size="sm" disabled={page >= list.data.meta.last_page} onClick={() => setPage((p) => p + 1)}>
                التالي
              </Button>
            </div>
          )}
        </Card>

        <Card className={cn("min-h-[24rem]", !selectedId && "hidden lg:block")}>
          {!selectedId ? (
            <EmptyState title="اختر رسالة لعرض تفاصيلها." />
          ) : detail.isLoading || !message ? (
            <div className="space-y-4 p-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-40" /></div>
          ) : (
            <article className="p-6">
              <button type="button" onClick={() => select(null)} className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink lg:hidden">
                <ArrowRight className="size-4" />
                كل الرسائل
              </button>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-ink">{message.name}</h2>
                    <MessageStatusBadge status={message.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {formatDate(message.created_at)} · لغة الموقع: {message.locale === "ar" ? "عربي" : "English"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setConfirm(true)} aria-label="حذف الرسالة" className="hover:text-red-600">
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <dl className="mt-6 grid gap-4 rounded-xl bg-surface p-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted">البريد الإلكتروني</dt>
                  <dd className="mt-1 font-medium text-ink" dir="ltr">{message.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">الهاتف</dt>
                  <dd className="mt-1 font-medium text-ink" dir="ltr">{message.phone ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">الخدمة</dt>
                  <dd className="mt-1 font-medium text-ink">{message.service?.title.ar ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">الميزانية</dt>
                  <dd className="mt-1 font-medium text-ink">{message.budget ?? "—"}</dd>
                </div>
              </dl>

              <p className="mt-6 leading-loose whitespace-pre-line text-ink">{message.message}</p>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
                <a
                  href={`mailto:${message.email}`}
                  onClick={() => message.status !== "replied" && updateStatus.mutate("replied")}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-accent dark:bg-accent"
                >
                  <Mail className="size-4" />
                  رد بالبريد
                </a>
                {message.phone && (
                  <>
                    <a href={`https://wa.me/${message.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-ink hover:bg-surface">
                      <MessageCircle className="size-4" />
                      واتساب
                    </a>
                    <a href={`tel:${message.phone}`} className="inline-flex h-10 items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-ink hover:bg-surface">
                      <Phone className="size-4" />
                      اتصال
                    </a>
                  </>
                )}
                <div className="ms-auto flex items-center gap-2">
                  <label htmlFor="status" className="text-sm text-muted">الحالة</label>
                  <select
                    id="status"
                    value={message.status}
                    onChange={(e) => updateStatus.mutate(e.target.value as MessageStatus)}
                    className="h-10 rounded-xl border border-line bg-panel px-3 text-sm text-ink"
                  >
                    {(Object.keys(statusLabels) as MessageStatus[]).map((s) => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </article>
          )}
        </Card>
      </div>

      <ConfirmDialog
        open={confirm}
        title="حذف هذه الرسالة؟"
        description="لا يمكن التراجع عن هذا الإجراء."
        loading={remove.isPending}
        onClose={() => setConfirm(false)}
        onConfirm={() => remove.mutate()}
      />
    </>
  );
}

export default function MessagesPage() {
  return (
    <Suspense>
      <Inbox />
    </Suspense>
  );
}
