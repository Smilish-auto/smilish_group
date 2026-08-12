import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AutomationServiceForm } from "@/components/admin/AutomationServiceForm";

export default function NewAutomationServicePage() {
  return (
    <div>
      <Link href="/admin/automation-services" className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy">
        <ChevronLeft size={16} /> Back to Services
      </Link>
      <h1 className="mt-6 font-display text-2xl font-medium text-navy-deep">New Service</h1>
      <div className="mt-8">
        <AutomationServiceForm />
      </div>
    </div>
  );
}
