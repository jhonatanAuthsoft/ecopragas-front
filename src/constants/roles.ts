import type { AuthUser } from "@/model/rest/auth";

export const ROLES: Record<AuthUser["perfil"], AuthUser["perfil"]> = {
  ADMINISTRATIVO: "ADMINISTRATIVO",
  TECNICO: "TECNICO",
  CLIENTE: "CLIENTE",
};

export type Role = keyof typeof ROLES;
