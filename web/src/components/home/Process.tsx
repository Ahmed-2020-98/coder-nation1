import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pad } from "@/lib/utils";

type Step = { title: string; text: string };

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading index="03" eyebrow={t("eyebrow")} title={t("title")} />
      <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="group relative bg-bg p-8 transition-colors duration-300 hover:bg-elevated md:p-10">
            <Reveal delay={i * 0.08}>
              <div className="flex items-center gap-4">
                <span className="font-wordmark text-5xl text-ink/15 transition-colors duration-300 group-hover:text-accent">
                  {pad(i + 1)}
                </span>
                <span className="h-px flex-1 origin-left bg-line-strong rtl:origin-right" />
              </div>
              <h3 className="mt-8 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
