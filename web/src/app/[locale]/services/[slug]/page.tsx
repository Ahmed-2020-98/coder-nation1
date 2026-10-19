import { Check } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/home/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { api } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/utils";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await api.service(locale, slug);
  if (!service) return {};
  return pageMetadata(locale, `/services/${slug}`, { title: service.title, description: service.excerpt });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = await api.service(locale, slug);
  if (!service) notFound();

  const t = await getTranslations();
  const [related, services] = await Promise.all([
    service.category ? api.projects(locale, { category: service.category, limit: 2 }) : Promise.resolve([]),
    api.services(locale),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.excerpt,
    provider: { "@type": "Organization", name: "Coder Nation", url: SITE_URL },
    url: `${SITE_URL}/${locale}/services/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative isolate overflow-hidden pt-36 pb-16 md:pt-44">
        <div className="bg-blueprint mask-fade-b absolute inset-0 -z-10" />
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <Link href="/services" className="eyebrow transition-colors hover:text-ink">
              {t("services.eyebrow")}
            </Link>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance text-ink md:text-7xl rtl:font-bold rtl:leading-[1.25]">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{service.excerpt}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex items-end lg:col-span-4 lg:justify-end">
            <span className="cut-corner grid size-32 place-items-center bg-brand text-white dark:bg-accent-soft">
              <ServiceIcon name={service.icon} className="size-12" />
            </span>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-16 border-t border-line py-16 md:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="text-lg leading-[1.9] whitespace-pre-line text-ink-soft md:text-xl">{service.description}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-3xl border border-line bg-elevated p-8">
            <h2 className="text-sm font-semibold tracking-wide text-muted">{t("services.features")}</h2>
            <ul className="mt-6 space-y-4">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-line pt-8">
              <p className="font-semibold text-ink">{t("services.ctaTitle")}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t("services.ctaText")}</p>
              <ButtonLink href={`/contact?service=${service.id}`} className="mt-6 w-full">
                {t("nav.cta")}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="container-x pb-24">
          <h2 className="font-display text-3xl text-ink md:text-4xl rtl:font-semibold">{t("services.related")}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {related.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {services.length > 1 && (
        <section className="border-t border-line">
          <div className="container-x flex flex-wrap items-center gap-3 py-10">
            {services
              .filter((s) => s.slug !== slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  <ServiceIcon name={s.icon} className="size-4" />
                  {s.title}
                </Link>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
