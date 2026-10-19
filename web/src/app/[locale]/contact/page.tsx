import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialIcons } from "@/components/layout/SocialIcons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/i18n/routing";
import { api } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { whatsappLink } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ service?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata(locale, "/contact", { title: t("eyebrow"), description: t("subtitle") });
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { service } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const [services, settings] = await Promise.all([api.services(locale), api.settings(locale)]);
  const whatsapp = whatsappLink(settings.whatsapp);

  const channels = [
    settings.email && { icon: Mail, label: t("emailLabel"), value: settings.email, href: `mailto:${settings.email}`, ltr: true },
    settings.phone && { icon: Phone, label: t("phoneLabel"), value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}`, ltr: true },
    whatsapp && { icon: MessageCircle, label: "WhatsApp", value: settings.whatsapp, href: whatsapp, ltr: true },
    settings.address && { icon: MapPin, label: t("addressLabel"), value: settings.address, ltr: false },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string; ltr: boolean }[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <section className="container-x grid gap-16 pb-24 md:pb-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <ContactForm services={services} defaultService={services.some((s) => String(s.id) === service) ? service : undefined} />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <aside className="cut-corner bg-brand p-8 text-white md:p-10 dark:bg-elevated">
            <h2 className="text-sm font-semibold tracking-wide text-white/60">{t("info")}</h2>
            <ul className="mt-8 space-y-6">
              {channels.map(({ icon: Icon, label, value, href, ltr }) => (
                <li key={label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15">
                    <Icon className="size-4" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-white/55">{label}</span>
                    {href ? (
                      <a href={href} dir={ltr ? "ltr" : undefined} className="mt-1 block truncate font-medium transition-colors hover:text-[#8197ff]" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        {value}
                      </a>
                    ) : (
                      <span className="mt-1 block font-medium">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/60">{t("hours")}</p>
            <div className="mt-6 [&_a]:border-white/15 [&_a]:text-white/70 [&_a:hover]:border-white [&_a:hover]:text-white">
              <SocialIcons socials={settings.socials} />
            </div>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
