import { useCustomQuery } from "@/domain/custom-query";
import type { GetDashboardVisaoGeralParams } from "@/model/rest/dashboard";
import { getDashboardVisaoGeralDatasource } from "@/rest/dashboard";

export const GET_DASHBOARD_VISAO_GERAL_QUERY_KEY = "get-dashboard-visao-geral";

export function useGetDashboardVisaoGeral(params?: GetDashboardVisaoGeralParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [GET_DASHBOARD_VISAO_GERAL_QUERY_KEY, params],
    queryFn: () => getDashboardVisaoGeralDatasource(params),
  });

  return {
    visaoGeral: data?.data,
    visaoGeralError: error,
    isVisaoGeralLoading: isLoading,
    refetchVisaoGeral: refetch,
  };
}
