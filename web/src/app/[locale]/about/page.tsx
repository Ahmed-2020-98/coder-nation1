import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Monogram } from "@/components/brand/Logo";
import { CtaBand } from "@/components/home/CtaBand";
import { Stats } from "@/components/home/Stats";
import { WhyUs } from "@/components/home/WhyUs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/i18n/routing";
import { api } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { pad, whatsappLink } from "@/lib/utils";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata(locale, "/about", { title: t("eyebrow"), description: t("intro") });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const settings = await api.settings(locale);
  const values = t.raw("values") as { title: string; text: string }[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("intro")} />

      <section className="container-x grid gap-16 border-t border-line py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="cut-corner relative grid aspect-square place-items-center overflow-hidden bg-brand dark:bg-accent-soft">
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <Monogram className="relative h-1/2 w-auto text-white" />
          </div>
        </Reveal>
        <div className="space-y-12 lg:col-span-6 lg:col-start-7">
          {(["story", "mission", "vision"] as const).map((key, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <h2 className="eyebrow">{t(`${key}Title`)}</h2>
              <p className="mt-4 text-lg leading-[1.9] text-ink-soft md:text-xl">{t(key)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats stats={settings.stats} />

      <section className="container-x py-20 md:py-28">
        <Reveal>
          <h2 className="font-display text-4xl text-ink md:text-5xl rtl:font-semibold">{t("valuesTitle")}</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <div key={value.title} className="bg-bg p-8">
              <span className="font-wordmark text-sm text-accent">{pad(i + 1)}</span>
              <h3 className="mt-6 text-xl font-semibold text-ink">{value.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyUs />
      <div className="pt-24 md:pt-32">
        <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
      </div>
    </>
  );
}
