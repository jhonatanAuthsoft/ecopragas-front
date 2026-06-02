import {
  BarChart3,
  Calendar,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Users, label: "CRM / Leads", path: ROUTES.LEADS },
  { icon: LayoutDashboard, label: "Dashboard", path: ROUTES.HOME },
  { icon: Users, label: "Clientes", path: ROUTES.CLIENT.BASE },
  { icon: ClipboardList, label: "Ordens de Serviço", path: ROUTES.SERVICE_ORDER.BASE },
  { icon: Calendar, label: "Agendamentos", path: ROUTES.SCHEDULING },
  { icon: BarChart3, label: "Relatórios", path: ROUTES.REPORT },
  { icon: Wrench, label: "Técnicos", path: ROUTES.TECHNICIAN },
];

export const Sidebar = ({ className }: { className?: string }) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen w-64 border-r border-border bg-sidebar transition-transform",
        className,
      )}
    >
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
          {/* TODO: alterar para ficar igual ao figma */}
          <Link
            to={ROUTES.HOME}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              location.pathname === ROUTES.HOME
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
