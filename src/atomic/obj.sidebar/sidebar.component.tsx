import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDoubleLeftIcon } from "@/assets/icons/chevron-double-left";
import { Button } from "@/atomic/atm.button/button.component";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/atomic/mol.tooltip/tooltip.component";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_EXPANDED, useSidebarStore } from "@/store/sidebar";
import { H4 } from "@/atomic/atm.typography";
import { UserPlusIcon } from "@/assets/icons/user-plus";
import { Squares2x2Icon } from "@/assets/icons/squares-2x2";
import { UsersIcon } from "@/assets/icons/users";
import { ClipboardDocumentListIcon } from "@/assets/icons/clipboard-document-list";
import { CalendarIcon } from "@/assets/icons/calendar";
import { ChartBarIcon } from "@/assets/icons/chart-bar";
import { WrenchScrewdriverIcon } from "@/assets/icons/wrench-screwdriver";

const menuItems = [
  { icon: UserPlusIcon, label: "CRM / Leads", path: ROUTES.LEADS },
  { icon: Squares2x2Icon, label: "Dashboard", path: ROUTES.HOME },
  { icon: UsersIcon, label: "Clientes", path: ROUTES.CLIENT.BASE },
  { icon: ClipboardDocumentListIcon, label: "Ordens de Serviço", path: ROUTES.SERVICE_ORDER.BASE },
  { icon: CalendarIcon, label: "Agendamentos", path: ROUTES.SCHEDULING },
  { icon: ChartBarIcon, label: "Relatórios", path: ROUTES.REPORT },
  { icon: WrenchScrewdriverIcon, label: "Técnicos", path: ROUTES.TECHNICIAN },
];

export const Sidebar = ({ className }: { className?: string }) => {
  const location = useLocation();
  const isMinimized = useSidebarStore((state) => state.isMinimized);
  const toggleMinimized = useSidebarStore((state) => state.toggleMinimized);

  return (
    <aside
      className={cn(
        "h-screen border-r border-border bg-sidebar transition-all duration-300",
        isMinimized ? `w-[${SIDEBAR_WIDTH_COLLAPSED}px]` : `w-[${SIDEBAR_WIDTH_EXPANDED}px]`,
        className,
      )}
    >
      <div className="flex h-full flex-col">
        <div
          className={cn(
            "flex h-16 items-center border-sidebar-border pt-lg",
            isMinimized ? "justify-center px-2" : "gap-2 px-lg",
          )}
        >
          <img
            src={isMinimized ? "/mini-logo.png" : "/logo.png"}
            alt=""
            className={cn(isMinimized ? "pt-md" : "w-full pt-sm")}
          />
        </div>

        <nav className={cn("flex-1 overflow-hidden py-xl", isMinimized ? "px-2" : "px-md")}>
          <ul className="flex flex-col gap-md">
            <li>
              {isMinimized ? (
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <ToggleButton isMinimized={isMinimized} toggleMinimized={toggleMinimized} />
                  </TooltipTrigger>
                  <TooltipContent side="right">Expandir</TooltipContent>
                </Tooltip>
              ) : (
                <ToggleButton isMinimized={isMinimized} toggleMinimized={toggleMinimized} />
              )}
            </li>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={location.pathname === item.path}
                  isMinimized={isMinimized}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border pt-2xs px-md pb-lg">
          <AccountItem isMinimized={isMinimized} />
        </div>
      </div>
    </aside>
  );
};

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  isMinimized: boolean;
};

const NavItem = ({ icon: Icon, label, path, isActive, isMinimized }: NavItemProps) => {
  const link = (
    <Link
      to={path}
      className={cn(
        "flex items-center rounded-lg text-sm transition-all whitespace-nowrap",
        isMinimized ? "justify-center p-2.5" : "gap-[10px] px-3 py-2.5",
        isActive
          ? "font-bold bg-sidebar-accent text-brand-cta-dark"
          : "font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-grayscale-black",
      )}
    >
      <Icon className="size-lg shrink-0" title={label} />
      {!isMinimized && <span>{label}</span>}
    </Link>
  );

  if (isMinimized) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return link;
};

interface AccountItemProps {
  isMinimized: boolean;
}

const AccountItem = ({ isMinimized }: AccountItemProps) => {
  const username = "Nome do usuário";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className={cn("flex items-center gap-xs py-2xs", !isMinimized && "px-xs")}>
      <div className="shrink-0 flex items-center justify-center size-[40px] bg-brand-accessory-green rounded-full">
        <H4 className="text-white">{initials}</H4>
      </div>
      {!isMinimized && <H4 className="text-grayscale-medium truncate">{username}</H4>}
      <ChevronDown className="size-[20px] text-grayscale-dark" />
    </div>
  );
};

interface ToggleButtonProps {
  isMinimized: boolean;
  toggleMinimized: () => void;
}

const ToggleButton = ({ isMinimized, toggleMinimized }: ToggleButtonProps) => {
  return (
    <Button
      className={cn(
        "hover:no-underline",
        isMinimized ? "w-full justify-center p-2xs" : "w-full justify-start pl-2xs py-2xs",
      )}
      variant="link"
      leftIcon={
        <ChevronDoubleLeftIcon
          className={cn("size-md transition-transform", isMinimized && "rotate-180")}
        />
      }
      onClick={toggleMinimized}
    >
      {!isMinimized && "Minimizar"}
    </Button>
  );
};
