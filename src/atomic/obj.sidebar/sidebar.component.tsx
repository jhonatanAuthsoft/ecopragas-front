import {
  BarChart3,
  Bug,
  Calendar,
  ClipboardList,
  DollarSign,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Users, label: "CRM / Leads", path: "/leads" },
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Clientes", path: "/admin/clientes" },
  { icon: ClipboardList, label: "Ordens de Serviço", path: "/admin/ordens-servico" },
  { icon: Calendar, label: "Agendamentos", path: "/admin/agendamentos" },
  { icon: BarChart3, label: "Relatórios", path: "/admin/relatorios" },
  { icon: Wrench, label: "Técnicos", path: "/admin/tecnicos" },
];

export const Sidebar = ({ className }: { className?: string }) => {
  const location = useLocation();

  return (
    <aside className={cn("h-screen w-64 border-r border-border bg-sidebar transition-transform", className)}>
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-sidebar-border px-6">
          <div>
            <img src="/logo.png" alt="" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-sidebar-accent text-brand-cta-dark"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-grayscale-black",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Settings */}
        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/configuracoes"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              location.pathname === "/configuracoes"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Configurações</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
