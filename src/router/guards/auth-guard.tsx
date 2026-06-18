import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PageLoader } from '@/atomic/atm.page-loader';
import type { Role } from '@/constants/roles';
import { ROUTES } from '@/constants/routes';
import { useAuthHydration } from '@/hooks/use-auth-hydration';
import { useAuthStore } from '@/store/auth';
import { getDefaultAuthenticatedRoute } from '../get-default-authenticated-route';

interface AuthGuardProps {
  roles?: Role[];
  redirectTo?: string;
  unauthorizedRedirectTo?: string;
}

export function AuthGuard({
  roles,
  redirectTo = ROUTES.AUTH.LOGIN,
  unauthorizedRedirectTo,
}: AuthGuardProps = {}) {
  const location = useLocation();
  const hydrated = useAuthHydration();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  if (!hydrated) {
    return <PageLoader />;
  }

  if (!token) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (roles?.length && (!user?.perfil || !roles.includes(user.perfil))) {
    return (
      <Navigate
        to={
          unauthorizedRedirectTo || getDefaultAuthenticatedRoute(user?.perfil)
        }
        replace
      />
    );
  }

  return <Outlet />;
}
