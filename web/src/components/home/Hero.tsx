"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="bg-blueprint mask-fade-b absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -top-40 -z-10 size-[42rem] rounded-full bg-accent/10 blur-3xl ltr:-right-40 rtl:-left-40"
      />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-elevated/70 px-3.5 py-1.5 text-xs font-medium text-ink-soft backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {t("badge")}
            </span>
          </motion.div>

          <motion.p {...rise(0.08)} className="eyebrow mt-8">
            {t("eyebrow")}
          </motion.p>

          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.05] text-balance text-ink sm:text-6xl lg:text-7xl xl:text-[5.25rem] rtl:leading-[1.25] rtl:font-bold">
            <motion.span {...rise(0.14)} className="block">
              {t("title")}
            </motion.span>
            <motion.span {...rise(0.22)} className="block text-accent italic rtl:not-italic">
              {t("titleAccent")}
            </motion.span>
          </h1>

          <motion.p {...rise(0.3)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            {t("subtitle")}
          </motion.p>

          <motion.div {...rise(0.38)} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact">{t("primary")}</ButtonLink>
            <ButtonLink href="/work" variant="outline" arrow={false}>
              {t("secondary")}
            </ButtonLink>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <BlueprintMark reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

/** The monogram drawn as a technical blueprint, then filled. */
function BlueprintMark({ reduce }: { reduce: boolean }) {
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 2.2, ease: [0.65, 0, 0.35, 1] as const, delay: 0.3 },
      };
  const fill = reduce
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.2, delay: 2 } };
  const fadeIn = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8, delay } };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]" dir="ltr">
      <div className="absolute inset-0 rounded-[2rem] border border-line bg-elevated/60 shadow-soft backdrop-blur-sm" />
      <svg viewBox="0 0 600 600" className="relative size-full" aria-hidden>
        <defs>
          <pattern id="minor" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="var(--grid)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="24" y="24" width="552" height="552" rx="20" fill="url(#minor)" />

        {/* Crosshair corners */}
        {[
          [60, 60],
          [540, 60],
          [60, 540],
          [540, 540],
        ].map(([x, y]) => (
          <motion.g key={`${x}-${y}`} {...fadeIn(0.2)} stroke="var(--line-strong)" strokeWidth="1">
            <line x1={x - 10} y1={y} x2={x + 10} y2={y} />
            <line x1={x} y1={y - 10} x2={x} y2={y + 10} />
          </motion.g>
        ))}

        <svg x="95" y="95" width="410" height="410" viewBox={MONOGRAM_VIEWBOX} overflow="visible">
          <motion.path d={MONOGRAM_PATH} fill="var(--ink)" {...fill} />
          <motion.path
            d={MONOGRAM_PATH}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinejoin="round"
            {...draw}
          />
          {/* Construction line along the N diagonal */}
          <motion.line
            x1="760"
            y1="-30"
            x2="1640"
            y2="1240"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="14 14"
            {...fadeIn(1.4)}
          />
          <motion.circle cx="938" cy="228" r="14" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="5" {...fadeIn(1.6)} />
          <motion.circle cx="1503" cy="1306" r="14" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="5" {...fadeIn(1.7)} />
        </svg>

        {/* Dimension annotations */}
        <motion.g {...fadeIn(1.8)} fontFamily="var(--font-sans-en)" fontSize="11" fill="var(--muted)" letterSpacing="1.5">
          <line x1="95" y1="560" x2="505" y2="560" stroke="var(--line-strong)" />
          <line x1="95" y1="554" x2="95" y2="566" stroke="var(--line-strong)" />
          <line x1="505" y1="554" x2="505" y2="566" stroke="var(--line-strong)" />
          <text x="300" y="552" textAnchor="middle">1150 PX</text>
          <text x="48" y="44">CN—01</text>
          <text x="552" y="44" textAnchor="end">55°</text>
        </motion.g>
      </svg>
    </div>
  );
}
