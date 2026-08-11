// Smilish Group Navbar
// Prestige Navy & Gold — transparent over hero, navy/95 on scroll
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Businesses",
    href: "#",
    children: [
      { label: "Smilish Fashion", href: "/fashion" },
      { label: "AI Automation", href: "/automation" },
      { label: "Real Estate", href: "/real-estate" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const isActive = (href: string) => location === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#0B1F3A]/95 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-sm overflow-hidden bg-[#061426] border border-[#D4AF37]/30 flex items-center justify-center">
              <img
                src="/manus-storage/sg-logo_eda0d213.png"
                alt="SG"
                className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
              />
            </div>
            <div>
              <span
                className="block font-display font-bold text-white text-base lg:text-lg leading-tight tracking-wide"
              >
                SMILISH
              </span>
              <span className="block font-mono-accent text-[#D4AF37] text-[0.6rem] tracking-[0.2em] uppercase leading-none">
                GROUP
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 text-white/90 hover:text-white font-body text-sm font-medium nav-link-gold transition-colors"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-[#0B1F3A] border border-[#D4AF37]/20 shadow-2xl rounded-sm overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-white/80 hover:text-white hover:bg-[#D4AF37]/10 font-body text-sm transition-colors border-b border-white/5 last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link-gold font-body text-sm font-medium transition-colors ${
                    isActive(link.href) ? "text-[#D4AF37] active" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden lg:inline-flex btn-gold text-sm px-5 py-2.5 rounded-sm"
            >
              Work With Smilish
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0B1F3A] border-t border-white/10">
          <div className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-3 py-2 text-[#D4AF37] font-mono-accent text-xs tracking-widest uppercase">
                    {link.label}
                  </div>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2.5 text-white/80 hover:text-white font-body text-sm transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 font-body text-sm font-medium rounded-sm transition-colors ${
                    isActive(link.href)
                      ? "text-[#D4AF37] bg-[#D4AF37]/10"
                      : "text-white/90 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-white/10 mt-2">
              <Link href="/contact" className="btn-gold w-full text-center rounded-sm py-3">
                Work With Smilish
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
