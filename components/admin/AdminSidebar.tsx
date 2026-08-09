"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  Cpu,
  Building2,
  CalendarCheck,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Monogram } from "@/components/Mark";

const SECTIONS = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Fashion",
    items: [
      { href: "/admin/fashion-products", label: "Products", icon: Shirt },
      { href: "/admin/fashion-projects", label: "Projects", icon: Shirt },
    ],
  },
  {
    label: "AI Automation",
    items: [
      { href: "/admin/automation-services", label: "Services", icon: Cpu },
      { href: "/admin/automation-projects", label: "Projects", icon: Cpu },
    ],
  },
  {
    label: "Real Estate",
    items: [
      { href: "/admin/properties", label: "Properties", icon: Building2 },
      { href: "/admin/inspections", label: "Inspections", icon: CalendarCheck },
    ],
  },
  {
    label: "Business",
    items: [
      { href: "/admin/leads", label: "Leads", icon: Users },
      { href: "/admin/media", label: "Media Library", icon: ImageIcon },
      { href: "/admin/messages", label: "Messages", icon: MessageSquare },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-navy-deep">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <Monogram className="h-7 w-7" />
        <div>
          <p className="font-display text-sm font-medium leading-tight text-white">Smilish Group</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
              {section.label}
            </p>
            <div className="mt-2 space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
