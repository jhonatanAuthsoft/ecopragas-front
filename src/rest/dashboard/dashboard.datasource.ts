import type {
  DashboardMetricasResponse,
  DashboardVisaoGeralResponse,
  GetDashboardMetricasParams,
  GetDashboardVisaoGeralParams,
} from "@/model/rest/dashboard";
import { serverRequest } from "@/rest/server-request";

export async function getDashboardVisaoGeralDatasource(params?: GetDashboardVisaoGeralParams) {
  const { data } = await serverRequest.get<DashboardVisaoGeralResponse>("/dashboard/visao-geral", {
    params,
  });
  return data;
}

export async function getDashboardMetricasDatasource(params?: GetDashboardMetricasParams) {
  const { data } = await serverRequest.get<DashboardMetricasResponse>("/dashboard/metricas", {
    params,
  });
  return data;
}
