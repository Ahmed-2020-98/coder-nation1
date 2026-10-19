"use client";

import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export function RowActions({
  editHref,
  onDelete,
  onUp,
  onDown,
}: {
  editHref: string;
  onDelete: () => void;
  onUp?: () => void;
  onDown?: () => void;
}) {
  const btn = "grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div className="flex items-center justify-end gap-0.5">
      <button type="button" className={btn} onClick={onUp} disabled={!onUp} aria-label="تحريك لأعلى">
        <ArrowUp className="size-4" />
      </button>
      <button type="button" className={btn} onClick={onDown} disabled={!onDown} aria-label="تحريك لأسفل">
        <ArrowDown className="size-4" />
      </button>
      <Link href={editHref} className={btn} aria-label="تعديل">
        <Pencil className="size-4" />
      </Link>
      <button type="button" className={`${btn} hover:text-red-600`} onClick={onDelete} aria-label="حذف">
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
