import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AutomationProjectForm } from "@/components/admin/AutomationProjectForm";

export default function NewAutomationProjectPage() {
  return (
    <div>
      <Link href="/admin/automation-projects" className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy">
        <ChevronLeft size={16} /> Back to Case Studies
      </Link>
      <h1 className="mt-6 font-display text-2xl font-medium text-navy-deep">New Case Study</h1>
      <div className="mt-8">
        <AutomationProjectForm />
      </div>
    </div>
  );
}
