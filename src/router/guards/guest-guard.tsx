import { Navigate, Outlet } from "react-router-dom";
import { PageLoader } from "@/atomic/atm.page-loader";
import { useAuthHydration } from "@/hooks/use-auth-hydration";
import { getDefaultAuthenticatedRoute } from "@/router/get-default-authenticated-route";
import { useAuthStore } from "@/store/auth";

interface GuestGuardProps {
  redirectTo?: string;
}

export function GuestGuard({ redirectTo }: GuestGuardProps = {}) {
  const hydrated = useAuthHydration();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  if (!hydrated) {
    return <PageLoader />;
  }

  if (token) {
    return <Navigate to={redirectTo ?? getDefaultAuthenticatedRoute(user?.perfil)} replace />;
  }

  return <Outlet />;
}
