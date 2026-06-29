import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type {
  EditOrdemServicoInput,
  EditOrdemServicoParams,
  EditOrdemServicoResponse,
} from "@/model/rest/ordem-servico";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { editOrdemServicoDatasource } from "@/rest/ordem-servico";
import { GET_ORDEM_SERVICO_METRICAS_QUERY_KEY } from "./get-ordem-servico-metricas.use-case";
import { LIST_ORDENS_SERVICO_QUERY_KEY } from "./list-ordens-servico.use-case";

export function useEditOrdemServico(params: UseCaseBaseParams<EditOrdemServicoResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled } = params;

  const {
    mutate: editOrdemServico,
    mutateAsync: editOrdemServicoAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<
    EditOrdemServicoResponse,
    EditOrdemServicoParams & { body: EditOrdemServicoInput }
  >({
    mutationFn: ({ id, body }) => editOrdemServicoDatasource({ id }, body),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_ORDENS_SERVICO_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ORDEM_SERVICO_METRICAS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ["get-ordem-servico"] });
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return {
    editOrdemServico,
    editOrdemServicoAsync,
    editOrdemServicoData: data,
    editOrdemServicoError: error,
    isEditOrdemServicoLoading: isLoading,
  };
}
