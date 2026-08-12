import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { FashionProjectForm } from "@/components/admin/FashionProjectForm";

export default function NewFashionProjectPage() {
  return (
    <div>
      <Link href="/admin/fashion-projects" className="flex items-center gap-1.5 text-sm font-medium text-navy/60 hover:text-navy">
        <ChevronLeft size={16} /> Back to Projects
      </Link>
      <h1 className="mt-6 font-display text-2xl font-medium text-navy-deep">New Project</h1>
      <div className="mt-8">
        <FashionProjectForm />
      </div>
    </div>
  );
}
