import { GlossyBackdrop } from "./GlossyBackdrop";
import type { HeroBackgroundSetting } from "@/lib/supabase/site-content";

export function HeroBackground({ setting }: { setting: HeroBackgroundSetting }) {
  if (setting.type === "image" && setting.image_url) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={setting.image_url} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy-deep/50" />
      </div>
    );
  }
  return <GlossyBackdrop />;
}
