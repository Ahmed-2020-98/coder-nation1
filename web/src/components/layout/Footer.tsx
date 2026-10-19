import { getLocale, getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/Logo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { api } from "@/lib/api";
import { SocialIcons } from "./SocialIcons";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const [settings, services] = await Promise.all([api.settings(locale), api.services(locale)]);
  const year = new Date().getFullYear();

  const nav = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services") },
    { href: "/work", label: t("nav.work") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-elevated">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm leading-relaxed text-muted">{settings.tagline ?? t("footer.about")}</p>
          <div className="mt-8">
            <SocialIcons socials={settings.socials} />
          </div>
        </div>

        <nav className="md:col-span-2" aria-label={t("footer.links")}>
          <h3 className="text-sm font-semibold text-ink">{t("footer.links")}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-ink">{t("footer.services")}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-sm font-semibold text-ink">{t("footer.contact")}</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {settings.email && (
              <li>
                <a href={`mailto:${settings.email}`} className="transition-colors hover:text-ink">
                  {settings.email}
                </a>
              </li>
            )}
            {settings.phone && (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} dir="ltr" className="transition-colors hover:text-ink">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.address && <li>{settings.address}</li>}
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        dir="ltr"
        className="pointer-events-none -mb-[0.12em] overflow-hidden text-center font-wordmark text-[10.5vw] leading-none font-semibold tracking-[0.02em] whitespace-nowrap text-ink/[0.06] select-none"
      >
        CODER NATION
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t("brand.name")}. {t("footer.rights")}
          </p>
          <p>{t("footer.made")}</p>
        </div>
      </div>
    </footer>
  );
}
