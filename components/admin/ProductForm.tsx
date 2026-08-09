"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "./ImageUploadField";
import type { FashionProductRow, FashionProductInput, ProductStatus } from "@/lib/supabase/types";

const STATUSES: ProductStatus[] = ["Draft", "Published", "Out of Stock", "Archived"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductForm({ product }: { product?: FashionProductRow }) {
  const router = useRouter();
  const isEditing = Boolean(product);

  const [form, setForm] = useState<FashionProductInput>({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    discount: product?.discount ?? null,
    category: product?.category ?? "",
    fabric: product?.fabric ?? "",
    sizes: product?.sizes ?? [],
    colors: product?.colors ?? [],
    stock_quantity: product?.stock_quantity ?? 0,
    sku: product?.sku ?? "",
    main_image: product?.main_image ?? "",
    gallery_images: product?.gallery_images ?? [],
    featured: product?.featured ?? false,
    status: product?.status ?? "Draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FashionProductInput>(key: K, value: FashionProductInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const payload = { ...form, slug: form.slug || slugify(form.name) };

    const { error: dbError } = isEditing
      ? await supabase.from("fashion_products").update(payload).eq("id", product!.id)
      : await supabase.from("fashion_products").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/fashion-products");
    router.refresh();
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    const supabase = createClient();
    await supabase.from("fashion_products").delete().eq("id", product.id);
    router.push("/admin/fashion-products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
            Product Name *
          </span>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
            Slug
          </span>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="auto-generated from name if left blank"
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
          Description
        </span>
        <textarea
          rows={4}
          value={form.description ?? ""}
          onChange={(e) => update("description", e.target.value)}
          className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
            Price (₦) *
          </span>
          <input
            required
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
            Category
          </span>
          <input
            value={form.category ?? ""}
            onChange={(e) => update("category", e.target.value)}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
            Fabric
          </span>
          <input
            value={form.fabric ?? ""}
            onChange={(e) => update("fabric", e.target.value)}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
            Sizes (comma separated)
          </span>
          <input
            value={form.sizes.join(", ")}
            onChange={(e) => update("sizes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
            Colors (comma separated)
          </span>
          <input
            value={form.colors.join(", ")}
            onChange={(e) => update("colors", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
            Stock Quantity
          </span>
          <input
            type="number"
            min={0}
            value={form.stock_quantity}
            onChange={(e) => update("stock_quantity", Number(e.target.value))}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
          />
        </label>
      </div>

      <label className="block max-w-xs">
        <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
          SKU
        </span>
        <input
          value={form.sku ?? ""}
          onChange={(e) => update("sku", e.target.value)}
          className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy"
        />
      </label>

      <ImageUploadField
        label="Main Image"
        value={form.main_image ?? ""}
        onChange={(url) => update("main_image", url)}
        folder="fashion-products"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">
            Status
          </span>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value as ProductStatus)}
            className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-navy"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2.5 pt-7">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 rounded border-line"
          />
          <span className="text-sm text-navy-deep">Feature on homepage</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3 border-t border-line pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-navy-deep disabled:opacity-60"
        >
          {saving ? "Saving…" : isEditing ? "Save Changes" : "Create Product"}
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
