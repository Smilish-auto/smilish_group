// Smilish AI Automation — Landing Page
import { Link } from "wouter";
import { ArrowRight, Zap, Clock, TrendingUp, Users, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useFadeUp } from "@/hooks/useFadeUp";
import { AI_SERVICES, PROJECTS } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

const WHAT_WE_AUTOMATE = [
  "Customer service & support",
  "Lead generation & qualification",
  "Email & follow-up sequences",
  "Appointment & booking systems",
  "Business workflow automation",
  "AI knowledge bases",
  "Website AI agents",
  "CRM & notification workflows",
];

const WHO_WE_HELP = [
  { title: "E-Commerce Brands", desc: "Automate order support, returns, and customer queries." },
  { title: "Real Estate Agencies", desc: "Qualify leads and schedule property inspections automatically." },
  { title: "Healthcare Providers", desc: "Automate appointment booking and patient follow-ups." },
  { title: "Professional Services", desc: "Handle client intake, scheduling and document workflows." },
  { title: "Hospitality Businesses", desc: "Automate reservations, inquiries and guest communications." },
  { title: "Any Business", desc: "If you have repetitive tasks, we can automate them." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Automation Audit", desc: "We analyse your current workflows and identify the highest-impact automation opportunities." },
  { step: "02", title: "Solution Design", desc: "We design a custom automation workflow tailored to your tools, team and business goals." },
  { step: "03", title: "Build & Integrate", desc: "We build and integrate the automation into your existing systems with minimal disruption." },
  { step: "04", title: "Launch & Optimise", desc: "We launch, monitor and continuously optimise for maximum efficiency and ROI." },
];

export default function Automation() {
  const heroRef = useFadeUp();
  const automateRef = useFadeUp();
  const howRef = useFadeUp();
  const servicesRef = useFadeUp();
  const whoRef = useFadeUp();

  const aiProjects = PROJECTS.filter((p) => p.category === "ai");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#061426]">
        <div className="absolute inset-0">
          <img src="/manus-storage/sg-ai-hero_12b2c6c6.jpg" alt="Smilish AI Automation" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061426] via-[#061426]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 pt-24 pb-16">
          <div ref={heroRef} className="fade-up max-w-2xl">
            <SectionLabel>Smilish AI Automation</SectionLabel>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Automate. Scale. <span className="text-[#D4AF37]">Win.</span>
            </h1>
            <p className="text-white/70 text-lg font-body leading-relaxed mb-8">
              Help your business save time, reduce repetitive work, improve customer experience and increase operational efficiency through intelligent AI automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/automation/audit" className="btn-gold rounded-sm text-base px-8 py-4 inline-flex items-center gap-2">
                Get Free Audit <ArrowRight size={18} />
              </Link>
              <Link href="/automation/services" className="btn-outline-gold rounded-sm text-base px-8 py-4">
                Our Services
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
              { icon: Clock, value: "80%", label: "Time Saved" },
              { icon: TrendingUp, value: "3x", label: "More Leads" },
              { icon: Users, value: "24/7", label: "AI Availability" },
              { icon: Zap, value: "Fast", label: "Setup Time" },
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

      {/* What We Automate */}
      <section className="py-20 lg:py-28 bg-[#F7F8FA]">
        <div className="container">
          <div ref={automateRef} className="fade-up grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>What We Automate</SectionLabel>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A] mb-6">
                Every Repetitive Task Is an Automation Opportunity
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-8">
                We identify the workflows that drain your team's time and replace them with intelligent, always-on AI systems that work harder and faster than any manual process.
              </p>
              <Link href="/automation/audit" className="btn-gold rounded-sm text-sm px-6 py-3 inline-flex items-center gap-2">
                Start Free Audit <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WHAT_WE_AUTOMATE.map((item, i) => (
                <div key={item} className="flex items-center gap-3 bg-white border border-gray-100 rounded-sm p-4" style={{ transitionDelay: `${i * 40}ms` }}>
                  <CheckCircle size={16} className="text-[#D4AF37] shrink-0" />
                  <span className="text-[#0B1F3A] text-sm font-body">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-[#0B1F3A]">
        <div className="container">
          <div ref={howRef} className="fade-up text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">
              From Audit to <span className="text-[#D4AF37]">Automation</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="bg-[#061426] border border-white/10 rounded-sm p-6" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="font-display text-4xl font-bold text-[#D4AF37]/20 mb-3 leading-none">{step.step}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Solutions */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div ref={servicesRef} className="fade-up mb-12">
            <SectionLabel>Automation Solutions</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">Our AI Products</h2>
              <Link href="/automation/services" className="btn-outline-gold rounded-sm text-sm px-5 py-2.5 self-start lg:self-auto">All Services</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AI_SERVICES.map((service, i) => (
              <div key={service.id} className="card-hover group bg-white border border-gray-100 rounded-sm overflow-hidden" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="relative overflow-hidden h-40">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[#0B1F3A] text-base mb-2 leading-snug">{service.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 font-body line-clamp-2">{service.description}</p>
                  <Link href={`/automation/service/${service.slug}`} className="inline-flex items-center gap-1 text-[#D4AF37] font-semibold text-xs font-body hover:gap-2 transition-all">
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-20 lg:py-28 bg-[#F7F8FA]">
        <div className="container">
          <div ref={whoRef} className="fade-up text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Who We Help</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
              Built for Every Business
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_WE_HELP.map((item, i) => (
              <div key={item.title} className="card-hover bg-white border border-gray-100 rounded-sm p-6" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="w-1 h-8 bg-[#D4AF37] mb-4" />
                <h3 className="font-display font-bold text-[#0B1F3A] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 lg:py-28 bg-[#0B1F3A]">
        <div className="container">
          <div className="mb-12">
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Real Results</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiProjects.map((project) => (
              <div key={project.id} className="card-hover group bg-[#061426] border border-white/10 hover:border-[#D4AF37]/30 rounded-sm overflow-hidden">
                <div className="relative overflow-hidden h-48">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-[#061426]/30 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-white text-xl mb-2">{project.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-body">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-[#D4AF37]">
        <div className="container text-center">
          <span className="font-mono-accent text-[#061426] text-xs tracking-widest uppercase block mb-3">Free Automation Audit</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#061426] mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-[#061426]/70 text-lg mb-8 max-w-xl mx-auto font-body">
            Book a free automation audit and discover exactly which parts of your business we can automate — and what the ROI would be.
          </p>
          <Link href="/automation/audit" className="btn-navy rounded-sm text-base px-10 py-4 inline-flex items-center gap-2">
            Book Free Audit <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
