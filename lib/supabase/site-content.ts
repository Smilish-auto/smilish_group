import { createClient } from "./server";

export interface HeroBackgroundSetting {
  type: "gradient" | "image";
  image_url?: string;
}

const DEFAULT_HERO_BACKGROUND: HeroBackgroundSetting = { type: "gradient" };

/**
 * Reads the admin-configured homepage hero background. Falls back to the
 * default gold/navy gradient if Supabase isn't reachable yet or the setting
 * has never been saved — so the site never breaks because of this.
 */
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
    // Supabase env vars not set yet, or the table doesn't exist — safe fallback.
  }
  return DEFAULT_HERO_BACKGROUND;
}
