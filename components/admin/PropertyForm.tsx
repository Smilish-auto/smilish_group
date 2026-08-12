"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "./ImageUploadField";
import type {
  PropertyRow,
  PropertyInput,
  PropertyType,
  TransactionType,
  PropertyStatus,
} from "@/lib/supabase/types";

const PROPERTY_TYPES: PropertyType[] = ["Land", "House", "Apartment", "Office", "Shop", "Commercial", "Estate"];
const TRANSACTION_TYPES: TransactionType[] = ["For Sale", "For Rent", "Lease", "Investment"];
const STATUSES: PropertyStatus[] = ["Available", "Reserved", "Sold", "Rented", "Unavailable"];

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const field = "w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy";
const label = "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60";

export function PropertyForm({ property }: { property?: PropertyRow }) {
  const router = useRouter();
  const isEditing = Boolean(property);

  const [form, setForm] = useState<PropertyInput>({
    title: property?.title ?? "",
    slug: property?.slug ?? "",
    description: property?.description ?? "",
    price: property?.price ?? 0,
    price_unit: property?.price_unit ?? "total",
    location: property?.location ?? "",
    state: property?.state ?? "",
    city: property?.city ?? "",
    area_sqm: property?.area_sqm ?? null,
    property_type: property?.property_type ?? "House",
    transaction_type: property?.transaction_type ?? "For Sale",
    bedrooms: property?.bedrooms ?? null,
    bathrooms: property?.bathrooms ?? null,
    land_size_sqm: property?.land_size_sqm ?? null,
    features: property?.features ?? [],
    property_images: property?.property_images ?? [],
    floor_plan: property?.floor_plan ?? "",
    video_url: property?.video_url ?? "",
    latitude: property?.latitude ?? null,
    longitude: property?.longitude ?? null,
    documentation_status: property?.documentation_status ?? "",
    agent_name: property?.agent_name ?? "",
    agent_phone: property?.agent_phone ?? "",
    status: property?.status ?? "Available",
    featured: property?.featured ?? false,
    published: property?.published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof PropertyInput>(key: K, value: PropertyInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const payload = { ...form, slug: form.slug || slugify(form.title) };

    const { error: dbError } = isEditing
      ? await supabase.from("properties").update(payload).eq("id", property!.id)
      : await supabase.from("properties").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/properties");
    router.refresh();
  }

  async function handleDelete() {
    if (!property) return;
    if (!confirm(`Delete "${property.title}"? This can't be undone.`)) return;
    const supabase = createClient();
    await supabase.from("properties").delete().eq("id", property.id);
    router.push("/admin/properties");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Title *</span>
          <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className={label}>Slug</span>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="auto-generated from title if left blank"
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className={label}>Description</span>
        <textarea
          rows={4}
          value={form.description ?? ""}
          onChange={(e) => update("description", e.target.value)}
          className={field}
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-3">
        <label className="block">
          <span className={label}>Price (₦) *</span>
          <input
            required
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className={field}
          />
        </label>
        <label className="block">
          <span className={label}>Price Unit</span>
          <select
            value={form.price_unit}
            onChange={(e) => update("price_unit", e.target.value as PropertyInput["price_unit"])}
            className={`${field} bg-white`}
          >
            <option value="total">Total</option>
            <option value="per year">Per Year</option>
            <option value="per month">Per Month</option>
          </select>
        </label>
        <label className="block">
          <span className={label}>Status</span>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value as PropertyStatus)}
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

      <div className="grid gap-6 sm:grid-cols-3">
        <label className="block">
          <span className={label}>Location</span>
          <input value={form.location ?? ""} onChange={(e) => update("location", e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className={label}>City</span>
          <input value={form.city ?? ""} onChange={(e) => update("city", e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className={label}>State</span>
          <input value={form.state ?? ""} onChange={(e) => update("state", e.target.value)} className={field} />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Property Type</span>
          <select
            value={form.property_type ?? ""}
            onChange={(e) => update("property_type", e.target.value as PropertyType)}
            className={`${field} bg-white`}
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Transaction Type</span>
          <select
            value={form.transaction_type ?? ""}
            onChange={(e) => update("transaction_type", e.target.value as TransactionType)}
            className={`${field} bg-white`}
          >
            {TRANSACTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-4">
        <label className="block">
          <span className={label}>Bedrooms</span>
          <input
            type="number"
            min={0}
            value={form.bedrooms ?? ""}
            onChange={(e) => update("bedrooms", e.target.value ? Number(e.target.value) : null)}
            className={field}
          />
        </label>
        <label className="block">
          <span className={label}>Bathrooms</span>
          <input
            type="number"
            min={0}
            value={form.bathrooms ?? ""}
            onChange={(e) => update("bathrooms", e.target.value ? Number(e.target.value) : null)}
            className={field}
          />
        </label>
        <label className="block">
          <span className={label}>Land Size (sqm)</span>
          <input
            type="number"
            min={0}
            value={form.land_size_sqm ?? ""}
            onChange={(e) => update("land_size_sqm", e.target.value ? Number(e.target.value) : null)}
            className={field}
          />
        </label>
        <label className="block">
          <span className={label}>Area (sqm)</span>
          <input
            type="number"
            min={0}
            value={form.area_sqm ?? ""}
            onChange={(e) => update("area_sqm", e.target.value ? Number(e.target.value) : null)}
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className={label}>Features (comma separated)</span>
        <input
          value={form.features.join(", ")}
          onChange={(e) => update("features", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          className={field}
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Documentation Status</span>
          <input
            value={form.documentation_status ?? ""}
            onChange={(e) => update("documentation_status", e.target.value)}
            placeholder="e.g. Certificate of Occupancy"
            className={field}
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Agent Name</span>
          <input value={form.agent_name ?? ""} onChange={(e) => update("agent_name", e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className={label}>Agent Phone</span>
          <input value={form.agent_phone ?? ""} onChange={(e) => update("agent_phone", e.target.value)} className={field} />
        </label>
      </div>

      <ImageUploadField
        label="Main Photo"
        value={form.property_images[0] ?? ""}
        onChange={(url) => update("property_images", url ? [url, ...form.property_images.slice(1)] : form.property_images.slice(1))}
        folder="properties"
      />

      <div className="flex flex-wrap items-center gap-6 border-t border-line pt-6">
        <label className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 rounded border-line"
          />
          <span className="text-sm text-navy-deep">Feature on homepage</span>
        </label>
        <label className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
            className="h-4 w-4 rounded border-line"
          />
          <span className="text-sm text-navy-deep">Published (visible to the public)</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3 border-t border-line pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-navy-deep disabled:opacity-60"
        >
          {saving ? "Saving…" : isEditing ? "Save Changes" : "Create Property"}
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
