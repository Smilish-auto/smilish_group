import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AutomationServiceForm } from "@/components/admin/AutomationServiceForm";

export default async function EditAutomationServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase.from("automation_services").select("*").eq("id", id).single();

  if (!service) notFound();

  return (
    <div>
      <Link href="/admin/automation-services" className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy">
        <ChevronLeft size={16} /> Back to Services
      </Link>
      <h1 className="mt-6 font-display text-2xl font-medium text-navy-deep">Edit Service</h1>
      <div className="mt-8">
        <AutomationServiceForm service={service} />
      </div>
    </div>
  );
}
