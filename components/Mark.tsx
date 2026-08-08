export function Monogram({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const stroke = tone === "light" ? "#F7F8FA" : "#0B1F3A";
  const accent = "#D4AF37";
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Smilish Group monogram"
    >
      <path
        d="M28 11.5C25.8 9.3 22.9 8 19.6 8 13.7 8 9 12.3 9 18c0 4.6 3.2 7.4 8.4 8.8l3 .8c3.1.8 4.6 1.9 4.6 3.9 0 2.3-2.2 3.9-5.4 3.9-3.4 0-6-1.5-7.9-4.1"
        fill="none"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M31.5 15v6.2h-7.3"
        fill="none"
        stroke={accent}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 15c-2.1-2.6-5.2-4.2-8.7-4.2"
        fill="none"
        stroke={accent}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Recurring signature motif: three bars (Navy / Black / Gold) standing for
 * Fashion, AI Automation and Real Estate under one group.
 */
export function TriMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex h-4 items-end gap-[3px] ${className}`} aria-hidden="true">
      <span className="h-2.5 w-[3px] bg-navy" />
      <span className="h-4 w-[3px] bg-ink" />
      <span className="h-3 w-[3px] bg-gold" />
    </span>
  );
}
