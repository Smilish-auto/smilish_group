// Smilish Real Estate — All Properties Page
import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Search } from "lucide-react";
import Layout from "@/components/Layout";
import { PROPERTIES, formatPrice } from "@/lib/data";

const PROPERTY_TYPES = ["All", "Land", "House", "Apartment", "Office", "Shop"];
const TRANSACTION_TYPES = ["All", "For Sale", "For Rent"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

export default function RealEstateProperties() {
  const [filters, setFilters] = useState({ location: "", type: "All", transaction: "All" });

  const filtered = PROPERTIES.filter((p) => {
    const matchType = filters.type === "All" || p.type === filters.type;
    const matchTransaction = filters.transaction === "All" || p.transaction === filters.transaction;
    const matchLocation = !filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase());
    return matchType && matchTransaction && matchLocation;
  });

  return (
    <Layout>
      <section className="bg-[#061426] pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="container">
          <SectionLabel>Smilish Real Estate</SectionLabel>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">All Properties</h1>
          <p className="text-white/60 font-body max-w-xl">Browse our verified property listings. Filter by location, type and transaction.</p>
        </div>
      </section>
      <section className="py-8 bg-[#0B1F3A] border-b border-white/10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search by location..."
                value={filters.location}
                onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                className="w-full border border-white/20 bg-white/10 text-white placeholder-white/40 rounded-sm pl-9 pr-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))} className="border border-white/20 bg-[#0B1F3A] text-white rounded-sm px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#D4AF37]">
              {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
            </select>
            <select value={filters.transaction} onChange={(e) => setFilters((f) => ({ ...f, transaction: e.target.value }))} className="border border-white/20 bg-[#0B1F3A] text-white rounded-sm px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#D4AF37]">
              {TRANSACTION_TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "Buy or Rent" : t}</option>)}
            </select>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-20 bg-[#F7F8FA]">
        <div className="container">
          <p className="text-gray-500 text-sm font-body mb-8">{filtered.length} {filtered.length === 1 ? "property" : "properties"} found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-xl text-[#0B1F3A] mb-2">No properties found</p>
              <p className="text-gray-500 text-sm font-body">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <div key={property.id} className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden">
                  <div className="relative overflow-hidden h-52">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-[#0B1F3A] text-white text-xs font-semibold px-2.5 py-1 font-mono-accent">{property.type}</span>
                      <span className="bg-[#D4AF37] text-[#061426] text-xs font-semibold px-2.5 py-1 font-mono-accent">{property.transaction}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-[#0B1F3A] text-base mb-1 leading-snug">{property.title}</h3>
                    <p className="text-gray-500 text-xs mb-2 font-body flex items-center gap-1"><MapPin size={11} />{property.location}</p>
                    {property.bedrooms > 0 && (
                      <div className="flex gap-4 text-xs text-gray-400 mb-3 font-body">
                        <span>{property.bedrooms} Beds</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>{property.area}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="font-display font-bold text-[#D4AF37] text-lg">{formatPrice(property.price)}</span>
                      <Link href={`/real-estate/property/${property.slug}`} className="text-[#0B1F3A] hover:text-[#D4AF37] text-sm font-semibold transition-colors font-body">Details →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
