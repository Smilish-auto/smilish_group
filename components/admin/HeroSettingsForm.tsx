"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MediaPicker } from "./MediaPicker";

type BackgroundType = "gradient" | "image";

export function HeroSettingsForm({
  initialType,
  initialImageUrl,
}: {
  initialType: BackgroundType;
  initialImageUrl: string;
}) {
  const [type, setType] = useState<BackgroundType>(initialType);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    const { error: dbError } = await supabase.from("site_content").upsert({
      key: "homepage_hero_background",
      value: { type, image_url: imageUrl },
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
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setType("gradient")}
          className={`flex-1 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
            type === "gradient" ? "border-navy bg-navy/5 text-navy-deep" : "border-line text-navy/60"
          }`}
        >
          <span className="font-medium">Gradient (default)</span>
          <p className="mt-0.5 text-xs text-navy/50">Gold/navy glow — no photo needed.</p>
        </button>
        <button
          type="button"
          onClick={() => setType("image")}
          className={`flex-1 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
            type === "image" ? "border-navy bg-navy/5 text-navy-deep" : "border-line text-navy/60"
          }`}
        >
          <span className="font-medium">Photo</span>
          <p className="mt-0.5 text-xs text-navy/50">Upload an image to use behind the headline.</p>
        </button>
      </div>

      {type === "image" && (
        <div className="space-y-2">
          <span className="block font-mono text-xs uppercase tracking-[0.1em] text-navy/60">Hero Image</span>
          <MediaPicker value={imageUrl} onChange={setImageUrl} />
          <p className="text-xs text-navy/45">Choose an image that has already been uploaded to Media Library.</p>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || (type === "image" && !imageUrl)}
          className="rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-navy-deep disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-green-600">
            <Check size={15} /> Saved — refresh the homepage to see it
          </span>
        )}
      </div>
    </div>
  );
}
