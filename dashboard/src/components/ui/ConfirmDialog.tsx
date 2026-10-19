"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from ".";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "حذف",
  loading,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(92vw,26rem)] rounded-2xl border border-line bg-panel p-0 text-ink shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <span className="grid size-11 place-items-center rounded-full bg-red-500/10 text-red-600">
          <AlertTriangle className="size-5" />
        </span>
        <h2 className="mt-4 text-lg font-semibold">{title}</h2>
        {description && <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>}
        <div className="mt-6 flex gap-2">
          <Button variant="danger" loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </div>
      </div>
    </dialog>
  );
}
