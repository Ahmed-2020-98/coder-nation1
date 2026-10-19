"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardHeader, Field, Input, Select, Switch } from "@/components/ui";
import { FormActions } from "@/components/ui/FormActions";
import { applyServerErrors, slug, slugify, translatable, useSaveResource } from "@/lib/resource";
import type { Project } from "@/lib/types";
import { ImageUpload } from "./ImageUpload";
import { ListInput } from "./ListInput";
import { TranslatableField } from "./TranslatableField";

const schema = z.object({
  slug,
  title: translatable,
  summary: translatable,
  description: translatable,
  category: z.string().min(1),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "لون غير صحيح"),
  client: z.string(),
  live_url: z.union([z.literal(""), z.string().url("رابط غير صحيح")]),
  year: z.number().int().min(2000).max(2100).nullable(),
  tech_stack: z.array(z.string()),
  is_featured: z.boolean(),
  is_active: z.boolean(),
  order: z.number().int().min(0),
});

type Values = z.infer<typeof schema>;
type Image = { path: string; url: string };

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const save = useSaveResource<Project>("projects", project?.id);
  const [cover, setCover] = useState<Image | null>(
    project?.cover && project.cover_url ? { path: project.cover, url: project.cover_url } : null,
  );
  const [gallery, setGallery] = useState<Image[]>(
    project?.gallery.map((path, i) => ({ path, url: project.gallery_urls[i] })) ?? [],
  );

  const { register, control, handleSubmit, setError, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      slug: project?.slug ?? "",
      title: project?.title ?? { ar: "", en: "" },
      summary: project?.summary ?? { ar: "", en: "" },
      description: project?.description ?? { ar: "", en: "" },
      category: project?.category ?? "web",
      color: project?.color ?? "#1B1E3F",
      client: project?.client ?? "",
      live_url: project?.live_url ?? "",
      year: project?.year ?? new Date().getFullYear(),
      tech_stack: project?.tech_stack ?? [],
      is_featured: project?.is_featured ?? false,
      is_active: project?.is_active ?? true,
      order: project?.order ?? 0,
    },
  });

  const onSubmit = (values: Values) =>
    save.mutate(
      {
        ...values,
        slug: values.slug || slugify(values.title.en),
        client: values.client || null,
        live_url: values.live_url || null,
        cover: cover?.path ?? null,
        gallery: gallery.map((g) => g.path),
      },
      { onSuccess: () => router.push("/projects"), onError: (e) => applyServerErrors(e, setError) },
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader title="المحتوى" />
        <div className="space-y-6 p-5">
          <TranslatableField name="title" label="اسم المشروع" register={register} errors={errors} />
          <TranslatableField name="summary" label="ملخص قصير" register={register} errors={errors} multiline rows={2} />
          <TranslatableField name="description" label="تفاصيل المشروع" register={register} errors={errors} multiline rows={6} />
        </div>
      </Card>

      <Card>
        <CardHeader title="الصور" description="لو مفيش صورة غلاف، الموقع بيعرض تصميم تلقائي بلون المشروع." />
        <div className="grid gap-6 p-5 md:grid-cols-3">
          <div>
            <p className="mb-2 text-sm font-medium text-ink">صورة الغلاف</p>
            <ImageUpload url={cover?.url ?? null} onChange={setCover} folder="projects" className="aspect-[4/3]" />
          </div>
          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-medium text-ink">معرض الصور</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((image) => (
                <div key={image.path} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote API storage */}
                  <img src={image.url} alt="" className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setGallery((g) => g.filter((x) => x.path !== image.path))}
                    className="absolute top-2 end-2 grid size-7 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                    aria-label="إزالة"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
              {gallery.length < 12 && (
                <ImageUpload url={null} onChange={(img) => img && setGallery((g) => [...g, img])} folder="projects" className="aspect-[4/3]" label="إضافة" />
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="التفاصيل" />
        <div className="grid gap-5 p-5 md:grid-cols-3">
          <Field label="النوع" htmlFor="category">
            <Select id="category" {...register("category")}>
              <option value="web">موقع إلكتروني</option>
              <option value="mobile">تطبيق موبايل</option>
            </Select>
          </Field>
          <Field label="العميل" htmlFor="client">
            <Input id="client" {...register("client")} />
          </Field>
          <Field label="السنة" htmlFor="year" error={errors.year?.message}>
            <Input id="year" type="number" {...register("year", { setValueAs: (v) => (v === "" || v === null ? null : Number(v)) })} />
          </Field>
          <Field label="رابط المشروع" htmlFor="live_url" error={errors.live_url?.message}>
            <Input id="live_url" dir="ltr" placeholder="https://" aria-invalid={!!errors.live_url} {...register("live_url")} />
          </Field>
          <Field label="لون المشروع" htmlFor="color" error={errors.color?.message} hint="يستخدم في التصميم التلقائي">
            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <div className="flex gap-2">
                  <input
                    type="color"
                    aria-label="اختيار اللون"
                    className="h-10 w-12 shrink-0 cursor-pointer rounded-xl border border-line bg-panel p-1"
                    value={/^#[0-9a-fA-F]{6}$/.test(field.value) ? field.value : "#1b1e3f"}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <Input id="color" dir="ltr" value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
                </div>
              )}
            />
          </Field>
          <Field label="الرابط (slug)" htmlFor="slug" error={errors.slug?.message} hint="اتركه فارغاً ليتولد تلقائياً">
            <Input id="slug" dir="ltr" aria-invalid={!!errors.slug} {...register("slug")} />
          </Field>
          <div className="md:col-span-2">
            <p className="mb-1.5 text-sm font-medium text-ink">التقنيات المستخدمة</p>
            <Controller
              control={control}
              name="tech_stack"
              render={({ field }) => <ListInput value={field.value} onChange={field.onChange} dir="ltr" placeholder="Next.js, Flutter…" />}
            />
          </div>
          <Field label="الترتيب" htmlFor="order">
            <Input id="order" type="number" min={0} {...register("order", { valueAsNumber: true })} />
          </Field>
          <div className="flex flex-wrap gap-8 md:col-span-3">
            {([
              ["is_featured", "مشروع مميز (يظهر في الرئيسية)"],
              ["is_active", "ظاهر في الموقع"],
            ] as const).map(([name, label]) => (
              <Controller
                key={name}
                control={control}
                name={name}
                render={({ field }) => (
                  <label className="flex items-center gap-3">
                    <Switch checked={field.value} onChange={field.onChange} label={label} />
                    <span className="text-sm text-ink">{label}</span>
                  </label>
                )}
              />
            ))}
          </div>
        </div>
      </Card>

      <FormActions backHref="/projects" saving={save.isPending} />
    </form>
  );
}
