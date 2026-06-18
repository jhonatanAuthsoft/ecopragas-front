import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import type { AuthUser } from "@/model/rest/auth";

export function getDefaultAuthenticatedRoute(perfil?: AuthUser["perfil"]) {
  if (perfil === ROLES.TECNICO) return ROUTES.TEMPORARY_FALLBACK.TECNICO;
  if (perfil === ROLES.CLIENTE) return ROUTES.TEMPORARY_FALLBACK.CLIENTE;
  return ROUTES.HOME;
}
