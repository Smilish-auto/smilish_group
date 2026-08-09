import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="min-h-screen flex-1 overflow-x-hidden px-6 py-8 sm:px-10 sm:py-10">
        {children}
      </main>
    </div>
  );
}
