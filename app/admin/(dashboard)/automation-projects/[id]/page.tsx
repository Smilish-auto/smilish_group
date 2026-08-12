import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AutomationProjectForm } from "@/components/admin/AutomationProjectForm";

export default async function EditAutomationProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("automation_projects").select("*").eq("id", id).single();

  if (!project) notFound();

  return (
    <div>
      <Link href="/admin/automation-projects" className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy">
        <ChevronLeft size={16} /> Back to Case Studies
      </Link>
      <h1 className="mt-6 font-display text-2xl font-medium text-navy-deep">Edit Case Study</h1>
      <div className="mt-8">
        <AutomationProjectForm project={project} />
      </div>
    </div>
  );
}
