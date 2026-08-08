import type { Metadata } from "next";
import { Eyebrow } from "@/components/SectionHeading";
import { InspectionForm } from "@/components/form/InspectionForm";

export const metadata: Metadata = {
  title: "Book an Inspection",
  description: "Book a property inspection with a Smilish Real Estate agent.",
};

export default async function InspectionPage({
  searchParams,
}: {
  searchParams: Promise<{ property?: string }>;
}) {
  const { property } = await searchParams;

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Eyebrow>Smilish Real Estate</Eyebrow>
      <h1 className="mt-5 font-display text-4xl font-medium text-navy-deep sm:text-5xl">
        Book an Inspection
      </h1>
      <p className="mt-5 text-base leading-relaxed text-navy/60">
        Tell us when works for you and an agent will confirm the inspection date and time.
      </p>

      <div className="mt-10 rounded-2xl border border-line bg-mist p-6 sm:p-10">
        <InspectionForm propertyTitle={property} />
      </div>
    </section>
  );
}
