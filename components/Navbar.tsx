"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Monogram } from "./Mark";
import { Button } from "./Button";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/fashion", label: "Fashion" },
  { href: "/automation", label: "AI Automation" },
  { href: "/real-estate", label: "Real Estate" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-navy-deep/95 backdrop-blur" : "bg-navy-deep"
      } border-b border-white/10`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="Smilish Group home">
          <Monogram className="h-8 w-8" />
          <span className="font-display text-lg font-medium tracking-wide text-white">
            Smilish Group
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-gold" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Button href="/contact" variant="gold" className="!px-5 !py-2.5 text-xs">
            Work With Smilish
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy-deep px-5 pb-6 pt-2 md:hidden">
          <div className="flex flex-col">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 text-sm font-medium text-white/85"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button href="/contact" variant="gold" className="mt-5 w-full" onClick={() => setOpen(false)}>
            Work With Smilish
          </Button>
        </div>
      )}
    </header>
  );
}
