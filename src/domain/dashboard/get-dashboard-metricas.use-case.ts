import { useCustomQuery } from "@/domain/custom-query";
import type { GetDashboardMetricasParams } from "@/model/rest/dashboard";
import { getDashboardMetricasDatasource } from "@/rest/dashboard";

export const GET_DASHBOARD_METRICAS_QUERY_KEY = "get-dashboard-metricas";

export function useGetDashboardMetricas(params?: GetDashboardMetricasParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [GET_DASHBOARD_METRICAS_QUERY_KEY, params],
    queryFn: () => getDashboardMetricasDatasource(params),
  });

  return {
    metricas: data?.data,
    metricasError: error,
    isMetricasLoading: isLoading,
    refetchMetricas: refetch,
  };
}
