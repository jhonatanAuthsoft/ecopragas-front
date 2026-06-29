import { useQuery } from "@tanstack/react-query";
import { getAgendamentosPortalDatasource } from "@/rest/cliente/cliente.datasource";

import type { AgendamentosPortalParams } from "@/model/rest/cliente";

export function useGetAgendamentosPortal(params: AgendamentosPortalParams) {
  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ["getAgendamentosPortal", params],
    queryFn: () => getAgendamentosPortalDatasource(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    agendamentosData: data,
    isGetAgendamentosLoading: isLoading,
    isGetAgendamentosError: isError,
    getAgendamentosError: error,
    isGetAgendamentosPlaceholderData: isPlaceholderData,
  };
}
