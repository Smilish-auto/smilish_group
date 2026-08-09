import { Shirt, Cpu, Building2, type LucideIcon } from "lucide-react";

type Variant = "fashion" | "automation" | "real-estate";

const variants: Record<
  Variant,
  { icon: LucideIcon; gradient: string; pattern: string; iconColor: string }
> = {
  fashion: {
    icon: Shirt,
    gradient: "linear-gradient(135deg, #0B1F3A 0%, #142C4F 45%, #3A2E12 100%)",
    pattern:
      "repeating-linear-gradient(45deg, rgba(212,175,55,0.09) 0px, rgba(212,175,55,0.09) 1px, transparent 1px, transparent 14px)",
    iconColor: "#E6C75A",
  },
  automation: {
    icon: Cpu,
    gradient: "linear-gradient(135deg, #061426 0%, #0B1F3A 55%, #12345C 100%)",
    pattern:
      "linear-gradient(rgba(230,199,90,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(230,199,90,0.08) 1px, transparent 1px)",
    iconColor: "#E6C75A",
  },
  "real-estate": {
    icon: Building2,
    gradient: "linear-gradient(135deg, #0B1F3A 0%, #1B3358 50%, #061426 100%)",
    pattern:
      "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
    iconColor: "#F7F8FA",
  },
};

/**
 * Stand-in for real photography. Every business here needs its own product,
 * property or team photos eventually — this renders a considered, on-brand
 * gradient treatment in the meantime rather than a flat box or a random
 * unrelated stock photo.
 */
export function PlaceholderArt({
  variant,
  label,
  className = "",
  patternSize = "22px 22px",
}: {
  variant: Variant;
  label: string;
  className?: string;
  patternSize?: string;
}) {
  const v = variants[variant];
  const Icon = v.icon;
  return (
    <div
      className={`group relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: v.gradient }}
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
        style={{ backgroundImage: v.pattern, backgroundSize: patternSize }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <Icon size={26} style={{ color: v.iconColor }} strokeWidth={1.5} />
        <span
          className="font-display text-sm italic leading-snug"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
