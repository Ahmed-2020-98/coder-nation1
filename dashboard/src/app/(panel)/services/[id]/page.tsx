"use client";

import { useParams } from "next/navigation";
import { ServiceForm } from "@/components/forms/ServiceForm";
import { PageTitle, Skeleton } from "@/components/ui";
import { useResourceItem } from "@/lib/resource";
import type { Service } from "@/lib/types";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useResourceItem<Service>("services", id);

  return (
    <>
      <PageTitle title={data ? `تعديل: ${data.title.ar}` : "تعديل الخدمة"} />
      {isLoading || !data ? <Skeleton className="h-96" /> : <ServiceForm service={data} />}
    </>
  );
}
