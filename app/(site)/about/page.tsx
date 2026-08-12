import type { Metadata } from "next";
import { Shirt, Cpu, Building2 } from "lucide-react";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { BusinessCard } from "@/components/BusinessCard";
import { TriMark } from "@/components/Mark";
import { CTA } from "@/components/CTA";
import { GlossyBackdrop } from "@/components/GlossyBackdrop";

export const metadata: Metadata = {
  title: "About",
  description:
    "Smilish Group's story, mission, vision and values — and the leadership building a business group across fashion, AI automation and real estate.",
};

const values = [
  { term: "Quality", detail: "Never sacrifice quality simply to increase volume." },
  { term: "Innovation", detail: "Use technology to solve practical problems." },
  { term: "Trust", detail: "Be transparent with customers and partners." },
  { term: "Creativity", detail: "Encourage original ideas and solutions." },
  { term: "Customer First", detail: "Design around real customer needs." },
  { term: "Long-Term Thinking", detail: "Build assets and businesses that become more valuable over time." },
];

const milestones = [
  { year: "Year 1", title: "Smilish Fashion founded", detail: "Started as a made-to-order tailoring house, one custom piece at a time." },
  { year: "Year 2", title: "Smilish AI Automation launched", detail: "Built the first AI customer service agent for a food ordering business." },
  { year: "Year 3", title: "Smilish Real Estate opened", detail: "Began marketing and managing property listings across Lagos and Abuja." },
  { year: "Today", title: "One group, three businesses", detail: "Operating under a single standard of quality, trust and long-term value." },
];

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

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep">
        <GlossyBackdrop />
        <div className="relative mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="animate-fade-up">
            <Eyebrow tone="light">Our Story</Eyebrow>
          </div>
          <h1
            className="text-balance animate-fade-up mt-6 font-display text-4xl font-medium leading-[1.1] text-white sm:text-5xl md:text-6xl"
            style={{ animationDelay: "100ms" }}
          >
            One founder&apos;s belief that businesses should outlive the founder.
          </h1>
          <p
            className="animate-fade-up mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            Smilish Group began as a single idea: that quality, trust and long-term thinking could
            hold together very different businesses — a tailoring house, an AI automation studio and
            a real estate practice — under one standard. Each business is built to solve a real
            problem for real customers, and to keep creating value long after the first sale.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
            What ties Smilish Fashion, Smilish AI Automation and Smilish Real Estate together isn&apos;t
            the products — it&apos;s the standard. The same discipline that goes into cutting a clean
            agbada goes into shipping a reliable AI agent and into vetting a property&apos;s
            documentation before it ever reaches a listing page.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Eyebrow>How We Got Here</Eyebrow>
        <div className="mt-10 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m) => (
            <div key={m.title}>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">{m.year}</p>
              <p className="mt-3 font-display text-lg font-medium text-navy-deep">{m.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-8">
          <Eyebrow>Mission</Eyebrow>
          <p className="mt-5 font-display text-2xl font-medium leading-snug text-navy-deep">
            To build valuable businesses, products and services that solve real problems, improve
            people&apos;s lives and create long-term economic value.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-mist p-8">
          <Eyebrow>Vision</Eyebrow>
          <p className="mt-5 font-display text-2xl font-medium leading-snug text-navy-deep">
            To grow Smilish Group into a respected African business group operating across fashion,
            technology and real estate — with businesses that can operate beyond the founder.
          </p>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="Our Values" title="What holds every business to the same standard" />
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.term} className="flex gap-5 border-b border-line pb-8">
                <TriMark className="mt-1.5 shrink-0" />
                <div>
                  <p className="font-display text-lg font-medium text-navy-deep">{v.term}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy/60">{v.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Our Businesses" title="Three businesses, one group" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {businesses.map((b, i) => (
            <BusinessCard key={b.name} {...b} index={`0${i + 1}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="grid gap-10 rounded-2xl border border-line bg-white p-8 sm:p-12 md:grid-cols-2">
          <div>
            <Eyebrow>Leadership</Eyebrow>
            <p className="mt-5 text-base leading-relaxed text-navy/70">
              Smilish Group is led by a small, hands-on team spanning design, engineering and
              operations — each business run by people close to the work, with the founder setting
              the standard across the group.
            </p>
          </div>
          <div>
            <Eyebrow>Future Vision</Eyebrow>
            <p className="mt-5 text-base leading-relaxed text-navy/70">
              The next chapter is scale without losing craft — growing each business into a category
              leader in its own right, while staying disciplined about quality, trust and long-term
              value creation.
            </p>
          </div>
        </div>
      </section>

      <CTA
        title="Want to build with Smilish Group?"
        description="Tell us which business you're interested in and what you're trying to achieve."
      />
    </>
  );
}
