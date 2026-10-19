"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/lib/types";
import { API_URL, cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().max(30).optional(),
  service_id: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().trim().min(10).max(5000),
});

type Values = z.infer<typeof schema>;
type Status = "idle" | "success" | "error" | "throttled";

const field =
  "w-full rounded-2xl border border-line bg-elevated px-4 py-3.5 text-ink placeholder:text-muted/70 transition-colors duration-200 outline-none hover:border-line-strong focus:border-accent focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-red-500";

export function ContactForm({ services, defaultService }: { services: Service[]; defaultService?: string }) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const budgets = t.raw("budgets") as string[];
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { service_id: defaultService ?? "" },
  });

  const onSubmit = async (values: Values) => {
    setStatus("idle");
    try {
      const res = await fetch(`${API_URL}/contact?locale=${locale}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...values,
          service_id: values.service_id ? Number(values.service_id) : null,
          phone: values.phone || null,
          budget: values.budget || null,
        }),
      });
      if (res.status === 429) return setStatus("throttled");
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      reset({ service_id: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div ref={successRef} className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-elevated p-10" role="status">
        <CheckCircle2 className="size-12 text-emerald-500" strokeWidth={1.5} />
        <p className="font-display text-3xl text-ink rtl:font-semibold">{t("success")}</p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          {t("submit")}
        </Button>
      </div>
    );
  }

  const error = (key: keyof Values) =>
    errors[key] && (
      <p id={`${key}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400">
        {t(`errors.${key as "name" | "email" | "message"}`)}
      </p>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
          {t("name")} <span className="text-accent">*</span>
        </label>
        <input id="name" autoComplete="name" placeholder={t("namePlaceholder")} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
        {error("name")}
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          {t("email")} <span className="text-accent">*</span>
        </label>
        <input id="email" type="email" dir="ltr" autoComplete="email" placeholder={t("emailPlaceholder")} className={cn(field, "rtl:text-right")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
        {error("email")}
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
          {t("phone")}
        </label>
        <input id="phone" type="tel" dir="ltr" autoComplete="tel" placeholder={t("phonePlaceholder")} className={cn(field, "rtl:text-right")} {...register("phone")} />
      </div>
      <div>
        <label htmlFor="service_id" className="mb-2 block text-sm font-medium text-ink">
          {t("service")}
        </label>
        <select id="service_id" className={field} {...register("service_id")}>
          <option value="">{t("servicePlaceholder")}</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="mb-3 block text-sm font-medium text-ink">{t("budget")}</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((budget) => (
            <label key={budget} className="cursor-pointer">
              <input type="radio" value={budget} className="peer sr-only" {...register("budget")} />
              <span className="inline-block rounded-full border border-line px-4 py-2.5 text-sm text-ink-soft transition-colors duration-200 peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent hover:border-ink dark:peer-checked:border-ink dark:peer-checked:bg-ink dark:peer-checked:text-bg">
                {budget}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          {t("message")} <span className="text-accent">*</span>
        </label>
        <textarea id="message" rows={6} placeholder={t("messagePlaceholder")} className={cn(field, "resize-y")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
        {error("message")}
      </div>

      {(status === "error" || status === "throttled") && (
        <p role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-700 sm:col-span-2 dark:text-red-300">
          {t(status === "error" ? "error" : "throttled")}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto sm:px-10">
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {isSubmitting ? t("sending") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
