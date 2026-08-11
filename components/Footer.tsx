import Link from "next/link";
import { AtSign, Mail, Phone, MessageCircle } from "lucide-react";
import { Monogram, TriMark } from "./Mark";

const COLUMNS = [
  {
    title: "Businesses",
    links: [
      { href: "/fashion", label: "Smilish Fashion" },
      { href: "/automation", label: "Smilish AI Automation" },
      { href: "/real-estate", label: "Smilish Real Estate" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Monogram className="h-8 w-8" />
              <span className="font-display text-lg font-medium text-white">Smilish Group</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Fashion. Technology. Real Estate. Building businesses. Creating value.
            </p>
            <TriMark className="mt-6" />
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/70 hover:text-gold-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">
              Get In Touch
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold-soft" />
                <a href="tel:+2347025567907" className="hover:text-gold-soft">
                  +234 702 556 7907
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-gold-soft" />
                <a href="mailto:smilishgroup@gmail.com" className="hover:text-gold-soft">
                  smilishgroup@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={15} className="text-gold-soft" />
                <a
                  href="https://wa.me/2349150107552"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-soft"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <AtSign size={15} className="text-gold-soft" />
                <a
                  href="https://instagram.com/smilishgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-soft"
                >
                  smilishgroup
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Smilish Group. All rights reserved.</p>
          <p className="font-mono">SG — Building Businesses. Creating Value.</p>
        </div>
      </div>
    </footer>
  );
}
