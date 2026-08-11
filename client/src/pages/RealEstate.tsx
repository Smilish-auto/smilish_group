// Smilish Real Estate — Landing Page
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Search, MapPin, Home, Building2, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useFadeUp } from "@/hooks/useFadeUp";
import { PROPERTIES, PROJECTS, formatPrice } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

const PROPERTY_TYPES = ["All", "Land", "House", "Apartment", "Office", "Shop"];
const TRANSACTION_TYPES = ["All", "For Sale", "For Rent"];

const RE_SERVICES = [
  { icon: Home, title: "Property Sales", desc: "Find your dream property with full transaction support and documentation guidance." },
  { icon: Building2, title: "Rentals", desc: "Short and long-term rental properties across residential and commercial categories." },
  { icon: MapPin, title: "Land", desc: "Prime land in strategic locations with verified documentation and clear titles." },
  { icon: Search, title: "Property Marketing", desc: "We market your property to qualified buyers and tenants through our network." },
];

const WHY_SMILISH_RE = [
  "Verified property documentation",
  "Transparent pricing — no hidden fees",
  "Expert local market knowledge",
  "Full transaction support",
  "Property inspection facilitation",
  "Post-sale/rental follow-up",
];

export default function RealEstate() {
  const [search, setSearch] = useState({ location: "", type: "All", transaction: "All" });
  const heroRef = useFadeUp();
  const featuredRef = useFadeUp();
  const servicesRef = useFadeUp();
  const whyRef = useFadeUp();

  const reProjects = PROJECTS.filter((p) => p.category === "realestate");

  const filtered = PROPERTIES.filter((p) => {
    const matchType = search.type === "All" || p.type === search.type;
    const matchTransaction = search.transaction === "All" || p.transaction === search.transaction;
    const matchLocation = !search.location || p.location.toLowerCase().includes(search.location.toLowerCase());
    return matchType && matchTransaction && matchLocation;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#061426]">
        <div className="absolute inset-0">
          <img src="/manus-storage/sg-realestate-hero_f9a03ddc.jpg" alt="Smilish Real Estate" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061426] via-[#061426]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 pt-24 pb-16">
          <div ref={heroRef} className="fade-up max-w-2xl">
            <SectionLabel>Smilish Real Estate</SectionLabel>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Find Your <span className="text-[#D4AF37]">Place</span>
            </h1>
            <p className="text-white/70 text-lg font-body leading-relaxed mb-8">
              Discover property opportunities through verified listings, expert guidance and full transaction support. Land, houses, apartments, offices and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/real-estate/properties" className="btn-gold rounded-sm text-base px-8 py-4 inline-flex items-center gap-2">
                Browse Properties <ArrowRight size={18} />
              </Link>
              <Link href="/real-estate/inspection" className="btn-outline-gold rounded-sm text-base px-8 py-4">
                Book Inspection
              </Link>
            </div>
          </div>

          {/* Quick Search */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-5 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Location (e.g. Lagos, Abuja)"
                value={search.location}
                onChange={(e) => setSearch((s) => ({ ...s, location: e.target.value }))}
                className="border border-white/20 bg-white/10 text-white placeholder-white/50 rounded-sm px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#D4AF37]"
              />
              <select
                value={search.type}
                onChange={(e) => setSearch((s) => ({ ...s, type: e.target.value }))}
                className="border border-white/20 bg-[#0B1F3A] text-white rounded-sm px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#D4AF37]"
              >
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
              </select>
              <select
                value={search.transaction}
                onChange={(e) => setSearch((s) => ({ ...s, transaction: e.target.value }))}
                className="border border-white/20 bg-[#0B1F3A] text-white rounded-sm px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#D4AF37]"
              >
                {TRANSACTION_TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "Buy or Rent" : t}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 lg:py-28 bg-[#F7F8FA]">
        <div className="container">
          <div ref={featuredRef} className="fade-up flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <div>
              <SectionLabel>Featured Properties</SectionLabel>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">Available Now</h2>
            </div>
            <Link href="/real-estate/properties" className="btn-outline-gold rounded-sm text-sm px-5 py-2.5 self-start lg:self-auto">All Properties</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, 6).map((property, i) => (
              <div key={property.id} className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden" style={{ transitionDelay: `${i * 50}ms` }}>
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
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-[#0B1F3A]">
        <div className="container">
          <div ref={servicesRef} className="fade-up text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Full Property Support</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RE_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-[#061426] border border-white/10 hover:border-[#D4AF37]/30 rounded-sm p-6 transition-colors" style={{ transitionDelay: `${i * 50}ms` }}>
                  <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-body">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Smilish */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div ref={whyRef} className="fade-up grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Why Smilish Real Estate</SectionLabel>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A] mb-6">
                Property Transactions You Can Trust
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-8">
                We combine local market expertise with transparent processes to help you find, buy, rent or sell property with confidence.
              </p>
              <div className="space-y-3">
                {WHY_SMILISH_RE.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-[#D4AF37] shrink-0" />
                    <span className="text-gray-600 text-sm font-body">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <img src="/manus-storage/sg-realestate-hero_f9a03ddc.jpg" alt="Real Estate" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#0B1F3A] p-5 rounded-sm">
                <div className="font-display text-3xl font-bold text-[#D4AF37]">100%</div>
                <div className="font-mono-accent text-white/60 text-xs tracking-widest uppercase">Verified Listings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      {reProjects.length > 0 && (
        <section className="py-20 lg:py-28 bg-[#F7F8FA]">
          <div className="container">
            <div className="mb-12">
              <SectionLabel>Our Work</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-[#0B1F3A]">Real Estate Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reProjects.map((project) => (
                <div key={project.id} className="card-hover group relative rounded-sm overflow-hidden h-64">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061426]/90 via-[#061426]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display font-bold text-white text-xl mb-1">{project.title}</h3>
                    <p className="text-white/60 text-sm font-body line-clamp-2">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-[#061426]">
        <div className="container text-center">
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Find Your <span className="text-[#D4AF37]">Next Property?</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto font-body">Browse our listings or book an inspection today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/real-estate/properties" className="btn-gold rounded-sm text-base px-10 py-4 inline-flex items-center gap-2">
              Browse Properties <ArrowRight size={18} />
            </Link>
            <Link href="/real-estate/inspection" className="btn-outline-gold rounded-sm text-base px-10 py-4">
              Book Inspection
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
