import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/home/CtaBand";
import { ProjectCard } from "@/components/home/ProjectCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { api } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { cn, whatsappLink } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
};

const filters = ["all", "web", "mobile"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return pageMetadata(locale, "/work", { title: t("pageTitle"), description: t("pageSubtitle") });
}

export default async function WorkPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("work");
  const active = filters.find((f) => f === category) ?? "all";

  const [projects, settings] = await Promise.all([
    api.projects(locale, active === "all" ? {} : { category: active }),
    api.settings(locale),
  ]);

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("pageTitle")} subtitle={t("pageSubtitle")}>
        <nav className="mt-12 flex flex-wrap gap-2" aria-label={t("category")}>
          {filters.map((filter) => (
            <Link
              key={filter}
              href={filter === "all" ? "/work" : `/work?category=${filter}`}
              scroll={false}
              aria-current={active === filter ? "page" : undefined}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200",
                active === filter
                  ? "border-brand bg-brand text-white dark:border-ink dark:bg-ink dark:text-bg"
                  : "border-line text-muted hover:border-ink hover:text-ink",
              )}
            >
              {t(`filters.${filter}`)}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <section className="container-x pb-24 md:pb-32">
        {projects.length ? (
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "md:mt-24" : undefined}>
                <ProjectCard project={project} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-line-strong p-16 text-center text-muted">{t("empty")}</p>
        )}
      </section>

      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
