import Image from "next/image";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Project cover. Falls back to a composed device mockup tinted with the
 * project's color, so the portfolio looks finished before real screenshots exist.
 */
export function ProjectVisual({
  project,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: Pick<Project, "title" | "cover" | "color" | "category">;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.cover) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", className)}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const color = project.color || "#1B1E3F";

  return (
    <div
      role="img"
      aria-label={project.title}
      className={cn("relative isolate overflow-hidden", className)}
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, ${color}55, transparent 60%), radial-gradient(90% 80% at 0% 100%, ${color}33, transparent 55%), linear-gradient(160deg, ${color}1f, ${color}08)`,
      }}
    >
      <div className="bg-blueprint absolute inset-0 -z-10 opacity-70" />
      <div
        className="absolute inset-0 grid place-items-center transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5"
        dir="ltr"
      >
        {project.category === "mobile" ? <PhoneMockup color={color} /> : <BrowserMockup color={color} />}
      </div>
    </div>
  );
}

function BrowserMockup({ color }: { color: string }) {
  return (
    <div className="w-[78%] overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_30px_60px_-20px_rgb(15_18_45/0.45)] dark:border-white/10 dark:bg-[#14173a]">
      <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2.5 dark:border-white/10">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ms-3 h-3 w-1/3 rounded-full bg-black/5 dark:bg-white/10" />
      </div>
      <div className="grid grid-cols-5 gap-3 p-4">
        <div className="col-span-3 space-y-2.5">
          <span className="block h-2 w-1/3 rounded-full" style={{ background: color }} />
          <span className="block h-3.5 w-full rounded-full bg-[#1b1e3f]/85 dark:bg-white/80" />
          <span className="block h-3.5 w-4/5 rounded-full bg-[#1b1e3f]/85 dark:bg-white/80" />
          <span className="block h-2 w-full rounded-full bg-black/10 dark:bg-white/15" />
          <span className="block h-2 w-2/3 rounded-full bg-black/10 dark:bg-white/15" />
          <span className="mt-3 inline-block h-5 w-20 rounded-full" style={{ background: color }} />
        </div>
        <div className="col-span-2 rounded-lg" style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }} />
        <div className="col-span-5 grid grid-cols-3 gap-2 pt-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1.5 rounded-md border border-black/5 p-2 dark:border-white/10">
              <span className="block size-3 rounded" style={{ background: `${color}${i === 0 ? "" : "66"}` }} />
              <span className="block h-1.5 w-3/4 rounded-full bg-black/15 dark:bg-white/20" />
              <span className="block h-1.5 w-1/2 rounded-full bg-black/10 dark:bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneMockup({ color }: { color: string }) {
  return (
    <div className="flex items-end gap-4">
      <Phone color={color} className="hidden translate-y-6 scale-90 opacity-80 sm:block" variant="list" />
      <Phone color={color} variant="hero" />
    </div>
  );
}

function Phone({ color, className, variant }: { color: string; className?: string; variant: "hero" | "list" }) {
  return (
    <div
      className={cn(
        "w-32 rounded-[1.75rem] border-[5px] border-[#1b1e3f] bg-white p-2 shadow-[0_30px_60px_-20px_rgb(15_18_45/0.5)] md:w-36 dark:border-[#2a2f5e] dark:bg-[#14173a]",
        className,
      )}
    >
      <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-black/15 dark:bg-white/20" />
      {variant === "hero" ? (
        <div className="space-y-2">
          <div className="h-20 rounded-xl" style={{ background: `linear-gradient(140deg, ${color}, ${color}99)` }} />
          <span className="block h-2 w-3/4 rounded-full bg-[#1b1e3f]/80 dark:bg-white/80" />
          <span className="block h-1.5 w-1/2 rounded-full bg-black/15 dark:bg-white/20" />
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-9 rounded-lg" style={{ background: `${color}${i % 3 === 0 ? "40" : "1f"}` }} />
            ))}
          </div>
          <span className="block h-6 rounded-full" style={{ background: color }} />
        </div>
      ) : (
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="size-5 shrink-0 rounded-md" style={{ background: `${color}${i === 0 ? "" : "55"}` }} />
              <span className="h-1.5 flex-1 rounded-full bg-black/15 dark:bg-white/20" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
