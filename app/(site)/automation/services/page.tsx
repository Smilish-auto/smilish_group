import type { Metadata } from "next";
import { Eyebrow } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { automationServices } from "@/lib/data/automation";

export const metadata: Metadata = {
  title: "Automation Services",
  description: "AI customer service, sales, booking and knowledge assistant products from Smilish AI Automation.",
};

export default function AutomationServicesPage() {
  return (
    <section className="bg-navy-deep py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow tone="light">Smilish AI Automation</Eyebrow>
        <h1 className="mt-5 font-display text-4xl font-medium text-white sm:text-5xl">Services</h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {automationServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
