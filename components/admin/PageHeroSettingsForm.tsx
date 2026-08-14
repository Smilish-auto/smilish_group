"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MediaPicker } from "./MediaPicker";

export function PageHeroSettingsForm({
  pageKey,
  label,
  initialUrl,
}: {
  pageKey: "about" | "fashion" | "automation" | "real_estate";
  label: string;
  initialUrl: string;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setSaved(false);
    setError(null);
    const supabase = createClient();
    const { error: dbError } = await supabase.from("site_content").upsert({
      key: `page_hero_${pageKey}`,
      value: url,
    });
    setSaving(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-display text-base font-medium text-navy-deep">{label}</h3>
      <p className="mt-1 text-xs text-navy/50">Choose the hero image for this public page.</p>
      <div className="mt-4">
        <MediaPicker value={url} onChange={setUrl} />
      </div>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-full bg-navy px-5 py-2 text-sm font-medium text-white hover:bg-navy-deep disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-green-600">
            <Check size={14} /> Saved
          </span>
        )}
      </div>
    </div>
  );
}
