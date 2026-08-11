// Smilish Fashion — Landing Page
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Scissors, Star, Users, Package } from "lucide-react";
import Layout from "@/components/Layout";
import { useFadeUp } from "@/hooks/useFadeUp";
import { FASHION_PRODUCTS, FASHION_SERVICES, PROJECTS } from "@/lib/data";
import { toast } from "sonner";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

const CATEGORIES = ["All", "African Wear", "Streetwear", "Corporate Wear"];

export default function Fashion() {
  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useFadeUp();
  const productsRef = useFadeUp();
  const servicesRef = useFadeUp();
  const workRef = useFadeUp();

  const filtered = activeCategory === "All"
    ? FASHION_PRODUCTS
    : FASHION_PRODUCTS.filter((p) => p.category === activeCategory);

  const fashionProjects = PROJECTS.filter((p) => p.category === "fashion");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#061426]">
        <div className="absolute inset-0">
          <img
            src="/manus-storage/sg-fashion-hero_a561491a.jpg"
            alt="Smilish Fashion"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061426] via-[#061426]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 pt-24 pb-16">
          <div ref={heroRef} className="fade-up max-w-2xl">
            <SectionLabel>Smilish Fashion</SectionLabel>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Wear Your <span className="text-[#D4AF37]">Identity</span>
            </h1>
            <p className="text-white/70 text-lg font-body leading-relaxed mb-8">
              Quality clothing that helps you express identity, confidence and culture. From custom tailoring to African wear, streetwear and corporate attire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/fashion/products" className="btn-gold rounded-sm text-base px-8 py-4 inline-flex items-center gap-2">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link href="/fashion/custom" className="btn-outline-gold rounded-sm text-base px-8 py-4">
                Custom Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0B1F3A] py-10">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Package, value: "50+", label: "Products" },
              { icon: Scissors, value: "100%", label: "Custom Made" },
              { icon: Users, value: "500+", label: "Happy Clients" },
              { icon: Star, value: "5★", label: "Quality Rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon size={20} className="text-[#D4AF37] mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-white">{value}</div>
                <div className="font-mono-accent text-white/50 text-xs tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-28 bg-[#F7F8FA]">
        <div className="container">
          <div ref={productsRef} className="fade-up mb-10">
            <SectionLabel>Our Products</SectionLabel>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">Featured Collection</h2>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs font-mono-accent tracking-widest uppercase rounded-sm border transition-all ${
                      activeCategory === cat
                        ? "bg-[#D4AF37] text-[#061426] border-[#D4AF37]"
                        : "bg-white text-[#0B1F3A] border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#D4AF37] text-[#061426] text-xs font-semibold px-2.5 py-1 font-mono-accent tracking-wide">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[#0B1F3A] text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-3 font-body line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-[#D4AF37] text-xl">₦{product.price.toLocaleString()}</span>
                    <Link
                      href={`/fashion/product/${product.slug}`}
                      className="text-[#0B1F3A] hover:text-[#D4AF37] text-sm font-semibold transition-colors font-body"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/fashion/products" className="btn-navy rounded-sm text-sm px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-[#0B1F3A]">
        <div className="container">
          <div ref={servicesRef} className="fade-up mb-12">
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Our Fashion Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FASHION_SERVICES.map((service, i) => (
              <div
                key={service}
                className="flex items-center gap-4 bg-[#061426] border border-white/10 hover:border-[#D4AF37]/30 rounded-sm p-5 transition-colors"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                <span className="text-white/80 font-body text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div ref={workRef} className="fade-up mb-12">
            <SectionLabel>Our Work</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">Fashion Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fashionProjects.map((project) => (
              <div key={project.id} className="card-hover group relative rounded-sm overflow-hidden h-72">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
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

      {/* Custom Design CTA */}
      <section className="py-20 lg:py-24 bg-[#D4AF37]">
        <div className="container text-center">
          <span className="font-mono-accent text-[#061426] text-xs tracking-widest uppercase block mb-3">Custom Design</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#061426] mb-4">
            Have Something Specific in Mind?
          </h2>
          <p className="text-[#061426]/70 text-lg mb-8 max-w-xl mx-auto font-body">
            We create fully custom outfits tailored to your exact measurements, fabric choice and style vision.
          </p>
          <Link href="/fashion/custom" className="btn-navy rounded-sm text-base px-10 py-4 inline-flex items-center gap-2">
            Start Custom Order <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
