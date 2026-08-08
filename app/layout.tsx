import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://smilishgroup.com"),
  title: {
    default: "Smilish Group — Fashion. Technology. Real Estate.",
    template: "%s — Smilish Group",
  },
  description:
    "Smilish Group is a modern African business group building valuable businesses across fashion, AI automation and real estate.",
  openGraph: {
    title: "Smilish Group — Building Businesses. Creating Value.",
    description:
      "Fashion. Technology. Real Estate. One group, three businesses building long-term value.",
    siteName: "Smilish Group",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
