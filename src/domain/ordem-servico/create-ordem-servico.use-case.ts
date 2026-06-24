import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type {
  CadastrarOrdemServicoInput,
  CadastrarOrdemServicoResponse,
} from "@/model/rest/ordem-servico";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { cadastrarOrdemServicoDatasource } from "@/rest/ordem-servico";
import { LIST_ORDENS_SERVICO_QUERY_KEY } from "./list-ordens-servico.use-case";

export function useCreateOrdemServico(
  params: UseCaseBaseParams<CadastrarOrdemServicoResponse> = {},
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled } = params;

  const {
    mutate: createOrdemServico,
    mutateAsync: createOrdemServicoAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<CadastrarOrdemServicoResponse, CadastrarOrdemServicoInput>({
    mutationFn: cadastrarOrdemServicoDatasource,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_ORDENS_SERVICO_QUERY_KEY] });
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return {
    createOrdemServico,
    createOrdemServicoAsync,
    createOrdemServicoData: data,
    createOrdemServicoError: error,
    isCreateOrdemServicoLoading: isLoading,
  };
}
