"use client";

import { useParams } from "next/navigation";
import { TestimonialForm } from "@/components/forms/TestimonialForm";
import { PageTitle, Skeleton } from "@/components/ui";
import { useResourceItem } from "@/lib/resource";
import type { Testimonial } from "@/lib/types";

export default function EditTestimonialPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useResourceItem<Testimonial>("testimonials", id);

  return (
    <>
      <PageTitle title={data ? `تعديل رأي: ${data.name}` : "تعديل الرأي"} />
      {isLoading || !data ? <Skeleton className="h-96" /> : <TestimonialForm testimonial={data} />}
    </>
  );
}
