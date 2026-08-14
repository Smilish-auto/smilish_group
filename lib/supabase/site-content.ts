import { createClient } from "./server";

export interface HeroBackgroundSetting {
  type: "gradient" | "image";
  image_url?: string;
}

export type SiteHeroKey =
  | "about"
  | "fashion"
  | "automation"
  | "real_estate";

const DEFAULT_HERO_BACKGROUND: HeroBackgroundSetting = { type: "gradient" };

export async function getHeroBackground(): Promise<HeroBackgroundSetting> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_content")
      .select("value")
      .eq("key", "homepage_hero_background")
      .maybeSingle();

    if (data?.value && typeof data.value === "object") {
      return { ...DEFAULT_HERO_BACKGROUND, ...(data.value as HeroBackgroundSetting) };
    }
  } catch {
    // Safe fallback when Supabase is unavailable.
  }
  return DEFAULT_HERO_BACKGROUND;
}

export async function getSiteLogo(): Promise<string> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_content").select("value").eq("key", "site_logo").maybeSingle();
    return typeof data?.value === "string" ? data.value : "";
  } catch {
    return "";
  }
}

export async function getPageHeroImage(key: SiteHeroKey): Promise<string> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_content")
      .select("value")
      .eq("key", `page_hero_${key}`)
      .maybeSingle();
    return typeof data?.value === "string" ? data.value : "";
  } catch {
    return "";
  }
}
