import type { Metadata } from "next";
import { Eyebrow } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { getAutomationServices } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Automation Services",
  description: "AI customer service, sales, booking and knowledge assistant products from Smilish AI Automation.",
};

export default async function AutomationServicesPage() {
  const automationServices = await getAutomationServices();

  return (
    <section className="bg-navy-deep py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow tone="light">Smilish AI Automation</Eyebrow>
        <h1 className="mt-5 font-display text-4xl font-medium text-white sm:text-5xl">Services</h1>
        {automationServices.length === 0 && (
          <p className="mt-10 text-sm text-white/50">No services published yet — check back soon.</p>
        )}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {automationServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
