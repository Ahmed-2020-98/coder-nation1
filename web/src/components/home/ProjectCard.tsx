import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, large = false, priority = false }: { project: Project; large?: boolean; priority?: boolean }) {
  const t = useTranslations("work");
  const category = project.category === "mobile" || project.category === "web" ? t(`categories.${project.category}`) : project.category;

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <ProjectVisual
        project={project}
        priority={priority}
        className={cn("rounded-3xl border border-line", large ? "aspect-[4/3]" : "aspect-[4/3] lg:aspect-[5/4]")}
      />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted">
            {category}
            {project.year && (
              <>
                {" · "}
                <span className="tabular-nums">{project.year}</span>
              </>
            )}
          </p>
          <h3 className="mt-1.5 font-display text-2xl text-ink transition-colors group-hover:text-accent md:text-3xl rtl:font-semibold">
            {project.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{project.summary}</p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight className="size-4 rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  );
}
