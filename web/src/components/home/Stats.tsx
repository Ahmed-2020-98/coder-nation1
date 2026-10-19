"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import type { Settings } from "@/lib/types";

const keys = ["projects", "clients", "years", "satisfaction"] as const;

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {display}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export function Stats({ stats }: { stats: Settings["stats"] }) {
  const t = useTranslations("stats");

  return (
    <section className="container-x py-16 md:py-20">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {keys.map((key) => (
          <div key={key} className="bg-bg p-6 md:p-10">
            <dt className="text-sm text-muted">{t(key)}</dt>
            <dd className="mt-3 font-wordmark text-4xl font-medium text-ink md:text-6xl">
              <Counter value={stats?.[key] ?? 0} suffix={key === "satisfaction" ? "%" : "+"} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
