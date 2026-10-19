"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const t = useTranslations("testimonials");
  const rtl = useLocale() === "ar";
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  if (!items.length) return null;
  const current = items[index];
  const go = (step: number) => setIndex((i) => (i + step + items.length) % items.length);
  const Prev = rtl ? ArrowRight : ArrowLeft;
  const Next = rtl ? ArrowLeft : ArrowRight;

  return (
    <section
      className="container-x py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionHeading
        index="06"
        eyebrow={t("eyebrow")}
        title={t("title")}
        action={
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label={t("prev")} className="grid size-12 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg">
              <Prev className="size-4" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t("next")} className="grid size-12 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg">
              <Next className="size-4" />
            </button>
          </div>
        }
      />

      <div className="mt-14 grid gap-10 border-t border-line pt-12 lg:grid-cols-12">
        <div className="relative min-h-[17rem] sm:min-h-[14rem] lg:col-span-9" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex gap-1 text-accent" aria-label={`${current.rating}/5`}>
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 font-display text-2xl leading-snug text-balance text-ink md:text-4xl rtl:leading-[1.6]">
                {rtl ? `«${current.content}»` : `“${current.content}”`}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-brand font-wordmark text-lg text-white dark:bg-accent-soft">
                  {current.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{current.name}</span>
                  <span className="block text-sm text-muted">
                    {current.role}
                    {current.company && ` · ${current.company}`}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <ol className="flex gap-2 lg:col-span-3 lg:flex-col lg:items-end lg:justify-end">
          {items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={item.name}
                aria-current={i === index}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === index ? "w-12 bg-accent" : "w-6 bg-line-strong hover:bg-muted",
                )}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
