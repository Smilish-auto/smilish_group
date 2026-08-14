"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MediaPicker } from "./MediaPicker";

export function SiteBrandSettingsForm({ initialLogoUrl }: { initialLogoUrl: string }) {
  const [logoUrl, setLogoUrl] = useState(initialLogoUrl);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError(null);

    const supabase = createClient();
    const { error: dbError } = await supabase.from("site_content").upsert({
      key: "site_logo",
      value: logoUrl,
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
    <div className="space-y-5">
      <MediaPicker value={logoUrl} onChange={setLogoUrl} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-navy-deep disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Logo"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-green-600">
            <Check size={15} /> Saved — it will appear across the public site.
          </span>
        )}
      </div>
    </div>
  );
}
