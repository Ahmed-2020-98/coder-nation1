import Link from "next/link";
import { Button } from ".";

export function FormActions({ backHref, saving }: { backHref: string; saving: boolean }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 flex gap-2 border-t border-line bg-bg/90 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
      <Button type="submit" loading={saving}>
        حفظ
      </Button>
      <Link href={backHref} className="inline-flex h-10 items-center rounded-xl border border-line bg-panel px-4 text-sm font-semibold text-ink hover:bg-surface">
        إلغاء
      </Link>
    </div>
  );
}
