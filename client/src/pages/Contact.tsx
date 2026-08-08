// Smilish Group — Contact Page
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Twitter, Linkedin, Facebook, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { BRAND } from "@/lib/data";
import { toast } from "sonner";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="gold-rule" />
      <span className="section-label">{children}</span>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", phone: "", branch: "", service: "", message: "" });
  };

  const BRANCHES_LIST = [
    { value: "fashion", label: "Smilish Fashion" },
    { value: "ai", label: "Smilish AI Automation" },
    { value: "realestate", label: "Smilish Real Estate" },
    { value: "general", label: "General Enquiry" },
  ];

  const SERVICES_MAP: Record<string, string[]> = {
    fashion: ["Custom Tailoring", "African Wear", "Streetwear", "Corporate Wear", "Wedding & Event Wear", "Fashion Consultation"],
    ai: ["AI Customer Service", "Lead Generation", "Email Automation", "Booking Automation", "Workflow Automation", "AI Knowledge Base"],
    realestate: ["Property Sales", "Property Rentals", "Land", "Property Marketing", "Property Consultation"],
    general: ["Partnership", "Media Enquiry", "Other"],
  };

  const services = form.branch ? SERVICES_MAP[form.branch] || [] : [];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#061426] pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container">
          <SectionLabel>Contact Us</SectionLabel>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-tight mb-4">
            Let's Start a <span className="text-[#D4AF37]">Conversation</span>
          </h1>
          <p className="text-white/60 text-lg font-body max-w-xl">
            Whether you have a question, a project in mind, or just want to say hello — we're here.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#F7F8FA]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone}` },
                    { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}` },
                    { icon: MapPin, label: "Location", value: BRAND.location, href: undefined },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-[#0B1F3A] flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <div className="font-mono-accent text-[#D4AF37] text-xs tracking-widest uppercase mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[#0B1F3A] hover:text-[#D4AF37] font-body text-sm transition-colors">
                            {value}
                          </a>
                        ) : (
                          <span className="text-[#0B1F3A] font-body text-sm">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-display font-bold text-[#0B1F3A] text-base mb-4">Follow Smilish Group</h3>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, href: BRAND.socials.instagram, label: "Instagram" },
                    { icon: Twitter, href: BRAND.socials.twitter, label: "Twitter" },
                    { icon: Linkedin, href: BRAND.socials.linkedin, label: "LinkedIn" },
                    { icon: Facebook, href: BRAND.socials.facebook, label: "Facebook" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-sm bg-[#0B1F3A] hover:bg-[#D4AF37] flex items-center justify-center text-white hover:text-[#061426] transition-all duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-[#0B1F3A] rounded-sm p-6">
                <h3 className="font-display font-bold text-white text-base mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between text-white/70">
                    <span>Monday – Friday</span>
                    <span className="text-[#D4AF37]">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Saturday</span>
                    <span className="text-[#D4AF37]">10:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Sunday</span>
                    <span className="text-white/40">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-100 rounded-sm p-8 lg:p-10 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-2">Send a Message</h2>
                <p className="text-gray-500 text-sm mb-8 font-body">We typically respond within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 000 000 0000"
                      className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Interested Branch</label>
                      <select
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors bg-white"
                      >
                        <option value="">Select a branch</option>
                        {BRANCHES_LIST.map((b) => (
                          <option key={b.value} value={b.value}>{b.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Service</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        disabled={!form.branch}
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors bg-white disabled:opacity-50"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono-accent text-[#0B1F3A] text-xs tracking-widest uppercase mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project or enquiry..."
                      className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm font-body text-[#0B1F3A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold rounded-sm w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {submitting ? "Sending..." : (
                      <>Send Message <Send size={16} /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

