import type { Metadata } from "next";
import { Shirt, Cpu, Building2 } from "lucide-react";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { BusinessCard } from "@/components/BusinessCard";
import { TriMark } from "@/components/Mark";
import { CTA } from "@/components/CTA";

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
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
          <Eyebrow tone="light">Our Story</Eyebrow>
          <h1 className="text-balance mt-6 font-display text-4xl font-medium leading-[1.1] text-white sm:text-5xl md:text-6xl">
            One founder&apos;s belief that businesses should outlive the founder.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Smilish Group began as a single idea: that quality, trust and long-term thinking could
            hold together very different businesses — a tailoring house, an AI automation studio and
            a real estate practice — under one standard. Each business is built to solve a real
            problem for real customers, and to keep creating value long after the first sale.
          </p>
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
