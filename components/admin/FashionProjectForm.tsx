"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ImageUploadField } from "./ImageUploadField";
import type { FashionProjectRow, FashionProjectInput, ContentStatus } from "@/lib/supabase/types";
import { fashionCategories } from "@/lib/data/fashion";

const STATUSES: ContentStatus[] = ["Draft", "Published", "Archived"];

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const field = "w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy";
const label = "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60";

export function FashionProjectForm({ project }: { project?: FashionProjectRow }) {
  const router = useRouter();
  const isEditing = Boolean(project);

  const [form, setForm] = useState<FashionProjectInput>({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    description: project?.description ?? "",
    category: project?.category ?? fashionCategories[0],
    client_name: project?.client_name ?? "",
    images: project?.images ?? [],
    project_date: project?.project_date ?? "",
    featured: project?.featured ?? false,
    status: project?.status ?? "Draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FashionProjectInput>(key: K, value: FashionProjectInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const payload = { ...form, slug: form.slug || slugify(form.title) };

    const { error: dbError } = isEditing
      ? await supabase.from("fashion_projects").update(payload).eq("id", project!.id)
      : await supabase.from("fashion_projects").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/fashion-projects");
    router.refresh();
  }

  async function handleDelete() {
    if (!project) return;
    if (!confirm(`Delete "${project.title}"? This can't be undone.`)) return;
    const supabase = createClient();
    await supabase.from("fashion_projects").delete().eq("id", project.id);
    router.push("/admin/fashion-projects");
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
          <span className={label}>Client Name (optional)</span>
          <input value={form.client_name ?? ""} onChange={(e) => update("client_name", e.target.value)} className={field} />
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

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Category</span>
          <select
            value={form.category ?? ""}
            onChange={(e) => update("category", e.target.value)}
            className={`${field} bg-white`}
          >
            {fashionCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Date</span>
          <input
            type="date"
            value={form.project_date ?? ""}
            onChange={(e) => update("project_date", e.target.value)}
            className={field}
          />
        </label>
      </div>

      <ImageUploadField
        label="Image"
        value={form.images[0] ?? ""}
        onChange={(url) => update("images", url ? [url] : [])}
        folder="fashion-projects"
      />

      <div className="grid gap-6 sm:grid-cols-2">
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
          {saving ? "Saving…" : isEditing ? "Save Changes" : "Create Project"}
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
