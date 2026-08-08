// Smilish Group — Homepage
// Prestige Navy & Gold design system
import { Link } from "wouter";
import { ArrowRight, Shirt, Bot, Building2, Star, Lightbulb, Shield, Palette, Heart, TrendingUp, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useFadeUp } from "@/hooks/useFadeUp";
import { BRANCHES, VALUES, HOW_WE_WORK, FASHION_PRODUCTS, AI_SERVICES, PROPERTIES, PROJECTS, formatPrice } from "@/lib/data";

const ICON_MAP: Record<string, React.ElementType> = {
  Shirt, Bot, Building2, Star, Lightbulb, Shield, Palette, Heart, TrendingUp,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#061426]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/manus-storage/sg-hero-main_77598822.jpg"
          alt="Smilish Group"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061426] via-[#061426]/80 to-[#061426]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-transparent to-transparent" />
      </div>

      {/* Decorative gold lines */}
      <div className="absolute top-1/3 right-0 w-px h-48 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute top-1/2 right-12 w-px h-32 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          <SectionLabel>Smilish Group</SectionLabel>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
            Building Businesses.{" "}
            <span className="text-[#D4AF37]">Creating Value.</span>
          </h1>
          <p className="font-body text-white/70 text-lg lg:text-xl leading-relaxed mb-4 max-w-xl">
            A modern African business group operating across fashion, AI automation and real estate.
          </p>
          <p className="font-mono-accent text-[#D4AF37] text-sm tracking-widest uppercase mb-10">
            Fashion · Technology · Real Estate
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-gold rounded-sm text-base px-8 py-4 inline-flex items-center gap-2">
              Work With Smilish
              <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-outline-gold rounded-sm text-base px-8 py-4">
              Our Story
            </Link>
          </div>
        </div>

        {/* Branch quick-links */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-sm overflow-hidden">
          {BRANCHES.map((branch) => {
            const Icon = ICON_MAP[branch.icon];
            return (
              <Link
                key={branch.id}
                href={branch.href}
                className="group bg-[#0B1F3A]/60 backdrop-blur-sm hover:bg-[#D4AF37]/10 transition-colors duration-200 p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors">
                  {Icon && <Icon size={18} className="text-[#D4AF37]" />}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm font-body">{branch.name}</div>
                  <div className="text-white/50 text-xs font-body mt-0.5">{branch.tagline}</div>
                </div>
                <ChevronRight size={16} className="text-white/30 group-hover:text-[#D4AF37] ml-auto transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BusinessesSection() {
  const ref = useFadeUp();
  return (
    <section className="py-20 lg:py-28 bg-[#F7F8FA]">
      <div className="container">
        <div ref={ref} className="fade-up mb-14">
          <SectionLabel>One Group, Three Businesses</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A] max-w-xl">
            Where Creativity, Technology<br className="hidden lg:block" /> and Property Meet
          </h2>
          <p className="text-gray-500 font-body text-sm max-w-xs leading-relaxed">Three distinct businesses. One shared commitment to quality, innovation and long-term value.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BRANCHES.map((branch, i) => {
            const Icon = ICON_MAP[branch.icon];
            return (
              <div
                key={branch.id}
                className="card-hover bg-white border border-gray-100 rounded-sm overflow-hidden group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="h-1.5 bg-[#D4AF37]" />
                <div className="p-8">
                  <div className="w-12 h-12 rounded-sm bg-[#0B1F3A] flex items-center justify-center mb-6">
                    {Icon && <Icon size={22} className="text-[#D4AF37]" />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0B1F3A] mb-3">{branch.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-body">{branch.description}</p>
                  <Link
                    href={branch.href}
                    className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold text-sm font-body hover:gap-3 transition-all duration-200"
                  >
                    Explore
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedProductsSection() {
  const ref = useFadeUp();
  const featured = FASHION_PRODUCTS.filter((p) => p.featured).slice(0, 3);
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div ref={ref} className="fade-up flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Smilish Fashion</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
              Wear Your Identity
            </h2>
          </div>
          <Link href="/fashion" className="btn-outline-gold rounded-sm text-sm px-5 py-2.5 self-start lg:self-auto">
            View All Products
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
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
                  <span className="font-display font-bold text-[#D4AF37] text-xl">
                    ₦{product.price.toLocaleString()}
                  </span>
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
      </div>
    </section>
  );
}

function AIServicesSection() {
  const ref = useFadeUp();
  const featured = AI_SERVICES.filter((s) => s.featured).slice(0, 2);
  return (
    <section className="py-20 lg:py-28 bg-[#0B1F3A]">
      <div className="container">
        <div ref={ref} className="fade-up flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Smilish AI Automation</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">
              Automate. Scale. <span className="text-[#D4AF37]">Win.</span>
            </h2>
          </div>
          <Link href="/automation" className="btn-outline-gold rounded-sm text-sm px-5 py-2.5 self-start lg:self-auto">
            All Services
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featured.map((service, i) => (
            <div
              key={service.id}
              className="card-hover group bg-[#061426] border border-white/10 hover:border-[#D4AF37]/30 rounded-sm overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-[#061426]/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-white text-xl mb-2">{service.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 font-body">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.features.slice(0, 3).map((f) => (
                    <span key={f} className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-2.5 py-1 rounded-sm font-mono-accent tracking-wide">
                      {f}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/automation/service/${service.slug}`}
                  className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold text-sm font-body hover:gap-3 transition-all duration-200"
                >
                  Learn More <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPropertiesSection() {
  const ref = useFadeUp();
  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 3);
  return (
    <section className="py-20 lg:py-28 bg-[#F7F8FA]">
      <div className="container">
        <div ref={ref} className="fade-up flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Smilish Real Estate</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
              Find Your <span className="text-[#D4AF37]">Place</span>
            </h2>
          </div>
          <Link href="/real-estate" className="btn-outline-gold rounded-sm text-sm px-5 py-2.5 self-start lg:self-auto">
            All Properties
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property, i) => (
            <div
              key={property.id}
              className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-[#0B1F3A] text-white text-xs font-semibold px-2.5 py-1 font-mono-accent">
                    {property.type}
                  </span>
                  <span className="bg-[#D4AF37] text-[#061426] text-xs font-semibold px-2.5 py-1 font-mono-accent">
                    {property.transaction}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-[#0B1F3A] text-base mb-1 leading-snug">{property.title}</h3>
                <p className="text-gray-500 text-xs mb-3 font-body">{property.location}</p>
                {property.bedrooms > 0 && (
                  <div className="flex gap-4 text-xs text-gray-500 mb-3 font-body">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.area}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="font-display font-bold text-[#D4AF37] text-lg">
                    {formatPrice(property.price)}
                  </span>
                  <Link
                    href={`/real-estate/property/${property.slug}`}
                    className="text-[#0B1F3A] hover:text-[#D4AF37] text-sm font-semibold transition-colors font-body"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurWorkSection() {
  const ref = useFadeUp();
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div ref={ref} className="fade-up flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Our Work</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
              Projects That Speak
            </h2>
          </div>
          <Link href="/projects" className="btn-outline-gold rounded-sm text-sm px-5 py-2.5 self-start lg:self-auto">
            All Projects
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects`}
              className="card-hover group relative rounded-sm overflow-hidden h-64 block"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061426]/90 via-[#061426]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="section-label block mb-1">{project.category}</span>
                <h3 className="font-display font-bold text-white text-sm leading-snug">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySmilishSection() {
  const ref = useFadeUp();
  return (
    <section className="py-20 lg:py-28 bg-[#0B1F3A]">
      <div className="container">
        <div ref={ref} className="fade-up mb-14">
          <SectionLabel>Why Smilish</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white max-w-xl">
            Values That Drive <span className="text-[#D4AF37]">Everything</span> We Build
          </h2>
          <p className="text-white/50 font-body text-sm max-w-xs leading-relaxed">Six principles that guide every decision across every business.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((value, i) => {
            const Icon = ICON_MAP[value.icon];
            return (
              <div
                key={value.title}
                className="group p-6 border border-white/10 hover:border-[#D4AF37]/30 rounded-sm transition-all duration-200 hover:bg-[#D4AF37]/5"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {Icon && <Icon size={18} className="text-[#D4AF37]" />}
                  <h3 className="font-display font-bold text-white text-base">{value.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed font-body">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  const ref = useFadeUp();
  return (
    <section className="py-20 lg:py-28 bg-[#F7F8FA]">
      <div className="container">
        <div ref={ref} className="fade-up mb-14">
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A] max-w-xl">
            A Process Built for <span className="italic">Results</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_WE_WORK.map((step, i) => (
            <div key={step.step} className="relative" style={{ transitionDelay: `${i * 60}ms` }}>
              {i < HOW_WE_WORK.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-[#D4AF37]/20 z-0" />
              )}
              <div className="relative z-10 bg-white border border-gray-100 rounded-sm p-6 card-hover">
                <div className="font-display text-4xl font-bold text-[#D4AF37]/20 mb-3 leading-none">{step.step}</div>
                <h3 className="font-display font-bold text-[#0B1F3A] text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-body">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0B1F3A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-[#D4AF37]" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-[#D4AF37]" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-[#D4AF37]" />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 border border-[#D4AF37]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 border border-[#D4AF37]/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="container relative z-10 text-center">
        <span className="section-label block mb-4">Get Started</span>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
          Ready to Work With <span className="text-[#D4AF37]">Smilish Group?</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto font-body">
          Whether you need fashion, automation or real estate — we're here to deliver quality and value.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-gold rounded-sm text-base px-10 py-4 inline-flex items-center gap-2">
            Work With Smilish <ArrowRight size={18} />
          </Link>
          <Link href="/about" className="btn-outline-gold rounded-sm text-base px-10 py-4">
            Learn About Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <BusinessesSection />
      <FeaturedProductsSection />
      <AIServicesSection />
      <FeaturedPropertiesSection />
      <OurWorkSection />
      <WhySmilishSection />
      <HowWeWorkSection />
      <FinalCTASection />
    </Layout>
  );
}
