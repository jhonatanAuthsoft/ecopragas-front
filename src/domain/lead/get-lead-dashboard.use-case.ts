import { useCustomQuery } from "@/domain/custom-query";
import { getLeadDashboardDatasource } from "@/rest/lead";

export function useGetLeadDashboard() {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: ["get-lead-dashboard"],
    queryFn: getLeadDashboardDatasource,
  });

  return {
    dashboard: data?.data,
    dashboardError: error,
    isDashboardLoading: isLoading,
    refetchDashboard: refetch,
  };
}
