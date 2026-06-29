import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { DeleteAgendamentoParams } from "@/model/rest/agendamento";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { deleteAgendamentoDatasource } from "@/rest/agendamento";
import { GET_AGENDAMENTO_QUERY_KEY } from "./get-agendamento-by-id.use-case";
import { LIST_AGENDAMENTOS_QUERY_KEY } from "./list-agendamentos.use-case";

export function useDeleteAgendamento(params: UseCaseBaseParams<void> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled } = params;

  const {
    mutate: deleteAgendamento,
    mutateAsync: deleteAgendamentoAsync,
    error,
    isLoading,
  } = useCustomMutation<void, DeleteAgendamentoParams>({
    mutationFn: deleteAgendamentoDatasource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_AGENDAMENTOS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_AGENDAMENTO_QUERY_KEY] });
      onSuccess?.();
    },
    onError,
    onSettled,
  });

  return {
    deleteAgendamento,
    deleteAgendamentoAsync,
    deleteAgendamentoError: error,
    isDeleteAgendamentoLoading: isLoading,
  };
}
