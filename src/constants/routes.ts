export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
  },
  HOME: "/",
  LEADS: "/leads",
  CLIENT: {
    BASE: "/admin/client",
    DETAILS: "/admin/client/:id",
  },
  SERVICE_ORDER: {
    BASE: "/admin/service-order",
    DETAILS: "/admin/service-order/:id",
  },
  SCHEDULING: "/admin/scheduling",
  REPORT: "/admin/report",
  TECHNICIAN: "/admin/technician",
  // TODO: apagar ao inserir as páginas de tecnico e cliente
  TEMPORARY_FALLBACK: {
    TECNICO: "/temporary-fallback/technician",
    CLIENTE: "/temporary-fallback/client",
  },
};
