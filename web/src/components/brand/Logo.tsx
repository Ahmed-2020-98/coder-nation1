import { cn } from "@/lib/utils";

/** The CN monogram traced from the brand mark; inherits `currentColor`. */
export const MONOGRAM_PATH =
  "M938 228 L1355 828 L1355 460 L1507 676 L1503 1306 L1085 715 L1084 1146 L703 1146 C520 1112 383 985 381 770 C380 545 560 383 817 390 L816 537 L711 540 C600 572 531 660 531 760 C532 900 600 970 711 994 L934 995 Z";

export const MONOGRAM_VIEWBOX = "370 218 1150 1100";

export function Monogram({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <path d={MONOGRAM_PATH} />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-ink", className)} dir="ltr">
      <Monogram className="h-8 w-auto" />
      {!compact && (
        <span className="font-wordmark text-[0.95rem] font-semibold leading-none tracking-[0.18em]">
          CODER NATION
        </span>
      )}
    </span>
  );
}
