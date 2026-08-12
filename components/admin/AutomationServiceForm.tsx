"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "./ImageUploadField";
import type {
  AutomationServiceRow,
  AutomationServiceInput,
  PricingType,
  ContentStatus,
} from "@/lib/supabase/types";

const PRICING_TYPES: PricingType[] = ["Custom Quote", "Monthly Retainer", "One-Time Build"];
const STATUSES: ContentStatus[] = ["Draft", "Published", "Archived"];

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const field = "w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy";
const label = "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60";

export function AutomationServiceForm({ service }: { service?: AutomationServiceRow }) {
  const router = useRouter();
  const isEditing = Boolean(service);

  const [form, setForm] = useState<AutomationServiceInput>({
    name: service?.name ?? "",
    slug: service?.slug ?? "",
    summary: service?.summary ?? "",
    description: service?.description ?? "",
    features: service?.features ?? [],
    industries: service?.industries ?? [],
    pricing_type: service?.pricing_type ?? "Custom Quote",
    images: service?.images ?? [],
    case_study: service?.case_study ?? "",
    featured: service?.featured ?? false,
    status: service?.status ?? "Draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof AutomationServiceInput>(key: K, value: AutomationServiceInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const payload = { ...form, slug: form.slug || slugify(form.name) };

    const { error: dbError } = isEditing
      ? await supabase.from("automation_services").update(payload).eq("id", service!.id)
      : await supabase.from("automation_services").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/automation-services");
    router.refresh();
  }

  async function handleDelete() {
    if (!service) return;
    if (!confirm(`Delete "${service.name}"? This can't be undone.`)) return;
    const supabase = createClient();
    await supabase.from("automation_services").delete().eq("id", service.id);
    router.push("/admin/automation-services");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Service Name *</span>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className={label}>Slug</span>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="auto-generated from name if left blank"
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className={label}>Summary (one line, shown on cards)</span>
        <input value={form.summary ?? ""} onChange={(e) => update("summary", e.target.value)} className={field} />
      </label>

      <label className="block">
        <span className={label}>Full Description</span>
        <textarea
          rows={4}
          value={form.description ?? ""}
          onChange={(e) => update("description", e.target.value)}
          className={field}
        />
      </label>

      <label className="block">
        <span className={label}>Features (comma separated)</span>
        <input
          value={form.features.join(", ")}
          onChange={(e) => update("features", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          className={field}
        />
      </label>

      <label className="block">
        <span className={label}>Industries (comma separated)</span>
        <input
          value={form.industries.join(", ")}
          onChange={(e) => update("industries", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          className={field}
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Pricing Type</span>
          <select
            value={form.pricing_type ?? ""}
            onChange={(e) => update("pricing_type", e.target.value as PricingType)}
            className={`${field} bg-white`}
          >
            {PRICING_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Status</span>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value as ContentStatus)}
            className={`${field} bg-white`}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className={label}>Case Study (optional link or note)</span>
        <input value={form.case_study ?? ""} onChange={(e) => update("case_study", e.target.value)} className={field} />
      </label>

      <ImageUploadField
        label="Image"
        value={form.images[0] ?? ""}
        onChange={(url) => update("images", url ? [url] : [])}
        folder="automation-services"
      />

      <label className="flex items-center gap-2.5 border-t border-line pt-6">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
          className="h-4 w-4 rounded border-line"
        />
        <span className="text-sm text-navy-deep">Feature on homepage</span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3 border-t border-line pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-navy-deep disabled:opacity-60"
        >
          {saving ? "Saving…" : isEditing ? "Save Changes" : "Create Service"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 rounded-full border border-red-200 px-5 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <Trash2 size={14} /> Delete
          </button>
        )}
      </div>
    </form>
  );
}
