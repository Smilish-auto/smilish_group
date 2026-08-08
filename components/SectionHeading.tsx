import { TriMark } from "./Mark";

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex items-center gap-3">
      <TriMark />
      <span
        className={`font-mono text-xs uppercase tracking-[0.22em] ${
          tone === "light" ? "text-gold-soft" : "text-navy/70"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`text-balance mt-4 font-display text-3xl font-medium leading-[1.15] sm:text-4xl md:text-[2.75rem] ${
          tone === "light" ? "text-white" : "text-navy-deep"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            tone === "light" ? "text-white/70" : "text-navy/65"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
