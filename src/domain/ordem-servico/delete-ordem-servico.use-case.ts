import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { DeleteOrdemServicoParams } from "@/model/rest/ordem-servico";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { deleteOrdemServicoDatasource } from "@/rest/ordem-servico";
import { GET_ORDEM_SERVICO_METRICAS_QUERY_KEY } from "./get-ordem-servico-metricas.use-case";
import { LIST_ORDENS_SERVICO_QUERY_KEY } from "./list-ordens-servico.use-case";

export function useDeleteOrdemServico(params: UseCaseBaseParams<void> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled } = params;

  const {
    mutate: deleteOrdemServico,
    mutateAsync: deleteOrdemServicoAsync,
    error,
    isLoading,
  } = useCustomMutation<void, DeleteOrdemServicoParams>({
    mutationFn: deleteOrdemServicoDatasource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_ORDENS_SERVICO_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ORDEM_SERVICO_METRICAS_QUERY_KEY] });
      onSuccess?.();
    },
    onError,
    onSettled,
  });

  return {
    deleteOrdemServico,
    deleteOrdemServicoAsync,
    deleteOrdemServicoError: error,
    isDeleteOrdemServicoLoading: isLoading,
  };
}
