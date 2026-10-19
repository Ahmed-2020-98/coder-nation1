"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { inputClass } from "@/components/ui";
import { cn } from "@/lib/utils";

/** Editable list of short strings (features, tech stack…) rendered as chips. */
export function ListInput({
  value,
  onChange,
  placeholder,
  dir,
  id,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  id?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const item = draft.trim();
    if (item && !value.includes(item)) onChange([...value, item]);
    setDraft("");
  };

  return (
    <div className="rounded-xl border border-line bg-panel p-2" dir={dir}>
      {value.length > 0 && (
        <ul className="mb-2 flex flex-wrap gap-1.5">
          {value.map((item) => (
            <li key={item} className="inline-flex items-center gap-1 rounded-lg bg-surface py-1 ps-2.5 pe-1 text-sm text-ink">
              {item}
              <button
                type="button"
                onClick={() => onChange(value.filter((v) => v !== item))}
                className="grid size-5 place-items-center rounded text-muted hover:bg-line hover:text-ink"
                aria-label={`حذف ${item}`}
              >
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className={cn(inputClass, "border-transparent hover:border-transparent")}
        />
        <button type="button" onClick={add} className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-ink hover:bg-line" aria-label="إضافة">
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
