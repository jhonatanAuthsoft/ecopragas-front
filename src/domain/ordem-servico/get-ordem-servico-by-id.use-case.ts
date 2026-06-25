import { useCustomQuery } from "@/domain/custom-query";
import type { GetOrdemServicoParams } from "@/model/rest/ordem-servico";
import { getOrdemServicoDatasource } from "@/rest/ordem-servico";

export function useGetOrdemServico(params: GetOrdemServicoParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: ["get-ordem-servico", params],
    queryFn: () => getOrdemServicoDatasource(params.id),
    enabled: !!params.id,
  });

  return {
    ordemServico: data?.data,
    getOrdemServicoError: error,
    isGetOrdemServicoLoading: isLoading,
    refetchOrdemServico: refetch,
  };
}
