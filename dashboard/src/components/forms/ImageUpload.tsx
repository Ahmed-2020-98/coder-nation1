"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ApiError, upload } from "@/lib/api";
import { cn } from "@/lib/utils";

type Folder = "projects" | "testimonials" | "services";

export function ImageUpload({
  url,
  onChange,
  folder,
  className,
  label = "رفع صورة",
}: {
  url: string | null;
  onChange: (value: { path: string; url: string } | null) => void;
  folder: Folder;
  className?: string;
  label?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handle = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await upload(file, folder));
    } catch (error) {
      toast.error(error instanceof ApiError ? Object.values(error.errors).flat()[0] ?? error.message : "تعذر رفع الصورة");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-dashed border-line-strong bg-surface", className)}>
      {url ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote API storage */}
          <img src={url} alt="" className="size-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 end-2 grid size-8 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            aria-label="إزالة الصورة"
          >
            <X className="size-4" />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy}
          className="flex size-full flex-col items-center justify-center gap-2 p-4 text-sm text-muted transition-colors hover:text-ink"
        >
          {busy ? <Loader2 className="size-6 animate-spin" /> : <ImagePlus className="size-6" strokeWidth={1.5} />}
          {label}
        </button>
      )}
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => handle(e.target.files?.[0])}
      />
    </div>
  );
}
