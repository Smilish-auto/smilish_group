import Link from "next/link";
import { Shirt, Cpu, Building2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { TriMark } from "@/components/Mark";
import { BusinessCard } from "@/components/BusinessCard";
import { ProductCard } from "@/components/ProductCard";
import { ServiceCard } from "@/components/ServiceCard";
import { PropertyCard } from "@/components/PropertyCard";
import { ProjectCard } from "@/components/ProjectCard";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { getHeroBackground } from "@/lib/supabase/site-content";
import {
  getFeaturedFashionProducts,
  getFeaturedAutomationServices,
  getFeaturedProperties,
  getFeaturedUnifiedProjects,
} from "@/lib/supabase/queries";

const businesses = [
  {
    icon: Shirt,
    name: "Smilish Fashion",
    tagline: "Identity, in cloth",
    description:
      "Custom tailoring, African wear and streetwear built to help customers express identity, confidence and culture.",
    href: "/fashion",
    accent: "gold" as const,
  },
  {
    icon: Cpu,
    name: "Smilish AI Automation",
    tagline: "Time, given back",
    description:
      "AI customer service, lead qualification and workflow automation that helps businesses run leaner and respond faster.",
    href: "/automation",
    accent: "navy" as const,
  },
  {
    icon: Building2,
    name: "Smilish Real Estate",
    tagline: "Property, made clear",
    description:
      "Land, homes and commercial property — with the information, marketing and support to move with confidence.",
    href: "/real-estate",
    accent: "ink" as const,
  },
];

const values = [
  { term: "Quality", detail: "Never sacrifice quality simply to increase volume." },
  { term: "Innovation", detail: "Use technology to solve practical problems." },
  { term: "Trust", detail: "Be transparent with customers and partners." },
  { term: "Creativity", detail: "Encourage original ideas and solutions." },
  { term: "Customer First", detail: "Design around real customer needs." },
  { term: "Long-Term Thinking", detail: "Build assets and businesses that become more valuable over time." },
];

const process = [
  { step: "01", title: "Discover", detail: "We start by understanding your goals, your customers and where the friction is." },
  { step: "02", title: "Design & Build", detail: "Our team designs and builds the outfit, system or property solution around your brief." },
  { step: "03", title: "Launch", detail: "We deliver, test and hand over — with training or fitting where it's needed." },
  { step: "04", title: "Grow", detail: "We stay close after launch, refining what we've built as your needs grow." },
];

export default async function HomePage() {
  const [heroBackground, featuredFashionProducts, featuredAutomationServices, featuredProperties, featuredProjects] =
    await Promise.all([
      getHeroBackground(),
      getFeaturedFashionProducts(),
      getFeaturedAutomationServices(),
      getFeaturedProperties(),
      getFeaturedUnifiedProjects(),
    ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep">
        <HeroBackground setting={heroBackground} />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
          <div className="animate-fade-up">
            <Eyebrow tone="light">Smilish Group — Fashion · AI Automation · Real Estate</Eyebrow>
          </div>
          <h1
            className="text-balance animate-fade-up mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.08] text-white sm:text-6xl md:text-7xl"
            style={{ animationDelay: "100ms" }}
          >
            Building Businesses.{" "}
            <span className="italic text-gold-soft">Creating Value.</span>
          </h1>
          <p
            className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            One group, three businesses — Fashion, AI Automation and Real Estate — built on
            quality, trust and long-term thinking.
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "340ms" }}
          >
            <Button href="/contact" variant="gold">
              Work With Smilish
            </Button>
            <Button href="/about" variant="ghost-light">
              Explore Our Businesses
            </Button>
          </div>
        </div>
      </section>

      {/* One Group, Three Businesses */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="One Group, Three Businesses"
          title="Different crafts. The same standard."
          description="Each Smilish business is built and run on its own, but every one is held to the same standard of quality, trust and craft."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {businesses.map((b, i) => (
            <Reveal key={b.name} delay={i * 90}>
              <BusinessCard {...b} index={`0${i + 1}`} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured — Fashion */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Smilish Fashion"
              title="Featured pieces from the atelier"
            />
            <Link
              href="/fashion/products"
              className="flex items-center gap-1.5 pb-1 text-sm font-medium text-navy hover:text-gold"
            >
              View all products <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFashionProducts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured — AI Automation */}
      <section className="bg-navy-deep py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Smilish AI Automation"
              title="Automation solutions we deploy most"
              tone="light"
            />
            <Link
              href="/automation/services"
              className="flex items-center gap-1.5 pb-1 text-sm font-medium text-white hover:text-gold-soft"
            >
              View all services <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredAutomationServices.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured — Real Estate */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Smilish Real Estate" title="Featured properties" />
            <Link
              href="/real-estate/properties"
              className="flex items-center gap-1.5 pb-1 text-sm font-medium text-navy hover:text-gold"
            >
              View all properties <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Our Work"
              title="Recent projects across the group"
            />
            <Link
              href="/projects"
              className="flex items-center gap-1.5 pb-1 text-sm font-medium text-navy hover:text-gold"
            >
              View all projects <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((p, i) => (
              <Reveal key={`${p.branch}-${p.slug}`} delay={i * 90}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Smilish */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Why Smilish"
          title="What every business under the group is held to"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.term} delay={(i % 2) * 90}>
              <div className="flex gap-5 border-b border-line pb-8">
                <TriMark className="mt-1.5 shrink-0" />
                <div>
                  <p className="font-display text-lg font-medium text-navy-deep">{v.term}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy/60">{v.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="How We Work"
            title="From first conversation to long-term partner"
            tone="light"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <p className="font-mono text-sm text-gold-soft">{p.step}</p>
                <p className="mt-3 font-display text-xl font-medium text-white">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to build something valuable with Smilish?"
        description="Whether it's a tailored outfit, an AI system for your business, or your next property move — tell us what you need."
        primaryLabel="Work With Smilish"
        secondaryHref="/about"
        secondaryLabel="Learn About Us"
      />
    </>
  );
}
