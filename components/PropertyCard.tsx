import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import type { PropertyRow } from "@/lib/supabase/types";
import { formatNaira } from "@/lib/format";
import { PlaceholderArt } from "./PlaceholderArt";

const statusStyles: Record<PropertyRow["status"], string> = {
  Available: "bg-gold text-navy-deep",
  Reserved: "bg-white/90 text-navy-deep",
  Sold: "bg-ink text-white",
  Rented: "bg-ink text-white",
  Unavailable: "bg-ink/60 text-white",
};

export function PropertyCard({ property }: { property: PropertyRow }) {
  return (
    <Link
      href={`/real-estate/property/${property.slug}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_24px_50px_-25px_rgba(11,31,58,0.4)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <PlaceholderArt variant="real-estate" label={property.title} className="h-full w-full" />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${statusStyles[property.status]}`}
        >
          {property.status}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-navy-deep">
          {property.transaction_type}
        </span>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-navy/45">
          <MapPin size={12} /> {property.location}, {property.state}
        </p>
        <h3 className="mt-2 font-display text-lg font-medium leading-snug text-navy-deep">
          {property.title}
        </h3>
        <p className="mt-2 font-mono text-base text-navy">
          {formatNaira(property.price)}
          <span className="ml-1 text-xs text-navy/50">
            {property.price_unit !== "total" ? `/ ${property.price_unit.replace("per ", "")}` : ""}
          </span>
        </p>
        <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-xs text-navy/55">
          {property.bedrooms !== null && (
            <span className="flex items-center gap-1">
              <BedDouble size={14} /> {property.bedrooms}
            </span>
          )}
          {property.bathrooms !== null && (
            <span className="flex items-center gap-1">
              <Bath size={14} /> {property.bathrooms}
            </span>
          )}
          {(property.land_size_sqm || property.area_sqm) && (
            <span className="flex items-center gap-1">
              <Ruler size={14} /> {property.land_size_sqm ?? property.area_sqm} sqm
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
