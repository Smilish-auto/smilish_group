import type { Metadata } from "next";
import { Eyebrow } from "@/components/SectionHeading";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperties, getPropertyFilterOptions } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Properties",
  description: "Search Smilish Real Estate listings by location, type, budget and more.",
};

const PROPERTY_TYPES = ["Land", "House", "Apartment", "Office", "Shop", "Commercial", "Estate"];

interface Filters {
  location?: string;
  type?: string;
  transaction?: string;
  state?: string;
  min?: string;
  max?: string;
  bedrooms?: string;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Filters>;
}) {
  const filters = await searchParams;

  const [filtered, filterOptions] = await Promise.all([
    getProperties({
      location: filters.location,
      type: filters.type,
      transaction: filters.transaction,
      state: filters.state,
      min: filters.min ? Number(filters.min) : undefined,
      max: filters.max ? Number(filters.max) : undefined,
      bedrooms: filters.bedrooms ? Number(filters.bedrooms) : undefined,
    }),
    getPropertyFilterOptions(),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Eyebrow>Smilish Real Estate</Eyebrow>
      <h1 className="mt-5 font-display text-4xl font-medium text-navy-deep sm:text-5xl">
        Properties
      </h1>

      <form className="mt-8 grid gap-3 rounded-2xl border border-line bg-mist p-5 sm:grid-cols-3 lg:grid-cols-7">
        <input
          name="location"
          defaultValue={filters.location}
          placeholder="Location"
          className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy sm:col-span-2 lg:col-span-1"
        />
        <select
          name="type"
          defaultValue={filters.type ?? ""}
          className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy"
        >
          <option value="">Type</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          name="transaction"
          defaultValue={filters.transaction ?? ""}
          className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy"
        >
          <option value="">Buy/Rent</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
          <option value="Lease">Lease</option>
          <option value="Investment">Investment</option>
        </select>
        <select
          name="state"
          defaultValue={filters.state ?? ""}
          className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy"
        >
          <option value="">State</option>
          {filterOptions.states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          name="min"
          type="number"
          defaultValue={filters.min}
          placeholder="Min Price"
          className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="max"
          type="number"
          defaultValue={filters.max}
          placeholder="Max Price"
          className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <button
          type="submit"
          className="rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-deep"
        >
          Apply Filters
        </button>
      </form>

      <p className="mt-6 font-mono text-xs uppercase tracking-wide text-navy/40">
        {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-navy/50">
          No properties match those filters yet — try widening your search.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      )}
    </section>
  );
}
