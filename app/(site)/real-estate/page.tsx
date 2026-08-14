import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Search, ShieldCheck, MapPinned } from "lucide-react";
import { Button } from "@/components/Button";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { PropertyCard } from "@/components/PropertyCard";
import { CTA } from "@/components/CTA";
import { getPageHeroImage } from "@/lib/supabase/site-content";
import { HeroBackground } from "@/components/HeroBackground";
import { getFeaturedProperties, getPropertyFilterOptions } from "@/lib/supabase/queries";

const PROPERTY_TYPES = ["Land", "House", "Apartment", "Office", "Shop", "Commercial", "Estate"];

export const metadata: Metadata = {
  title: "Smilish Real Estate",
  description:
    "Property sales, rentals, land and commercial property — with the information, marketing and support to move with confidence.",
};

const whySmilish = [
  { icon: Search, title: "Clear Information", detail: "Every listing shows real specs, documentation status and pricing up front." },
  { icon: ShieldCheck, title: "Verified Documentation", detail: "We only list properties with documentation we can confirm and explain to you." },
  { icon: MapPinned, title: "Local Expertise", detail: "Our agents know these neighbourhoods and will walk the property with you." },
];

export default async function RealEstateHubPage() {
  const heroImage = await getPageHeroImage("real_estate");
  const [featuredProperties, filterOptions] = await Promise.all([
    getFeaturedProperties(),
    getPropertyFilterOptions(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep">
        <HeroBackground setting={{ type: heroImage ? "image" : "gradient", image_url: heroImage || undefined }} />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="animate-fade-up">
            <Eyebrow tone="light">Smilish Real Estate</Eyebrow>
          </div>
          <h1
            className="text-balance animate-fade-up mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.1] text-white sm:text-6xl"
            style={{ animationDelay: "100ms" }}
          >
            Property, made <span className="italic text-gold-soft">clear</span>.
          </h1>
          <p
            className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            Land, homes, offices and commercial property — with the information, marketing and
            support to help you move with confidence.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "340ms" }}>
            <Button href="/real-estate/properties" variant="gold">
              Search Properties
            </Button>
            <Button href="/real-estate/inspection" variant="ghost-light">
              Book an Inspection
            </Button>
          </div>
        </div>

        {/* Property Search */}
        <div className="relative mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <form
            action="/real-estate/properties"
            className="grid gap-3 rounded-2xl bg-white p-4 shadow-xl sm:grid-cols-2 sm:p-5 lg:grid-cols-5"
          >
            <input
              name="location"
              placeholder="Location"
              className="rounded-lg border border-line px-4 py-3 text-sm text-navy-deep placeholder:text-navy/40 outline-none focus:border-navy"
            />
            <select
              name="type"
              defaultValue=""
              className="rounded-lg border border-line px-4 py-3 text-sm text-navy-deep outline-none focus:border-navy"
            >
              <option value="">Property Type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              name="transaction"
              defaultValue=""
              className="rounded-lg border border-line px-4 py-3 text-sm text-navy-deep outline-none focus:border-navy"
            >
              <option value="">Buy or Rent</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
              <option value="Lease">Lease</option>
              <option value="Investment">Investment</option>
            </select>
            <select
              name="state"
              defaultValue=""
              className="rounded-lg border border-line px-4 py-3 text-sm text-navy-deep outline-none focus:border-navy"
            >
              <option value="">State</option>
              {filterOptions.states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Button type="submit" variant="navy" className="w-full">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Featured Properties" title="Recently listed" />
          <Link
            href="/real-estate/properties"
            className="flex items-center gap-1.5 pb-1 text-sm font-medium text-navy hover:text-gold"
          >
            View all properties <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="Services" title="What we help with" />
          <div className="mt-10 flex flex-wrap gap-3">
            {["Property Sales", "Rentals", "Land", "Property Marketing", "Property Consultation"].map(
              (s) => (
                <span
                  key={s}
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-navy-deep"
                >
                  {s}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Why Smilish */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Why Smilish Real Estate" title="What every listing is held to" />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {whySmilish.map((w) => (
            <div key={w.title}>
              <w.icon size={22} className="text-navy" />
              <p className="mt-4 font-display text-lg font-medium text-navy-deep">{w.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{w.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <CTA
        eyebrow="Work With Smilish Real Estate"
        title="Looking for your next property?"
        primaryLabel="Search Properties"
        primaryHref="/real-estate/properties"
        secondaryHref="/real-estate/inspection"
        secondaryLabel="Book an Inspection"
      />
    </>
  );
}
