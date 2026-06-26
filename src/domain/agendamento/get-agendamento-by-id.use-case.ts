import { useCustomQuery } from "@/domain/custom-query";
import type { GetAgendamentoParams } from "@/model/rest/agendamento";
import { getAgendamentoDatasource } from "@/rest/agendamento";

export const GET_AGENDAMENTO_QUERY_KEY = "get-agendamento";

export function useGetAgendamento(params: GetAgendamentoParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [GET_AGENDAMENTO_QUERY_KEY, params],
    queryFn: () => getAgendamentoDatasource(params.id),
    enabled: !!params.id,
  });

  return {
    agendamento: data?.data,
    getAgendamentoError: error,
    isGetAgendamentoLoading: isLoading,
    refetchAgendamento: refetch,
  };
}
