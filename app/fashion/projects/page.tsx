import type { Metadata } from "next";
import { Eyebrow } from "@/components/SectionHeading";
import { fashionProjects } from "@/lib/data/fashion";

export const metadata: Metadata = {
  title: "Fashion Projects",
  description: "Recent tailoring, styling and staff uniform projects from Smilish Fashion.",
};

export default function FashionProjectsPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <Eyebrow>Smilish Fashion</Eyebrow>
      <h1 className="mt-5 font-display text-4xl font-medium text-navy-deep sm:text-5xl">Projects</h1>

      <div className="mt-12 divide-y divide-line border-t border-line">
        {fashionProjects.map((p) => (
          <article key={p.slug} id={p.slug} className="scroll-mt-24 py-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-gold/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-gold">
                {p.category}
              </span>
              <span className="font-mono text-xs text-navy/40">
                {new Date(p.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-medium text-navy-deep">{p.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy/65">{p.description}</p>
            {p.clientName && (
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-navy/40">
                {p.clientName}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
