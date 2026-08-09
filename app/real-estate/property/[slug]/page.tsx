import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, BedDouble, Bath, Ruler, FileCheck, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { properties } from "@/lib/data/real-estate";
import { formatNaira } from "@/lib/format";
import { CTA } from "@/components/CTA";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) return {};
  return { title: property.title, description: property.description };
}

const statusStyles: Record<string, string> = {
  Available: "bg-gold text-navy-deep",
  Reserved: "bg-mist text-navy-deep",
  Sold: "bg-ink text-white",
  Rented: "bg-ink text-white",
  Unavailable: "bg-ink/60 text-white",
};

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link
          href="/real-estate/properties"
          className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy"
        >
          <ChevronLeft size={16} /> Back to Properties
        </Link>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2 lg:aspect-auto">
            <PlaceholderArt variant="real-estate" label={property.title} className="h-full w-full" patternSize="26px 26px" />
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${statusStyles[property.status]}`}
            >
              {property.status}
            </span>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-auto">
            <PlaceholderArt variant="real-estate" label="Gallery Image 2" className="h-full w-full" patternSize="26px 26px" />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-auto">
            <PlaceholderArt variant="real-estate" label="Gallery Image 3" className="h-full w-full" patternSize="26px 26px" />
          </div>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-navy/45">
              <MapPin size={13} /> {property.location}, {property.city}, {property.state}
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium text-navy-deep sm:text-4xl">
              {property.title}
            </h1>
            <p className="mt-4 font-mono text-2xl text-navy">
              {formatNaira(property.price)}
              {property.priceUnit !== "total" && (
                <span className="ml-1.5 text-sm text-navy/50">/ {property.priceUnit.replace("per ", "")}</span>
              )}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 border-y border-line py-5 text-sm text-navy/70">
              {property.bedrooms !== undefined && (
                <span className="flex items-center gap-2">
                  <BedDouble size={16} /> {property.bedrooms} Bedrooms
                </span>
              )}
              {property.bathrooms !== undefined && (
                <span className="flex items-center gap-2">
                  <Bath size={16} /> {property.bathrooms} Bathrooms
                </span>
              )}
              {(property.landSizeSqm || property.areaSqm) && (
                <span className="flex items-center gap-2">
                  <Ruler size={16} /> {property.landSizeSqm ?? property.areaSqm} sqm
                </span>
              )}
              <span className="flex items-center gap-2">
                <FileCheck size={16} /> {property.documentation}
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-navy/65">{property.description}</p>

            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Features</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {property.features.map((f) => (
                  <span key={f} className="rounded-full bg-mist px-3 py-1.5 text-xs text-navy-deep">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-mist p-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-navy/40">Agent</p>
            <p className="mt-2 font-display text-lg font-medium text-navy-deep">{property.agentName}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-navy/60">
              <Phone size={14} /> {property.agentPhone}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button href="/real-estate/inspection" variant="navy" className="w-full">
                Book Inspection
              </Button>
              <Button href="/contact" variant="ghost-dark" className="w-full">
                Contact Agent
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <CTA
        eyebrow="Smilish Real Estate"
        title="Want to see this property in person?"
        description="Book an inspection and one of our agents will confirm a time that works for you."
        primaryHref="/real-estate/inspection"
        primaryLabel="Book Inspection"
      />
    </>
  );
}
