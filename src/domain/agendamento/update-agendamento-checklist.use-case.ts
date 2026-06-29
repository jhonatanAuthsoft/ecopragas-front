import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type {
  AtualizarChecklistAgendamentoInput,
  AtualizarChecklistAgendamentoParams,
  AtualizarChecklistAgendamentoResponse,
} from "@/model/rest/agendamento";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { atualizarAgendamentoChecklistDatasource } from "@/rest/agendamento";
import { GET_AGENDAMENTO_QUERY_KEY } from "./get-agendamento-by-id.use-case";
import { LIST_AGENDAMENTOS_QUERY_KEY } from "./list-agendamentos.use-case";

export function useUpdateAgendamentoChecklist(
  params: UseCaseBaseParams<AtualizarChecklistAgendamentoResponse> = {},
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled } = params;

  const {
    mutate: updateAgendamentoChecklist,
    mutateAsync: updateAgendamentoChecklistAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<
    AtualizarChecklistAgendamentoResponse,
    AtualizarChecklistAgendamentoParams & { body: AtualizarChecklistAgendamentoInput }
  >({
    mutationFn: ({ id, body }) => atualizarAgendamentoChecklistDatasource({ id }, body),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_AGENDAMENTOS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_AGENDAMENTO_QUERY_KEY] });
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return {
    updateAgendamentoChecklist,
    updateAgendamentoChecklistAsync,
    updateAgendamentoChecklistData: data,
    updateAgendamentoChecklistError: error,
    isUpdateAgendamentoChecklistLoading: isLoading,
  };
}
