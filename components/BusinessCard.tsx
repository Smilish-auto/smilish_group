import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type Accent = "gold" | "navy" | "ink";

const accentStyles: Record<Accent, { bg: string; text: string; ring: string }> = {
  gold: { bg: "bg-gold/10", text: "text-gold", ring: "group-hover:border-gold/50" },
  navy: { bg: "bg-navy/10", text: "text-navy", ring: "group-hover:border-navy/50" },
  ink: { bg: "bg-ink/10", text: "text-ink", ring: "group-hover:border-ink/40" },
};

export function BusinessCard({
  icon: Icon,
  name,
  tagline,
  description,
  href,
  accent,
  index,
}: {
  icon: LucideIcon;
  name: string;
  tagline: string;
  description: string;
  href: string;
  accent: Accent;
  index: string;
}) {
  const styles = accentStyles[accent];
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-25px_rgba(11,31,58,0.4)] ${styles.ring}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className={`grid h-11 w-11 place-items-center rounded-xl ${styles.bg} ${styles.text}`}>
            <Icon size={20} />
          </span>
          <span className="font-mono text-xs text-navy/30">{index}</span>
        </div>
        <h3 className="mt-6 font-display text-2xl font-medium text-navy-deep">{name}</h3>
        <p className={`mt-1.5 font-mono text-xs uppercase tracking-[0.1em] ${styles.text}`}>
          {tagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-navy/60">{description}</p>
      </div>
      <div className="mt-8 flex items-center gap-2 text-sm font-medium text-navy-deep">
        Explore {name.replace("Smilish ", "")}
        <ArrowUpRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  );
}
