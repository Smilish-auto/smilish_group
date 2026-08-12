import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PropertyForm } from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div>
      <Link href="/admin/properties" className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy">
        <ChevronLeft size={16} /> Back to Properties
      </Link>
      <h1 className="mt-6 font-display text-2xl font-medium text-navy-deep">New Property</h1>
      <div className="mt-8">
        <PropertyForm />
      </div>
    </div>
  );
}
