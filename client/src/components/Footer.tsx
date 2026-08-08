// Smilish Group Footer — Deep Navy with Gold accents
import { Link } from "wouter";
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#061426] text-white">
      {/* Top CTA Band */}
      <div className="bg-[#0B1F3A] border-t border-[#D4AF37]/20">
        <div className="container py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <span className="section-label block mb-2">Ready to Begin?</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white">
                Let's Build Something <span className="text-[#D4AF37]">Valuable</span> Together
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-gold rounded-sm text-sm px-6 py-3">
                Work With Smilish
              </Link>
              <a
                href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold rounded-sm text-sm px-6 py-3 flex items-center gap-2"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-sm overflow-hidden bg-[#0B1F3A] border border-[#D4AF37]/30 flex items-center justify-center">
                <img src="/manus-storage/sg-logo_eda0d213.png" alt="SG" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <span className="block font-display font-bold text-white text-base leading-tight">SMILISH</span>
                <span className="block font-mono-accent text-[#D4AF37] text-[0.6rem] tracking-[0.2em] uppercase leading-none">GROUP</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              A modern African business group operating across fashion, AI automation and real estate.
            </p>
            <p className="font-display italic text-[#D4AF37] text-sm">
              Building Businesses. Creating Value.
            </p>
            <div className="flex items-center gap-3 mt-5">
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
                  className="w-9 h-9 rounded-sm bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Businesses */}
          <div>
            <h3 className="font-mono-accent text-[#D4AF37] text-xs tracking-widest uppercase mb-5">Our Businesses</h3>
            <ul className="space-y-3">
              {[
                { label: "Smilish Fashion", href: "/fashion" },
                { label: "AI Automation", href: "/automation" },
                { label: "Real Estate", href: "/real-estate" },
                { label: "Our Projects", href: "/projects" },
                { label: "About Us", href: "/about" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/60 hover:text-[#D4AF37] text-sm transition-colors font-body"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono-accent text-[#D4AF37] text-xs tracking-widest uppercase mb-5">Services</h3>
            <ul className="space-y-3">
              {[
                { label: "Custom Tailoring", href: "/fashion" },
                { label: "African Wear", href: "/fashion" },
                { label: "AI Customer Service", href: "/automation" },
                { label: "Lead Automation", href: "/automation" },
                { label: "Property Sales", href: "/real-estate" },
                { label: "Property Rentals", href: "/real-estate" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/60 hover:text-[#D4AF37] text-sm transition-colors font-body"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono-accent text-[#D4AF37] text-xs tracking-widest uppercase mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="text-white/60 hover:text-white text-sm transition-colors">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="text-white/60 hover:text-white text-sm transition-colors break-all">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">{BRAND.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={15} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-body">
            © {year} Smilish Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy Policy</Link>
            <Link href="/about" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
