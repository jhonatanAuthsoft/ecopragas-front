import type { components, operations } from "../api-types";

export type DashboardVisaoGeral = components["schemas"]["DashboardVisaoGeralDTO"];
export type DashboardMetricas = components["schemas"]["DashboardMetricasDTO"];
export type ClienteRecente = components["schemas"]["ClienteRecenteDTO"];

export type GetDashboardVisaoGeralParams =
  operations["dashboard_obter_visao_geral"]["parameters"]["query"];
export type DashboardVisaoGeralResponse =
  components["schemas"]["StandardResponseDashboardVisaoGeralDTO"];

export type DashboardMetricasResponse =
  components["schemas"]["StandardResponseDashboardMetricasDTO"];
