import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Smilish Admin",
    template: "%s — Smilish Admin",
  },
  description: "Internal content management for Smilish Group.",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-mist font-body antialiased">{children}</body>
    </html>
  );
}
