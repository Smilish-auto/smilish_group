// Smilish Real Estate — Property Detail Page
import { Link, useParams } from "wouter";
import { ArrowLeft, MapPin, Bed, Bath, Maximize, CheckCircle, Phone, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { PROPERTIES, BRAND, formatPrice } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

export default function RealEstateProperty() {
  const { slug } = useParams<{ slug: string }>();
  const property = PROPERTIES.find((p) => p.slug === slug);

  if (!property) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-[#0B1F3A] mb-4">Property Not Found</h1>
            <Link href="/real-estate/properties" className="btn-gold rounded-sm px-6 py-3">Back to Properties</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const related = PROPERTIES.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);

  return (
    <Layout>
      <div className="bg-[#F7F8FA] pt-24 lg:pt-28 pb-16">
        <div className="container">
          <Link href="/real-estate/properties" className="inline-flex items-center gap-2 text-[#0B1F3A]/60 hover:text-[#D4AF37] text-sm font-body mb-8 transition-colors">
            <ArrowLeft size={15} /> Back to Properties
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="rounded-sm overflow-hidden aspect-video mb-6">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-2 mb-5">
                <span className="bg-[#0B1F3A] text-white text-xs font-semibold px-3 py-1.5 font-mono-accent">{property.type}</span>
                <span className="bg-[#D4AF37] text-[#061426] text-xs font-semibold px-3 py-1.5 font-mono-accent">{property.transaction}</span>
                <span className={`text-xs font-semibold px-3 py-1.5 font-mono-accent ${property.status === "Available" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{property.status}</span>
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A] mb-2">{property.title}</h1>
              <p className="flex items-center gap-1.5 text-gray-500 font-body text-sm mb-6"><MapPin size={14} />{property.location}</p>
              {property.bedrooms > 0 && (
                <div className="flex gap-6 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-[#0B1F3A]"><Bed size={16} className="text-[#D4AF37]" /><span className="font-body text-sm">{property.bedrooms} Bedrooms</span></div>
                  <div className="flex items-center gap-2 text-[#0B1F3A]"><Bath size={16} className="text-[#D4AF37]" /><span className="font-body text-sm">{property.bathrooms} Bathrooms</span></div>
                  <div className="flex items-center gap-2 text-[#0B1F3A]"><Maximize size={16} className="text-[#D4AF37]" /><span className="font-body text-sm">{property.area}</span></div>
                </div>
              )}
              <div className="mb-8">
                <h2 className="font-display font-bold text-[#0B1F3A] text-xl mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed font-body">{property.description}</p>
              </div>
              <div>
                <h2 className="font-display font-bold text-[#0B1F3A] text-xl mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                      <span className="text-gray-600 text-sm font-body">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm sticky top-24">
                <div className="font-display text-3xl font-bold text-[#D4AF37] mb-1">{formatPrice(property.price)}</div>
                <p className="text-gray-400 text-xs font-mono-accent tracking-widest uppercase mb-6">{property.transaction}</p>
                <div className="space-y-3 mb-6">
                  <Link href="/real-estate/inspection" className="btn-gold rounded-sm w-full py-3.5 flex items-center justify-center gap-2 text-sm">
                    Book Inspection
                  </Link>
                  <a href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}?text=Hi, I'm interested in: ${property.title} (${formatPrice(property.price)})`} target="_blank" rel="noopener noreferrer" className="btn-navy rounded-sm w-full py-3.5 flex items-center justify-center gap-2 text-sm">
                    <MessageCircle size={16} /> Contact Agent
                  </a>
                  <a href={`tel:${BRAND.phone}`} className="btn-outline-gold rounded-sm w-full py-3.5 flex items-center justify-center gap-2 text-sm">
                    <Phone size={16} /> Call Agent
                  </a>
                </div>
                <div className="border-t border-gray-100 pt-5 space-y-3">
                  {[
                    { label: "Property Type", value: property.type },
                    { label: "Transaction", value: property.transaction },
                    { label: "Location", value: property.location },
                    { label: "Status", value: property.status },
                    ...(property.area !== "0 sqm" ? [{ label: "Land Size", value: property.area }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-400 font-body">{label}</span>
                      <span className="text-[#0B1F3A] font-semibold font-body">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <div key={p.id} className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden">
                    <div className="relative overflow-hidden h-40">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-[#0B1F3A] text-sm mb-1 leading-snug">{p.title}</h3>
                      <p className="text-gray-400 text-xs mb-2 font-body">{p.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-[#D4AF37]">{formatPrice(p.price)}</span>
                        <Link href={`/real-estate/property/${p.slug}`} className="text-[#0B1F3A] hover:text-[#D4AF37] text-xs font-semibold transition-colors font-body">View →</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
