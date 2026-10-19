"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardHeader, Field, Input, Switch } from "@/components/ui";
import { FormActions } from "@/components/ui/FormActions";
import { applyServerErrors, required, translatable, useSaveResource } from "@/lib/resource";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ImageUpload } from "./ImageUpload";
import { TranslatableField } from "./TranslatableField";

const schema = z.object({
  name: required,
  company: z.string(),
  role: translatable,
  content: translatable,
  rating: z.number().int().min(1).max(5),
  order: z.number().int().min(0),
  is_active: z.boolean(),
});

type Values = z.infer<typeof schema>;

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const router = useRouter();
  const save = useSaveResource<Testimonial>("testimonials", testimonial?.id);
  const [avatar, setAvatar] = useState(
    testimonial?.avatar && testimonial.avatar_url ? { path: testimonial.avatar, url: testimonial.avatar_url } : null,
  );

  const { register, control, handleSubmit, setError, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: testimonial?.name ?? "",
      company: testimonial?.company ?? "",
      role: testimonial?.role ?? { ar: "", en: "" },
      content: testimonial?.content ?? { ar: "", en: "" },
      rating: testimonial?.rating ?? 5,
      order: testimonial?.order ?? 0,
      is_active: testimonial?.is_active ?? true,
    },
  });

  const onSubmit = (values: Values) =>
    save.mutate(
      { ...values, company: values.company || null, avatar: avatar?.path ?? null },
      { onSuccess: () => router.push("/testimonials"), onError: (e) => applyServerErrors(e, setError) },
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader title="بيانات العميل" />
        <div className="grid gap-5 p-5 md:grid-cols-[8rem_1fr]">
          <ImageUpload url={avatar?.url ?? null} onChange={setAvatar} folder="testimonials" className="aspect-square" label="صورة" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="الاسم" htmlFor="name" error={errors.name?.message}>
              <Input id="name" aria-invalid={!!errors.name} {...register("name")} />
            </Field>
            <Field label="الشركة" htmlFor="company">
              <Input id="company" {...register("company")} />
            </Field>
            <div className="md:col-span-2">
              <TranslatableField name="role" label="المسمى الوظيفي" register={register} errors={errors} />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="الرأي" />
        <div className="space-y-6 p-5">
          <TranslatableField name="content" label="نص الرأي" register={register} errors={errors} multiline rows={4} />
          <div className="flex flex-wrap items-end gap-8">
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <div>
                  <p className="mb-2 text-sm font-medium text-ink">التقييم</p>
                  <div className="flex gap-1" role="radiogroup" aria-label="التقييم" dir="ltr">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" role="radio" aria-checked={field.value === n} aria-label={`${n}`} onClick={() => field.onChange(n)}>
                        <Star className={cn("size-6 transition-colors", n <= field.value ? "fill-amber-400 text-amber-400" : "text-line-strong")} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            />
            <Field label="الترتيب" htmlFor="order" className="w-32">
              <Input id="order" type="number" min={0} {...register("order", { valueAsNumber: true })} />
            </Field>
            <Controller
              control={control}
              name="is_active"
              render={({ field }) => (
                <label className="flex h-10 items-center gap-3">
                  <Switch checked={field.value} onChange={field.onChange} label="ظاهر في الموقع" />
                  <span className="text-sm text-ink">ظاهر في الموقع</span>
                </label>
              )}
            />
          </div>
        </div>
      </Card>

      <FormActions backHref="/testimonials" saving={save.isPending} />
    </form>
  );
}
