import { useCustomQuery } from "@/domain/custom-query";
import type { ListAgendamentosParams } from "@/model/rest/agendamento";
import { listAgendamentosDatasource } from "@/rest/agendamento";

export const LIST_AGENDAMENTOS_QUERY_KEY = "list-agendamentos";

export function useListAgendamentos(params: ListAgendamentosParams = {}) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [LIST_AGENDAMENTOS_QUERY_KEY, params],
    queryFn: () => listAgendamentosDatasource(params),
  });

  return {
    agendamentos: data?.data ?? [],
    pagination: data?.pagination,
    listAgendamentosError: error,
    isListAgendamentosLoading: isLoading,
    refetchAgendamentos: refetch,
  };
}
