import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  action,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", className)}>
      <Reveal className="max-w-2xl">
        <p className="eyebrow">
          {index && <span className="font-wordmark tracking-normal text-accent">{index}</span>}
          {eyebrow}
        </p>
        <h2 className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink md:text-5xl lg:text-[3.5rem]">
          {title}
        </h2>
        {subtitle && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{subtitle}</p>}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}
