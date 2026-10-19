import { useTranslations } from "next-intl";
import { Monogram } from "@/components/brand/Logo";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({ whatsapp }: { whatsapp?: string }) {
  const t = useTranslations("cta");

  return (
    <section className="container-x pb-24 md:pb-32">
      <Reveal>
        <div className="cut-corner noise relative isolate overflow-hidden bg-brand px-8 py-16 text-white md:px-16 md:py-24 dark:bg-accent-soft">
          <Monogram className="absolute top-1/2 -z-10 h-[140%] w-auto -translate-y-1/2 text-white/[0.06] ltr:-right-10 rtl:-left-10" />
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl leading-[1.1] text-balance md:text-6xl rtl:font-semibold rtl:leading-[1.35]">{t("title")}</h2>
            <p className="mt-6 text-lg text-white/75">{t("text")}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="inverse">
                {t("button")}
              </ButtonLink>
              {whatsapp && (
                <ButtonAnchor
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="border-white/30 text-white hover:border-white hover:bg-white hover:text-brand"
                >
                  {t("whatsapp")}
                </ButtonAnchor>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
