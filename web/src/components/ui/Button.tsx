import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "inverse";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-accent dark:bg-ink dark:text-bg dark:hover:bg-accent dark:hover:text-white",
  outline: "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-bg",
  ghost: "text-ink hover:text-accent",
  inverse: "bg-white text-brand hover:bg-accent hover:text-white",
};

const base =
  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

function Arrow() {
  return (
    <ArrowUpRight
      aria-hidden
      className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
    />
  );
}

type LinkButtonProps = ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean; children: ReactNode };

export function ButtonLink({ variant = "primary", arrow = true, className, children, ...props }: LinkButtonProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type AnchorButtonProps = ComponentProps<"a"> & { variant?: Variant; arrow?: boolean };

export function ButtonAnchor({ variant = "primary", arrow = true, className, children, ...props }: AnchorButtonProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}
