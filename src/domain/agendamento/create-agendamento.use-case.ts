import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { CadastrarAgendamentoInput, CadastrarAgendamentoResponse } from "@/model/rest/agendamento";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { cadastrarAgendamentoDatasource } from "@/rest/agendamento";
import { LIST_AGENDAMENTOS_QUERY_KEY } from "./list-agendamentos.use-case";

export function useCreateAgendamento(params: UseCaseBaseParams<CadastrarAgendamentoResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled } = params;

  const {
    mutate: createAgendamento,
    mutateAsync: createAgendamentoAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<CadastrarAgendamentoResponse, CadastrarAgendamentoInput>({
    mutationFn: cadastrarAgendamentoDatasource,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_AGENDAMENTOS_QUERY_KEY] });
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return {
    createAgendamento,
    createAgendamentoAsync,
    createAgendamentoData: data,
    createAgendamentoError: error,
    isCreateAgendamentoLoading: isLoading,
  };
}
