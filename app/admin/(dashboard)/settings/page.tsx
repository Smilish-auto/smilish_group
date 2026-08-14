import { createClient } from "@/lib/supabase/server";
import { HeroSettingsForm } from "@/components/admin/HeroSettingsForm";
import { SiteBrandSettingsForm } from "@/components/admin/SiteBrandSettingsForm";
import { PageHeroSettingsForm } from "@/components/admin/PageHeroSettingsForm";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_content").select("key,value").in("key", [
    "site_logo",
    "homepage_hero_background",
    "page_hero_about",
    "page_hero_fashion",
    "page_hero_automation",
    "page_hero_real_estate",
  ]);

  const values = Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
  const heroBackground = values.homepage_hero_background as
    | { type?: "gradient" | "image"; image_url?: string }
    | undefined;

  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <h1 className="font-display text-2xl font-medium text-navy-deep">Settings</h1>
        <p className="mt-1 text-sm text-navy/55">
          Site-wide content and branding. Images are selected directly from your Media Library.
        </p>
      </div>

      <section>
        <h2 className="font-display text-lg font-medium text-navy-deep">Site Logo</h2>
        <p className="mt-1 text-sm text-navy/55">
          Select the logo image that should appear in the public navigation and footer.
        </p>
        <div className="mt-6 rounded-2xl border border-line bg-white p-6">
          <SiteBrandSettingsForm initialLogoUrl={typeof values.site_logo === "string" ? values.site_logo : ""} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-medium text-navy-deep">Homepage Hero Background</h2>
        <p className="mt-1 text-sm text-navy/55">
          Choose between the default gold/navy gradient or an image from the Media Library.
        </p>
        <div className="mt-6 rounded-2xl border border-line bg-white p-6">
          <HeroSettingsForm
            initialType={heroBackground?.type ?? "gradient"}
            initialImageUrl={heroBackground?.image_url ?? ""}
          />
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-medium text-navy-deep">Other Page Hero Images</h2>
        <p className="mt-1 text-sm text-navy/55">
          Set hero images for the main About, Fashion, AI Automation and Real Estate pages without editing code.
        </p>
        <div className="mt-6 space-y-5">
          <PageHeroSettingsForm pageKey="about" label="About" initialUrl={typeof values.page_hero_about === "string" ? values.page_hero_about : ""} />
          <PageHeroSettingsForm pageKey="fashion" label="Fashion" initialUrl={typeof values.page_hero_fashion === "string" ? values.page_hero_fashion : ""} />
          <PageHeroSettingsForm pageKey="automation" label="AI Automation" initialUrl={typeof values.page_hero_automation === "string" ? values.page_hero_automation : ""} />
          <PageHeroSettingsForm pageKey="real_estate" label="Real Estate" initialUrl={typeof values.page_hero_real_estate === "string" ? values.page_hero_real_estate : ""} />
        </div>
      </section>

      <p className="text-xs text-navy/40">
        Upload new images from Media Library first, then select them here. The selected URLs are stored in Supabase site content.
      </p>
    </div>
  );
}
