import { Gauge, Handshake, Fingerprint, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { Monogram } from "@/components/brand/Logo";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Fingerprint, Gauge, Eye, Handshake];

export function WhyUs() {
  const t = useTranslations("why");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section className="noise relative isolate overflow-hidden bg-brand py-24 text-white md:py-32 dark:bg-elevated">
      <Monogram className="absolute -bottom-24 -z-10 h-[34rem] w-auto text-white/[0.04] ltr:-right-24 rtl:-left-24" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-white/60!">
            <span className="font-wordmark tracking-normal text-[#8197ff]">05</span>
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-balance md:text-5xl lg:text-[3.5rem]">{t("title")}</h2>
        </Reveal>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <Icon className="size-7 text-[#8197ff]" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
