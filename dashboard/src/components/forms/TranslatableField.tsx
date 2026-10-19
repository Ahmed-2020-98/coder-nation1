import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Field, Input, Textarea } from "@/components/ui";

const languages = [
  { key: "ar", label: "عربي", dir: "rtl" },
  { key: "en", label: "English", dir: "ltr" },
] as const;

/** Side-by-side Arabic/English inputs for a `{ar, en}` field, so no error hides in a tab. */
export function TranslatableField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  multiline = false,
  rows = 4,
}: {
  name: string;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  multiline?: boolean;
  rows?: number;
}) {
  const fieldErrors = errors[name] as Record<string, { message?: string }> | undefined;

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{label}</legend>
      <div className="grid gap-3 md:grid-cols-2">
        {languages.map(({ key, label: lang, dir }) => {
          const id = `${name}-${key}`;
          const props = {
            id,
            dir,
            "aria-invalid": !!fieldErrors?.[key],
            ...register(`${name}.${key}` as Path<T>),
          };
          return (
            <Field key={key} htmlFor={id} label={<span className="text-xs font-medium text-muted">{lang}</span>} error={fieldErrors?.[key]?.message}>
              {multiline ? <Textarea rows={rows} {...props} /> : <Input {...props} />}
            </Field>
          );
        })}
      </div>
    </fieldset>
  );
}
