// Smilish AI Automation — Service Detail Page
import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { AI_SERVICES, BRAND } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

export default function AutomationService() {
  const { slug } = useParams<{ slug: string }>();
  const service = AI_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-[#0B1F3A] mb-4">Service Not Found</h1>
            <Link href="/automation" className="btn-gold rounded-sm px-6 py-3">Back to AI Automation</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-[#F7F8FA] pt-24 lg:pt-28 pb-16">
        <div className="container">
          <Link href="/automation" className="inline-flex items-center gap-2 text-[#0B1F3A]/60 hover:text-[#D4AF37] text-sm font-body mb-8 transition-colors">
            <ArrowLeft size={15} /> Back to AI Automation
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="rounded-sm overflow-hidden aspect-[4/3]">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <SectionLabel>AI Automation Service</SectionLabel>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-[#0B1F3A] mb-4">{service.name}</h1>
              <p className="text-gray-600 leading-relaxed font-body mb-6">{service.description}</p>
              <div className="mb-6">
                <h3 className="font-display font-bold text-[#0B1F3A] text-base mb-3">Key Features</h3>
                <div className="space-y-2">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <CheckCircle size={15} className="text-[#D4AF37] shrink-0" />
                      <span className="text-gray-600 text-sm font-body">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <h3 className="font-display font-bold text-[#0B1F3A] text-base mb-3">Industries We Serve</h3>
                <div className="flex flex-wrap gap-2">
                  {service.industries.map((ind) => (
                    <span key={ind} className="text-xs bg-[#0B1F3A]/5 text-[#0B1F3A] border border-[#0B1F3A]/10 px-3 py-1.5 rounded-sm font-mono-accent tracking-wide">{ind}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/automation/audit" className="btn-gold rounded-sm py-4 flex items-center justify-center gap-2 flex-1">
                  Get Free Audit
                </Link>
                <a href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}?text=Hi, I'm interested in ${service.name}`} target="_blank" rel="noopener noreferrer" className="btn-navy rounded-sm py-4 flex items-center justify-center gap-2 flex-1">
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

