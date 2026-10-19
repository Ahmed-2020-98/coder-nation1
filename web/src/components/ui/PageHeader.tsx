import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHeader({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="bg-blueprint mask-fade-b absolute inset-0 -z-10" />
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] text-balance text-ink md:text-7xl rtl:font-bold rtl:leading-[1.25]">
            {title}
          </h1>
          {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
