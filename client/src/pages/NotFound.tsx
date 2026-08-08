// Smilish Group — 404 Not Found Page
import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#061426] flex items-center justify-center pt-20">
        <div className="container text-center max-w-xl">
          <div className="font-display text-[10rem] font-bold text-[#D4AF37]/10 leading-none select-none mb-0">
            404
          </div>
          <div className="-mt-8">
            <span className="section-label block mb-3">Page Not Found</span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              This Page Doesn't Exist
            </h1>
            <p className="text-white/60 font-body mb-8">
              The page you're looking for may have been moved, deleted or never existed. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-gold rounded-sm px-8 py-3">
                Go to Homepage
              </Link>
              <Link href="/contact" className="btn-outline-gold rounded-sm px-8 py-3">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
