import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Ruler, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { ProjectCard } from "@/components/ProjectCard";
import { CustomDesignForm } from "@/components/form/CustomDesignForm";
import { CTA } from "@/components/CTA";
import { GlossyBackdrop } from "@/components/GlossyBackdrop";
import { fashionCategories, featuredFashionProducts } from "@/lib/data/fashion";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Smilish Fashion",
  description:
    "Custom tailoring, African wear, streetwear and corporate wear — quality clothing that helps you express identity, confidence and culture.",
};

const whySmilish = [
  { icon: Ruler, title: "Made to Measure", detail: "Every custom piece is cut to your exact measurements, not a standard size chart." },
  { icon: ShieldCheck, title: "Quality Materials", detail: "We source fabric first and never substitute quality to hit a lower price." },
  { icon: Sparkles, title: "Culture-Forward Design", detail: "Every collection is rooted in African design language, reimagined for today." },
];

export default function FashionHubPage() {
  const fashionProjects = projects.filter((p) => p.branch === "Fashion").slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep">
        <GlossyBackdrop />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Eyebrow tone="light">Smilish Fashion</Eyebrow>
          <h1 className="text-balance mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.1] text-white sm:text-6xl">
            Clothing that carries <span className="italic text-gold-soft">identity</span>, not just fit.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Custom tailoring, African wear, streetwear and corporate wear — designed and cut to help
            you show up as exactly who you are.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/fashion/products" variant="gold">
              Shop Products
            </Button>
            <Button href="#custom-design" variant="ghost-light">
              Start a Custom Design
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Eyebrow>Categories</Eyebrow>
        <div className="mt-6 flex flex-wrap gap-3">
          {fashionCategories.map((c) => (
            <Link
              key={c}
              href={`/fashion/products?category=${encodeURIComponent(c)}`}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-navy-deep transition-colors hover:border-gold hover:text-gold"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Featured Products" title="From the current collection" />
          <Link
            href="/fashion/products"
            className="flex items-center gap-1.5 pb-1 text-sm font-medium text-navy hover:text-gold"
          >
            View all products <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredFashionProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Custom Design */}
      <section id="custom-design" className="bg-mist py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Custom Design"
              title="Tell us what you're envisioning"
              description="Fill in your details and our tailoring team will follow up to confirm measurements, fabric and delivery timeline."
            />
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-10">
            <CustomDesignForm />
          </div>
        </div>
      </section>

      {/* Our Work */}
      {fashionProjects.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Our Work" title="Recent tailoring & styling projects" />
            <Link
              href="/fashion/projects"
              className="flex items-center gap-1.5 pb-1 text-sm font-medium text-navy hover:text-gold"
            >
              View all projects <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fashionProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Why Smilish */}
      <section className="bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="Why Smilish Fashion" title="What every piece is held to" tone="light" />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {whySmilish.map((w) => (
              <div key={w.title}>
                <w.icon size={22} className="text-gold-soft" />
                <p className="mt-4 font-display text-lg font-medium text-white">{w.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{w.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Work With Smilish Fashion"
        title="Ready for your next custom piece?"
        primaryLabel="Start a Custom Design"
        primaryHref="#custom-design"
        secondaryHref="/fashion/products"
        secondaryLabel="Browse Products"
      />
    </>
  );
}
