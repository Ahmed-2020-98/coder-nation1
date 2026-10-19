"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { serviceIcons } from "@/components/ServiceIcon";
import { Card, CardHeader, Field, Input, Select, Switch } from "@/components/ui";
import { FormActions } from "@/components/ui/FormActions";
import { applyServerErrors, slug, slugify, translatable, useSaveResource } from "@/lib/resource";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ListInput } from "./ListInput";
import { TranslatableField } from "./TranslatableField";

const schema = z.object({
  slug,
  icon: z.string().min(1),
  category: z.string(),
  title: translatable,
  excerpt: translatable,
  description: translatable,
  features: z.object({ ar: z.array(z.string()), en: z.array(z.string()) }),
  order: z.number().int().min(0),
  is_active: z.boolean(),
});

type Values = z.infer<typeof schema>;

export function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const save = useSaveResource<Service>("services", service?.id);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      slug: service?.slug ?? "",
      icon: service?.icon ?? "monitor",
      category: service?.category ?? "",
      title: service?.title ?? { ar: "", en: "" },
      excerpt: service?.excerpt ?? { ar: "", en: "" },
      description: service?.description ?? { ar: "", en: "" },
      features: { ar: service?.features.ar ?? [], en: service?.features.en ?? [] },
      order: service?.order ?? 0,
      is_active: service?.is_active ?? true,
    },
  });
  const { register, control, handleSubmit, setError, formState: { errors } } = form;

  const onSubmit = (values: Values) =>
    save.mutate(
      { ...values, slug: values.slug || slugify(values.title.en), category: values.category || null },
      { onSuccess: () => router.push("/services"), onError: (e) => applyServerErrors(e, setError) },
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader title="المحتوى" description="اكتب المحتوى بالعربي والإنجليزي." />
        <div className="space-y-6 p-5">
          <TranslatableField name="title" label="اسم الخدمة" register={register} errors={errors} />
          <TranslatableField name="excerpt" label="وصف مختصر" register={register} errors={errors} multiline rows={2} />
          <TranslatableField name="description" label="الوصف الكامل" register={register} errors={errors} multiline rows={6} />
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-ink">مميزات الخدمة</legend>
            <div className="grid gap-3 md:grid-cols-2">
              {(["ar", "en"] as const).map((lang) => (
                <Controller
                  key={lang}
                  control={control}
                  name={`features.${lang}`}
                  render={({ field }) => (
                    <ListInput
                      value={field.value}
                      onChange={field.onChange}
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      placeholder={lang === "ar" ? "أضف ميزة واضغط Enter" : "Add a feature and press Enter"}
                    />
                  )}
                />
              ))}
            </div>
          </fieldset>
        </div>
      </Card>

      <Card>
        <CardHeader title="الإعدادات" />
        <div className="grid gap-5 p-5 md:grid-cols-3">
          <Field label="الرابط (slug)" htmlFor="slug" error={errors.slug?.message} hint="اتركه فارغاً ليتولد من الاسم الإنجليزي">
            <Input id="slug" dir="ltr" aria-invalid={!!errors.slug} {...register("slug")} />
          </Field>
          <Field label="التصنيف" htmlFor="category" hint="لربط الخدمة بالأعمال المناسبة">
            <Select id="category" {...register("category")}>
              <option value="">بدون</option>
              <option value="web">مواقع (web)</option>
              <option value="mobile">تطبيقات (mobile)</option>
            </Select>
          </Field>
          <Field label="الترتيب" htmlFor="order">
            <Input id="order" type="number" min={0} {...register("order", { valueAsNumber: true })} />
          </Field>
          <div className="md:col-span-3">
            <p className="mb-2 text-sm font-medium text-ink">الأيقونة</p>
            <Controller
              control={control}
              name="icon"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="الأيقونة">
                  {Object.entries(serviceIcons).map(([name, Icon]) => (
                    <button
                      key={name}
                      type="button"
                      role="radio"
                      aria-checked={field.value === name}
                      aria-label={name}
                      title={name}
                      onClick={() => field.onChange(name)}
                      className={cn(
                        "grid size-11 place-items-center rounded-xl border transition-colors",
                        field.value === name ? "border-accent bg-accent-soft text-accent" : "border-line text-muted hover:border-line-strong hover:text-ink",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </button>
                  ))}
                </div>
              )}
            />
          </div>
          <Controller
            control={control}
            name="is_active"
            render={({ field }) => (
              <label className="flex items-center gap-3 md:col-span-3">
                <Switch checked={field.value} onChange={field.onChange} label="ظاهرة في الموقع" />
                <span className="text-sm text-ink">ظاهرة في الموقع</span>
              </label>
            )}
          />
        </div>
      </Card>

      <FormActions backHref="/services" saving={save.isPending} />
    </form>
  );
}
