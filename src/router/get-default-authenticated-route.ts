import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import type { AuthUser } from "@/model/rest/auth";

export function getDefaultAuthenticatedRoute(perfil?: AuthUser["perfil"]) {
  if (perfil === ROLES.TECNICO) return ROUTES.HOME;
  if (perfil === ROLES.CLIENTE) return ROUTES.HOME;
  return ROUTES.HOME;
}
