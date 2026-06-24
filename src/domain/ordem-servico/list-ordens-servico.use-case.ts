import { useCustomQuery } from "@/domain/custom-query";
import type { ListOrdensServicoParams } from "@/model/rest/ordem-servico";
import { listOrdensServicoDatasource } from "@/rest/ordem-servico";

export const LIST_ORDENS_SERVICO_QUERY_KEY = "list-ordens-servico";

export function useListOrdensServico(params: ListOrdensServicoParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [LIST_ORDENS_SERVICO_QUERY_KEY, params],
    queryFn: () => listOrdensServicoDatasource(params),
  });

  return {
    ordensServico: data?.data ?? [],
    pagination: data?.pagination,
    listOrdensServicoError: error,
    isListOrdensServicoLoading: isLoading,
    refetchOrdensServico: refetch,
  };
}
