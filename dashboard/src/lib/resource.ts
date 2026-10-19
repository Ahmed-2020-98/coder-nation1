"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api, ApiError } from "./api";

export type ResourceName = "services" | "projects" | "testimonials";

export function useResourceList<T>(resource: ResourceName) {
  return useQuery({ queryKey: [resource], queryFn: () => api<{ data: T[] }>(resource).then((r) => r.data) });
}

export function useResourceItem<T>(resource: ResourceName, id?: string) {
  return useQuery({
    queryKey: [resource, id],
    queryFn: () => api<{ data: T }>(`${resource}/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

export function useDeleteResource(resource: ResourceName) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api(`${resource}/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("تم الحذف");
      client.invalidateQueries({ queryKey: [resource] });
      client.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: () => toast.error("تعذر الحذف"),
  });
}

/** Persists a new order by sending the full id list. */
export function useReorder<T extends { id: number }>(resource: ResourceName) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (items: T[]) => api(`${resource}/reorder`, { method: "PATCH", json: { ids: items.map((i) => i.id) } }),
    onMutate: (items) => client.setQueryData([resource], items),
    onError: () => {
      toast.error("تعذر حفظ الترتيب");
      client.invalidateQueries({ queryKey: [resource] });
    },
  });
}

export function useSaveResource<T>(resource: ResourceName, id?: number) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: unknown) =>
      api<{ data: T }>(id ? `${resource}/${id}` : resource, { method: id ? "PUT" : "POST", json: payload }).then((r) => r.data),
    onSuccess: () => {
      toast.success("تم الحفظ بنجاح");
      client.invalidateQueries({ queryKey: [resource] });
      client.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

/** Maps Laravel 422 errors ("title.ar") onto react-hook-form fields. */
export function applyServerErrors<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>) {
  if (error instanceof ApiError && error.status === 422) {
    for (const [field, messages] of Object.entries(error.errors)) {
      setError(field as Path<T>, { message: translateError(messages[0]) });
    }
    toast.error("راجع الحقول المطلوبة");
    return;
  }
  toast.error("حدث خطأ غير متوقع");
}

function translateError(message: string) {
  if (/has already been taken/.test(message)) return "هذه القيمة مستخدمة بالفعل";
  if (/is required/.test(message)) return "هذا الحقل مطلوب";
  if (/must be a valid URL/.test(message)) return "رابط غير صحيح";
  return message;
}

export const required = z.string().trim().min(1, "هذا الحقل مطلوب");
export const translatable = z.object({ ar: required, en: required });
/** Optional: an empty slug is generated from the English title on submit. */
export const slug = z
  .string()
  .trim()
  .regex(/^[a-z0-9-]*$/, "حروف إنجليزية صغيرة وأرقام وشرطات فقط");

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function move<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
