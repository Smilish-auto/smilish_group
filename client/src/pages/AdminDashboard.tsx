import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Loader2, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AdminProductsPage from "./admin/AdminProducts";
import AdminPropertiesPage from "./admin/AdminProperties";
import AdminProjectsPage from "./admin/AdminProjects";
import AdminServicesPage from "./admin/AdminServices";
import AdminLeadsPage from "./admin/AdminLeads";
import AdminMessagesPage from "./admin/AdminMessages";
import AdminMediaPage from "./admin/AdminMedia";

type AdminTab = "products" | "properties" | "projects" | "services" | "leads" | "messages" | "media";

const ADMIN_PASSWORD = "admin123"; // Match server password

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if admin token exists in localStorage
    const token = localStorage.getItem("admin_token");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password === ADMIN_PASSWORD) {
        const token = Math.random().toString(36).substring(2, 15);
        localStorage.setItem("admin_token", token);
        setAuthenticated(true);
        setPassword("");
        toast.success("Admin login successful");
      } else {
        toast.error("Invalid password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setAuthenticated(false);
    setActiveTab("products");
    toast.success("Logged out successfully");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#061426] to-[#0B1F3A] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string }[] = [
    { id: "products", label: "Products" },
    { id: "properties", label: "Properties" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "leads", label: "Leads" },
    { id: "messages", label: "Messages" },
    { id: "media", label: "Media" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-[#0B1F3A] text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Smilish Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-[#D4AF37] text-[#0B1F3A] font-semibold"
                  : "hover:bg-white/10 text-white/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="text-sm text-gray-600">
            Welcome to Smilish Group Admin Dashboard
          </div>
          <div className="w-8" />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "products" && <AdminProductsPage />}
          {activeTab === "properties" && <AdminPropertiesPage />}
          {activeTab === "projects" && <AdminProjectsPage />}
          {activeTab === "services" && <AdminServicesPage />}
          {activeTab === "leads" && <AdminLeadsPage />}
          {activeTab === "messages" && <AdminMessagesPage />}
          {activeTab === "media" && <AdminMediaPage />}
        </div>
      </div>
    </div>
  );
}
