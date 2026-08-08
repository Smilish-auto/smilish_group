// Smilish Group — About Page
import { Link } from "wouter";
import { ArrowRight, Shirt, Bot, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import { useFadeUp } from "@/hooks/useFadeUp";
import { BRANCHES, VALUES } from "@/lib/data";

const ICON_MAP: Record<string, React.ElementType> = { Shirt, Bot, Building2 };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

export default function About() {
  const storyRef = useFadeUp();
  const valuesRef = useFadeUp();
  const businessesRef = useFadeUp();
  const visionRef = useFadeUp();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-[#061426] pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/10 to-transparent" />
        </div>
        <div className="container relative z-10">
          <SectionLabel>About Smilish Group</SectionLabel>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white max-w-3xl leading-tight mb-6">
            Building Africa's Next-Generation{" "}
            <span className="text-[#D4AF37]">Business Group</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl font-body leading-relaxed">
            Smilish Group is a modern African business group focused on fashion, artificial intelligence, business automation, real estate, digital innovation and long-term asset creation.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div ref={storyRef} className="fade-up grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A] mb-6">
                From Vision to a Growing Business Group
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 font-body">
                Smilish Group was founded with a clear purpose: to build valuable businesses, products and services that solve real problems, improve people's lives and create long-term economic value.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 font-body">
                Starting with fashion — a deeply personal expression of African identity and culture — we expanded into AI automation to help businesses operate more efficiently, and into real estate to help people and organisations find and invest in property.
              </p>
              <p className="text-gray-600 leading-relaxed font-body">
                Today, Smilish Group operates three distinct but complementary businesses under one brand, united by a shared commitment to quality, innovation and long-term thinking.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <img
                  src="/manus-storage/sg-hero-main_77598822.jpg"
                  alt="Smilish Group Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#D4AF37] p-5 rounded-sm">
                <div className="font-display text-3xl font-bold text-[#061426]">3</div>
                <div className="font-mono-accent text-[#061426] text-xs tracking-widest uppercase">Businesses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-[#0B1F3A]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#061426] border border-white/10 rounded-sm p-8 lg:p-10">
              <span className="section-label block mb-4">Our Mission</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                Why We Exist
              </h2>
              <p className="text-white/70 leading-relaxed font-body">
                To build valuable businesses, products and services that solve real problems, improve people's lives and create long-term economic value.
              </p>
            </div>
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-sm p-8 lg:p-10">
              <span className="section-label block mb-4">Our Vision</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                Where We're Going
              </h2>
              <p className="text-white/70 leading-relaxed font-body">
                To grow Smilish Group into a respected African business group operating across fashion, technology and real estate, with businesses that can operate beyond the founder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-[#F7F8FA]">
        <div className="container">
          <div ref={valuesRef} className="fade-up text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className="bg-white border border-gray-100 rounded-sm p-6 card-hover"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="w-1 h-8 bg-[#D4AF37] mb-4" />
                <h3 className="font-display font-bold text-[#0B1F3A] text-lg mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-body">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Businesses */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div ref={businessesRef} className="fade-up text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Our Businesses</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
              Three Businesses. One Group.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {BRANCHES.map((branch, i) => {
              const Icon = ICON_MAP[branch.icon];
              return (
                <div
                  key={branch.id}
                  className="card-hover bg-white border-l-4 border-[#D4AF37] border border-gray-100 rounded-sm p-7"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="w-11 h-11 rounded-sm bg-[#0B1F3A] flex items-center justify-center mb-5">
                    {Icon && <Icon size={20} className="text-[#D4AF37]" />}
                  </div>
                  <h3 className="font-display font-bold text-[#0B1F3A] text-xl mb-2">{branch.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 font-body">{branch.description}</p>
                  <Link
                    href={branch.href}
                    className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold text-sm font-body hover:gap-3 transition-all"
                  >
                    Explore <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 lg:py-28 bg-[#061426]">
        <div ref={visionRef} className="container fade-up text-center max-w-3xl mx-auto">
          <SectionLabel>Future Vision</SectionLabel>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Building Businesses That Last{" "}
            <span className="text-[#D4AF37]">Beyond the Founder</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10 font-body">
            Our long-term vision is to grow Smilish Group into a respected, self-sustaining African conglomerate — with businesses, systems and teams that create value for generations.
          </p>
          <Link href="/contact" className="btn-gold rounded-sm text-base px-10 py-4 inline-flex items-center gap-2">
            Work With Smilish <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
