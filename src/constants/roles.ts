export const ROLES = {
  ADMIN: "ADMIN",
  TECHNICIAN: "TECHNICIAN",
} as const;

export type Role = keyof typeof ROLES;
