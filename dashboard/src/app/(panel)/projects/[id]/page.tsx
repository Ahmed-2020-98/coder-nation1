"use client";

import { useParams } from "next/navigation";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { PageTitle, Skeleton } from "@/components/ui";
import { useResourceItem } from "@/lib/resource";
import type { Project } from "@/lib/types";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useResourceItem<Project>("projects", id);

  return (
    <>
      <PageTitle title={data ? `تعديل: ${data.title.ar}` : "تعديل المشروع"} />
      {isLoading || !data ? <Skeleton className="h-96" /> : <ProjectForm project={data} />}
    </>
  );
}
