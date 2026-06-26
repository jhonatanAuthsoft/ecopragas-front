import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type {
  EditAgendamentoInput,
  EditAgendamentoParams,
  EditAgendamentoResponse,
} from "@/model/rest/agendamento";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { editAgendamentoDatasource } from "@/rest/agendamento";
import { GET_AGENDAMENTO_QUERY_KEY } from "./get-agendamento-by-id.use-case";
import { LIST_AGENDAMENTOS_QUERY_KEY } from "./list-agendamentos.use-case";

export function useEditAgendamento(params: UseCaseBaseParams<EditAgendamentoResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled } = params;

  const {
    mutate: editAgendamento,
    mutateAsync: editAgendamentoAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<
    EditAgendamentoResponse,
    EditAgendamentoParams & { body: EditAgendamentoInput }
  >({
    mutationFn: ({ id, body }) => editAgendamentoDatasource({ id }, body),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_AGENDAMENTOS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_AGENDAMENTO_QUERY_KEY] });
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return {
    editAgendamento,
    editAgendamentoAsync,
    editAgendamentoData: data,
    editAgendamentoError: error,
    isEditAgendamentoLoading: isLoading,
  };
}
