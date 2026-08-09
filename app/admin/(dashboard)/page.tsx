import { createClient } from "@/lib/supabase/server";
import { Shirt, Cpu, Building2, CalendarCheck, Users, MessageSquare } from "lucide-react";

async function getCounts() {
  const supabase = await createClient();

  const [products, properties, leads, inspections, messages, automationServices] =
    await Promise.all([
      supabase.from("fashion_products").select("id", { count: "exact", head: true }),
      supabase.from("properties").select("id", { count: "exact", head: true }),
      supabase.from("leads").select("id", { count: "exact", head: true }),
      supabase
        .from("property_inspections")
        .select("id", { count: "exact", head: true })
        .eq("status", "Pending"),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
      supabase.from("automation_services").select("id", { count: "exact", head: true }),
    ]);

  return {
    products: products.count ?? 0,
    properties: properties.count ?? 0,
    leads: leads.count ?? 0,
    pendingInspections: inspections.count ?? 0,
    unreadMessages: messages.count ?? 0,
    automationServices: automationServices.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const stats = [
    { icon: Shirt, label: "Fashion Products", value: counts.products, href: "/admin/fashion-products" },
    { icon: Cpu, label: "Automation Services", value: counts.automationServices, href: "/admin/automation-services" },
    { icon: Building2, label: "Properties", value: counts.properties, href: "/admin/properties" },
    { icon: CalendarCheck, label: "Pending Inspections", value: counts.pendingInspections, href: "/admin/inspections" },
    { icon: Users, label: "Total Leads", value: counts.leads, href: "/admin/leads" },
    { icon: MessageSquare, label: "Unread Messages", value: counts.unreadMessages, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-navy-deep">Overview</h1>
      <p className="mt-1 text-sm text-navy/55">A snapshot of everything across the group.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-line bg-white p-6 transition-colors hover:border-navy/25"
          >
            <s.icon size={18} className="text-navy/50" />
            <p className="mt-4 font-display text-3xl font-medium text-navy-deep">{s.value}</p>
            <p className="mt-1 text-sm text-navy/55">{s.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
