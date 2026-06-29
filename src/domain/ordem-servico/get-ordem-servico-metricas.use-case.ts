import { useCustomQuery } from "@/domain/custom-query";
import type { GetOrdemServicoMetricasParams } from "@/model/rest/ordem-servico";
import { getOrdemServicoMetricasDatasource } from "@/rest/ordem-servico";

export const GET_ORDEM_SERVICO_METRICAS_QUERY_KEY = "get-ordem-servico-metricas";

export function useGetOrdemServicoMetricas(params?: GetOrdemServicoMetricasParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [GET_ORDEM_SERVICO_METRICAS_QUERY_KEY, params],
    queryFn: () => getOrdemServicoMetricasDatasource(params),
  });

  return {
    metricas: data?.data,
    metricasError: error,
    isMetricasLoading: isLoading,
    refetchMetricas: refetch,
  };
}
