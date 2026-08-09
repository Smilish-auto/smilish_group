import Link from "next/link";
import { Button } from "@/components/Button";
import { TriMark } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <TriMark className="h-6" />
      <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-navy/40">404</p>
      <h1 className="text-balance mt-4 font-display text-3xl font-medium text-navy-deep sm:text-4xl">
        This page hasn&apos;t been built yet.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-navy/60">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Head back home or
        explore one of our businesses below.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Button href="/" variant="navy">
          Back to Home
        </Button>
        <Link href="/contact" className="text-sm font-medium text-navy/60 hover:text-navy">
          Contact Us
        </Link>
      </div>
    </section>
  );
}
