import { type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const labelCls = "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60";
const fieldCls =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-navy-deep placeholder:text-navy/35 focus:border-navy outline-none transition-colors";

export function TextField({
  label,
  name,
  required,
  ...rest
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className={labelCls}>
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <input name={name} required={required} className={fieldCls} {...rest} />
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  required,
  rows = 4,
  ...rest
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className={labelCls}>
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <textarea name={name} required={required} rows={rows} className={fieldCls} {...rest} />
    </label>
  );
}

export function SelectField({
  label,
  name,
  required,
  options,
  ...rest
}: { label: string; options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className={labelCls}>
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <select name={name} required={required} className={`${fieldCls} appearance-none bg-white`} {...rest}>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FileField({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        type="file"
        name={name}
        accept="image/*"
        className="block w-full rounded-lg border border-dashed border-line bg-mist px-4 py-3 text-sm text-navy/60 file:mr-4 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-xs file:font-medium file:text-white"
      />
    </label>
  );
}
