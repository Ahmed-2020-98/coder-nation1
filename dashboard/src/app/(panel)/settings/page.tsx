"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TranslatableField } from "@/components/forms/TranslatableField";
import { Button, Card, CardHeader, Field, Input, PageTitle, Skeleton } from "@/components/ui";
import { api, ApiError } from "@/lib/api";
import type { Settings } from "@/lib/types";

const socials = [
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
  ["linkedin", "LinkedIn"],
  ["behance", "Behance"],
  ["x", "X (Twitter)"],
  ["tiktok", "TikTok"],
] as const;

const stats = [
  ["projects", "مشاريع منجزة"],
  ["clients", "عملاء"],
  ["years", "سنوات الخبرة"],
  ["satisfaction", "نسبة الرضا %"],
] as const;

type Values = {
  email: string;
  phone: string;
  whatsapp: string;
  address: { ar: string; en: string };
  tagline: { ar: string; en: string };
  socials: Record<string, string>;
  stats: Record<string, number | null>;
};

function SettingsForm({ settings }: { settings: Settings }) {
  const client = useQueryClient();
  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<Values>({
    defaultValues: {
      email: settings.email ?? "",
      phone: settings.phone ?? "",
      whatsapp: settings.whatsapp ?? "",
      address: { ar: settings.address?.ar ?? "", en: settings.address?.en ?? "" },
      tagline: { ar: settings.tagline?.ar ?? "", en: settings.tagline?.en ?? "" },
      socials: Object.fromEntries(socials.map(([key]) => [key, settings.socials?.[key] ?? ""])),
      stats: Object.fromEntries(stats.map(([key]) => [key, settings.stats?.[key] ?? null])),
    },
  });

  const save = useMutation({
    mutationFn: (values: Values) =>
      api<{ data: Settings }>("settings", {
        method: "PUT",
        json: {
          ...values,
          socials: Object.fromEntries(Object.entries(values.socials).map(([k, v]) => [k, v.trim() || null])),
        },
      }),
    onSuccess: (_, values) => {
      toast.success("تم حفظ الإعدادات");
      reset(values);
      client.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) =>
      toast.error(error instanceof ApiError && error.status === 422 ? "تأكد من صحة البريد والروابط" : "تعذر الحفظ"),
  });

  return (
    <form onSubmit={handleSubmit((v) => save.mutate(v))} className="space-y-6">
      <Card>
        <CardHeader title="بيانات التواصل" description="تظهر في الفوتر وصفحة التواصل." />
        <div className="grid gap-5 p-5 md:grid-cols-3">
          <Field label="البريد الإلكتروني" htmlFor="email">
            <Input id="email" type="email" dir="ltr" {...register("email")} />
          </Field>
          <Field label="رقم الهاتف" htmlFor="phone">
            <Input id="phone" dir="ltr" {...register("phone")} />
          </Field>
          <Field label="رقم الواتساب" htmlFor="whatsapp" hint="بالصيغة الدولية مثل 201000000000">
            <Input id="whatsapp" dir="ltr" {...register("whatsapp")} />
          </Field>
          <div className="md:col-span-3">
            <TranslatableField name="address" label="العنوان" register={register} errors={errors} />
          </div>
          <div className="md:col-span-3">
            <TranslatableField name="tagline" label="نبذة الفوتر" register={register} errors={errors} multiline rows={2} />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="السوشيال ميديا" description="اترك الحقل فارغاً لإخفاء الأيقونة." />
        <div className="grid gap-5 p-5 md:grid-cols-2">
          {socials.map(([key, label]) => (
            <Field key={key} label={label} htmlFor={`social-${key}`}>
              <Input id={`social-${key}`} dir="ltr" placeholder="https://" {...register(`socials.${key}`)} />
            </Field>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="الأرقام" description="الإحصائيات المعروضة في الصفحة الرئيسية." />
        <div className="grid gap-5 p-5 sm:grid-cols-2 md:grid-cols-4">
          {stats.map(([key, label]) => (
            <Field key={key} label={label} htmlFor={`stat-${key}`}>
              <Input id={`stat-${key}`} type="number" min={0} {...register(`stats.${key}`, { valueAsNumber: true })} />
            </Field>
          ))}
        </div>
      </Card>

      <div className="sticky bottom-0 z-10 -mx-4 border-t border-line bg-bg/90 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
        <Button type="submit" loading={save.isPending} disabled={!isDirty}>
          حفظ الإعدادات
        </Button>
      </div>
    </form>
  );
}

export default function SettingsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: () => api<{ data: Settings }>("settings").then((r) => r.data),
  });

  return (
    <>
      <PageTitle title="إعدادات الموقع" />
      {isLoading || !data ? <Skeleton className="h-96" /> : <SettingsForm settings={data} />}
    </>
  );
}
