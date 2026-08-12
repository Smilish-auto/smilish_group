import { createClient } from "@/lib/supabase/server";
import { HeroSettingsForm } from "@/components/admin/HeroSettingsForm";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "homepage_hero_background")
    .maybeSingle();

  const heroBackground = data?.value as { type?: "gradient" | "image"; image_url?: string } | undefined;

  return (
    <div className="max-w-2xl space-y-12">
      <div>
        <h1 className="font-display text-2xl font-medium text-navy-deep">Settings</h1>
        <p className="mt-1 text-sm text-navy/55">
          Site-wide content that doesn&apos;t belong to any single product or listing.
        </p>
      </div>

      <section>
        <h2 className="font-display text-lg font-medium text-navy-deep">Homepage Hero Background</h2>
        <p className="mt-1 text-sm text-navy/55">
          Choose between the default gold/navy gradient or upload a photo to use behind the
          homepage headline.
        </p>
        <div className="mt-6 rounded-2xl border border-line bg-white p-6">
          <HeroSettingsForm
            initialType={heroBackground?.type ?? "gradient"}
            initialImageUrl={heroBackground?.image_url ?? ""}
          />
        </div>
      </section>

      <p className="text-xs text-navy/40">
        More site settings (contact details, about text, footer) are on the way — for now those
        still live directly in the code.
      </p>
    </div>
  );
}
