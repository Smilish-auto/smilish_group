import { Button } from "./Button";
import { TriMark } from "./Mark";
import { GlossyBackdrop } from "./GlossyBackdrop";

export function CTA({
  eyebrow = "Work With Smilish",
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Start a Conversation",
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <GlossyBackdrop />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <div className="flex justify-center">
          <TriMark />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-gold-soft">
          {eyebrow}
        </p>
        <h2 className="text-balance mt-4 font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65">
            {description}
          </p>
        )}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={primaryHref} variant="gold">
            {primaryLabel}
          </Button>
          {secondaryHref && secondaryLabel && (
            <Button href={secondaryHref} variant="ghost-light">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
