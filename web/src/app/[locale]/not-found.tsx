import { useTranslations } from "next-intl";
import { Monogram } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="bg-blueprint relative grid min-h-[80vh] place-items-center pt-24">
      <div className="container-x text-center">
        <Monogram className="mx-auto h-20 w-auto text-ink/15" />
        <p className="mt-8 font-wordmark text-7xl text-ink md:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl text-ink">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">{t("text")}</p>
        <ButtonLink href="/" className="mt-8">
          {t("back")}
        </ButtonLink>
      </div>
    </section>
  );
}
