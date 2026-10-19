import { ProjectForm } from "@/components/forms/ProjectForm";
import { PageTitle } from "@/components/ui";

export default function NewProjectPage() {
  return (
    <>
      <PageTitle title="مشروع جديد" />
      <ProjectForm />
    </>
  );
}
