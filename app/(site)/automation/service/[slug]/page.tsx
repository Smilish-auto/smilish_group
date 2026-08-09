import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import { automationServices } from "@/lib/data/automation";
import { CTA } from "@/components/CTA";

export function generateStaticParams() {
  return automationServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = automationServices.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.name, description: service.summary };
}

export default async function AutomationServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = automationServices.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <section className="bg-navy-deep py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Link
            href="/automation/services"
            className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white"
          >
            <ChevronLeft size={16} /> Back to Services
          </Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-gold-soft">
            {service.pricingType}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium text-white sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {service.description}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-12 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Features</p>
          <ul className="mt-4 space-y-3">
            {service.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-navy-deep">
                <Check size={16} className="mt-0.5 shrink-0 text-gold" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Built For</p>
          <ul className="mt-4 space-y-3">
            {service.industries.map((i) => (
              <li key={i} className="text-sm text-navy-deep">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA
        eyebrow="Smilish AI Automation"
        title={`Ready to deploy the ${service.name}?`}
        description="Tell us about your business and we'll scope this out for you."
        primaryHref="/automation#audit"
        primaryLabel="Request a Free Audit"
      />
    </>
  );
}
