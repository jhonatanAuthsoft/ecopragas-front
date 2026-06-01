export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  LEADS: "/leads",
  CLIENTES: {
    BASE: "/admin/clientes",
    DETAILS: "/admin/clientes/:id",
  },
  ORDENS_SERVICO: {
    BASE: "/admin/ordens-servico",
    DETAILS: "/admin/ordens-servico/:id",
  },
  AGENDAMENTOS: "/admin/agendamentos",
  RELATORIOS: "/admin/relatorios",
  TECNICOS: "/admin/tecnicos",
} as const;
