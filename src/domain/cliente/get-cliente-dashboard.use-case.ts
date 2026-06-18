import { useCustomQuery } from "@/domain/custom-query";
import { getClienteDashboardDatasource } from "@/rest/cliente";

export function useGetClienteDashboard() {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: ["get-cliente-dashboard"],
    queryFn: getClienteDashboardDatasource,
  });

  return {
    dashboard: data?.data,
    dashboardError: error,
    isDashboardLoading: isLoading,
    refetchDashboard: refetch,
  };
}
