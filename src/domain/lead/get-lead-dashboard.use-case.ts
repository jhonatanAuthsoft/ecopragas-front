import { useCustomQuery } from "@/domain/custom-query";
import { getLeadDashboardDatasource } from "@/rest/lead";

export const GET_LEAD_DASHBOARD_QUERY_KEY = "get-lead-dashboard";

export function useGetLeadDashboard() {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [GET_LEAD_DASHBOARD_QUERY_KEY],
    queryFn: getLeadDashboardDatasource,
  });

  return {
    dashboard: data?.data,
    dashboardError: error,
    isDashboardLoading: isLoading,
    refetchDashboard: refetch,
  };
}
