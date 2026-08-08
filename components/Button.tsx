import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "gold" | "navy" | "ghost-light" | "ghost-dark";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-navy-deep hover:bg-gold-soft",
  navy: "bg-navy text-white hover:bg-navy-deep",
  "ghost-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
  "ghost-dark": "border border-navy/30 text-navy hover:border-navy hover:bg-navy/5",
};

export function Button({
  href,
  children,
  variant = "gold",
  className = "",
  onClick,
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium tracking-wide transition-colors duration-200";
  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
