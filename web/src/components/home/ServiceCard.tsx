import { ArrowUpRight, Check } from "lucide-react";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/lib/types";
import { pad } from "@/lib/utils";

export function ServiceCard({ service, index, cta }: { service: Service; index: number; cta: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="cut-corner group relative flex h-full flex-col overflow-hidden bg-elevated p-8 transition-colors duration-500 hover:bg-brand md:p-10 dark:hover:bg-accent-soft"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl border border-line text-ink transition-colors duration-500 group-hover:border-white/20 group-hover:text-white">
          <ServiceIcon name={service.icon} className="size-6" />
        </span>
        <span className="font-wordmark text-sm text-muted transition-colors duration-500 group-hover:text-white/60">
          {pad(index + 1)}
        </span>
      </div>

      <h3 className="mt-10 font-display text-3xl text-ink transition-colors duration-500 group-hover:text-white md:text-4xl rtl:font-semibold">
        {service.title}
      </h3>
      <p className="mt-4 leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/75">
        {service.excerpt}
      </p>

      <ul className="mt-8 grid gap-3 border-t border-line pt-8 text-sm transition-colors duration-500 group-hover:border-white/15 sm:grid-cols-2">
        {service.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-ink-soft transition-colors duration-500 group-hover:text-white/85">
            <Check className="mt-0.5 size-4 shrink-0 text-accent group-hover:text-white" strokeWidth={2} />
            {feature}
          </li>
        ))}
      </ul>

      <span className="mt-auto inline-flex items-center gap-2 pt-10 text-sm font-semibold text-ink transition-colors duration-500 group-hover:text-white">
        {cta}
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
      </span>
    </Link>
  );
}
