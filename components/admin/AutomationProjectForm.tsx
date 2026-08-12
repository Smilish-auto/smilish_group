"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { AutomationProjectRow, AutomationProjectInput, ContentStatus } from "@/lib/supabase/types";

const STATUSES: ContentStatus[] = ["Draft", "Published", "Archived"];

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const field = "w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus:border-navy";
const label = "mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-navy/60";

export function AutomationProjectForm({ project }: { project?: AutomationProjectRow }) {
  const router = useRouter();
  const isEditing = Boolean(project);

  const [form, setForm] = useState<AutomationProjectInput>({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    client_business: project?.client_business ?? "",
    problem: project?.problem ?? "",
    solution: project?.solution ?? "",
    workflow_tools: project?.workflow_tools ?? [],
    results: project?.results ?? [],
    screenshots: project?.screenshots ?? [],
    video_url: project?.video_url ?? "",
    project_date: project?.project_date ?? "",
    featured: project?.featured ?? false,
    status: project?.status ?? "Draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof AutomationProjectInput>(key: K, value: AutomationProjectInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const payload = { ...form, slug: form.slug || slugify(form.title) };

    const { error: dbError } = isEditing
      ? await supabase.from("automation_projects").update(payload).eq("id", project!.id)
      : await supabase.from("automation_projects").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/automation-projects");
    router.refresh();
  }

  async function handleDelete() {
    if (!project) return;
    if (!confirm(`Delete "${project.title}"? This can't be undone.`)) return;
    const supabase = createClient();
    await supabase.from("automation_projects").delete().eq("id", project.id);
    router.push("/admin/automation-projects");
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
          <span className={label}>Client / Business</span>
          <input
            value={form.client_business ?? ""}
            onChange={(e) => update("client_business", e.target.value)}
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className={label}>Problem</span>
        <textarea rows={3} value={form.problem ?? ""} onChange={(e) => update("problem", e.target.value)} className={field} />
      </label>
      <label className="block">
        <span className={label}>Solution</span>
        <textarea rows={3} value={form.solution ?? ""} onChange={(e) => update("solution", e.target.value)} className={field} />
      </label>

      <label className="block">
        <span className={label}>Tools Used (comma separated)</span>
        <input
          value={form.workflow_tools.join(", ")}
          onChange={(e) => update("workflow_tools", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          className={field}
        />
      </label>
      <label className="block">
        <span className={label}>Results (comma separated)</span>
        <input
          value={form.results.join(", ")}
          onChange={(e) => update("results", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          className={field}
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Project Date</span>
          <input
            type="date"
            value={form.project_date ?? ""}
            onChange={(e) => update("project_date", e.target.value)}
            className={field}
          />
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

      <label className="flex items-center gap-2.5 border-t border-line pt-6">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
          className="h-4 w-4 rounded border-line"
        />
        <span className="text-sm text-navy-deep">Feature as a case study</span>
      </label>

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
