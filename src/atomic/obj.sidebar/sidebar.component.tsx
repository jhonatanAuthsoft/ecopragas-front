import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon } from "@/assets/icons/calendar";
import { ChartBarIcon } from "@/assets/icons/chart-bar";
import { ChevronDoubleLeftIcon } from "@/assets/icons/chevron-double-left";
import { ClipboardDocumentListIcon } from "@/assets/icons/clipboard-document-list";
import { Squares2x2Icon } from "@/assets/icons/squares-2x2";
import { UserPlusIcon } from "@/assets/icons/user-plus";
import { UsersIcon } from "@/assets/icons/users";
import { WrenchScrewdriverIcon } from "@/assets/icons/wrench-screwdriver";
import { Button } from "@/atomic/atm.button/button.component";
import { H4 } from "@/atomic/atm.typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/atomic/mol.tooltip/tooltip.component";
import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { useLogout } from "@/domain/auth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useSidebarStore } from "@/store/sidebar";
import { accountItemStyle } from "./sidebar.style";

const ADMIN_MENU = [
  { icon: UserPlusIcon, label: "CRM / Leads", path: ROUTES.LEADS },
  { icon: Squares2x2Icon, label: "Dashboard", path: ROUTES.HOME },
  { icon: UsersIcon, label: "Clientes", path: ROUTES.CLIENT.BASE },
  {
    icon: ClipboardDocumentListIcon,
    label: "Serviços",
    path: ROUTES.SERVICE_ORDER.BASE,
  },
  { icon: CalendarIcon, label: "Agendamentos", path: ROUTES.SCHEDULING },
  { icon: ChartBarIcon, label: "Relatórios", path: ROUTES.REPORT },
  { icon: WrenchScrewdriverIcon, label: "Técnicos", path: ROUTES.TECHNICIAN },
];

const TECHNICIAN_MENU = [
  { icon: CalendarIcon, label: "Agendamentos", path: ROUTES.SCHEDULING },
  {
    icon: WrenchScrewdriverIcon,
    label: "Serviços",
    path: ROUTES.SERVICE_ORDER.BASE,
  },
];

export const Sidebar = ({ className }: { className?: string }) => {
  const location = useLocation();
  const isMinimized = useSidebarStore((state) => state.isMinimized);
  const toggleMinimized = useSidebarStore((state) => state.toggleMinimized);
  const user = useAuthStore((state) => state.user);

  const menuItems = user?.perfil === ROLES.TECNICO ? TECHNICIAN_MENU : ADMIN_MENU;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 h-screen border-r border-border bg-sidebar transition-all duration-300",
        isMinimized ? "w-[100px]" : "w-[256px]",
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

        <AccountItem isMinimized={isMinimized} />
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const username = user?.nomeCompleto || "Usuário";
  const initials = username.slice(0, 2).toUpperCase();

  const { logout, isLogoutLoading } = useLogout({
    onSettled: () => {
      clearSession();
      navigate(ROUTES.AUTH.LOGIN);
    },
  });

  const styles = accountItemStyle({
    isMinimized,
    open,
  });

  const trigger = (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen((current) => !current)}
      className={styles.trigger()}
    >
      <div className={styles.avatar()}>
        <H4 className={styles.avatarText()}>{initials}</H4>
      </div>
      {!isMinimized && <H4 className={styles.username()}>{username}</H4>}
      <ChevronDown className={styles.chevron()} />
    </button>
  );

  return (
    <div className={styles.wrapper()}>
      <div className={styles.root()}>
        {isMinimized ? (
          <Tooltip>
            <TooltipTrigger asChild>{trigger}</TooltipTrigger>
            <TooltipContent side="right">{username}</TooltipContent>
          </Tooltip>
        ) : (
          trigger
        )}

        {open && (
          <div className={styles.expanded()}>
            <Button
              type="button"
              variant="ghost"
              fullWidth
              disabled={isLogoutLoading}
              onClick={() => logout()}
              className={styles.logoutButton()}
              leftIcon={<LogOut className={styles.logoutButtonIcon()} />}
            >
              {isMinimized ? "Sair" : "Sair da conta"}
            </Button>
          </div>
        )}
      </div>
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
