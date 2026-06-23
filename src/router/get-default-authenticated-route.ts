import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import type { AuthUser } from "@/model/rest/auth";

export function getDefaultAuthenticatedRoute(perfil?: AuthUser["perfil"]) {
  if (perfil === ROLES.TECNICO) return ROUTES.TECHNICIAN_SCHEDULING;
  if (perfil === ROLES.CLIENTE) return ROUTES.CLIENT_SERVICES;
  return ROUTES.ADMIN.HOME;
}
