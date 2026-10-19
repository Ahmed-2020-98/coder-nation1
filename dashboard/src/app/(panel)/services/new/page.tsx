import { ServiceForm } from "@/components/forms/ServiceForm";
import { PageTitle } from "@/components/ui";

export default function NewServicePage() {
  return (
    <>
      <PageTitle title="خدمة جديدة" description="أضف خدمة جديدة (مثل تصميم الهوية أو SEO) وستظهر فوراً في الموقع." />
      <ServiceForm />
    </>
  );
}
