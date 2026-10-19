import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/home/CtaBand";
import { Process } from "@/components/home/Process";
import { ServiceCard } from "@/components/home/ServiceCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/i18n/routing";
import { api } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { whatsappLink } from "@/lib/utils";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata(locale, "/services", { title: t("eyebrow"), description: t("pageSubtitle") });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const [services, settings] = await Promise.all([api.services(locale), api.settings(locale)]);

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("pageTitle")} subtitle={t("pageSubtitle")} />
      <section className="container-x pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 2) * 0.1} className="h-full">
              <ServiceCard service={service} index={i} cta={t("learnMore")} />
            </Reveal>
          ))}
        </div>
      </section>
      <Process />
      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
