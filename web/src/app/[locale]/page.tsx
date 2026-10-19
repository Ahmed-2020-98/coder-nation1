import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { ProjectCard } from "@/components/home/ProjectCard";
import { ServiceCard } from "@/components/home/ServiceCard";
import { Stats } from "@/components/home/Stats";
import { TechMarquee } from "@/components/home/TechMarquee";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyUs } from "@/components/home/WhyUs";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/routing";
import { api } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { whatsappLink } from "@/lib/utils";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata(locale, "/", { title: t("title"), description: t("description") });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [services, projects, testimonials, settings] = await Promise.all([
    api.services(locale),
    api.projects(locale, { featured: true, limit: 4 }),
    api.testimonials(locale),
    api.settings(locale),
  ]);

  return (
    <>
      <Hero />
      <TechMarquee />
      <Stats stats={settings.stats} />

      <section className="container-x py-24 md:py-32">
        <SectionHeading
          index="02"
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          subtitle={t("services.subtitle")}
          action={
            <ButtonLink href="/services" variant="outline">
              {t("services.all")}
            </ButtonLink>
          }
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.1} className="h-full">
              <ServiceCard service={service} index={i} cta={t("services.learnMore")} />
            </Reveal>
          ))}
        </div>
      </section>

      <Process />

      {projects.length > 0 && (
        <section className="container-x py-24 md:py-32">
          <SectionHeading
            index="04"
            eyebrow={t("work.eyebrow")}
            title={t("work.title")}
            subtitle={t("work.subtitle")}
            action={
              <ButtonLink href="/work" variant="outline">
                {t("work.viewAll")}
              </ButtonLink>
            }
          />
          <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "md:mt-24" : undefined}>
                <ProjectCard project={project} large={i % 3 === 0} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <WhyUs />
      <Testimonials items={testimonials} />
      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
