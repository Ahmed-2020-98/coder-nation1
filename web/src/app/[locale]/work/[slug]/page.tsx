import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/home/CtaBand";
import { ButtonAnchor } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { api } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { whatsappLink } from "@/lib/utils";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await api.project(locale, slug);
  if (!project) return {};
  return {
    ...pageMetadata(locale, `/work/${slug}`, { title: project.title, description: project.summary }),
    ...(project.cover && { openGraph: { images: [project.cover] } }),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = await api.project(locale, slug);
  if (!project) notFound();

  const t = await getTranslations("work");
  const [all, settings] = await Promise.all([api.projects(locale), api.settings(locale)]);
  const position = all.findIndex((p) => p.slug === slug);
  const next = all.length > 1 ? all[(position + 1) % all.length] : null;

  const meta = [
    { label: t("client"), value: project.client },
    { label: t("category"), value: project.category === "web" || project.category === "mobile" ? t(`categories.${project.category}`) : project.category },
    { label: t("year"), value: project.year?.toString() },
  ].filter((item) => item.value);

  return (
    <>
      <section className="relative isolate pt-36 pb-12 md:pt-44">
        <div className="bg-blueprint mask-fade-b absolute inset-0 -z-10" />
        <div className="container-x">
          <Reveal>
            <Link href="/work" className="eyebrow transition-colors hover:text-ink">
              {t("back")}
            </Link>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] text-balance text-ink md:text-7xl rtl:font-bold rtl:leading-[1.25]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{project.summary}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x">
        <Reveal>
          <ProjectVisual project={project} priority sizes="100vw" className="aspect-[16/10] rounded-[2rem] border border-line md:aspect-[16/8]" />
        </Reveal>
      </section>

      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <dl className="divide-y divide-line border-y border-line">
            {meta.map((item) => (
              <div key={item.label} className="flex justify-between gap-4 py-4">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="font-medium text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
          {project.tech_stack.length > 0 && (
            <div className="mt-8">
              <p className="text-sm text-muted">{t("stack")}</p>
              <ul className="mt-4 flex flex-wrap gap-2" dir="ltr">
                {project.tech_stack.map((tech) => (
                  <li key={tech} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.live_url && (
            <ButtonAnchor href={project.live_url} target="_blank" rel="noopener noreferrer" className="mt-8">
              {t("visit")}
            </ButtonAnchor>
          )}
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <p className="text-lg leading-[1.9] whitespace-pre-line text-ink-soft md:text-xl">{project.description}</p>
        </Reveal>
      </section>

      {project.gallery.length > 0 && (
        <section className="container-x grid gap-6 pb-24 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 2) * 0.1} className={i % 3 === 0 ? "md:col-span-2" : undefined}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface">
                <Image src={src} alt={`${project.title} — ${i + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </section>
      )}

      {next && next.slug !== slug && (
        <section className="border-y border-line">
          <Link href={`/work/${next.slug}`} className="group container-x flex items-center justify-between gap-6 py-12 md:py-16">
            <span>
              <span className="eyebrow">{t("next")}</span>
              <span className="mt-4 block font-display text-3xl text-ink transition-colors group-hover:text-accent md:text-5xl rtl:font-semibold">
                {next.title}
              </span>
            </span>
            <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight className="size-6 rtl:-scale-x-100" />
            </span>
          </Link>
        </section>
      )}

      <div className="pt-24">
        <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
      </div>
    </>
  );
}
