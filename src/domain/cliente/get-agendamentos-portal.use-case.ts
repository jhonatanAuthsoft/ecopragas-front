import { useQuery } from "@tanstack/react-query";
import { getAgendamentosPortalDatasource } from "@/rest/cliente/cliente.datasource";

export function useGetAgendamentosPortal() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAgendamentosPortal"],
    queryFn: () => getAgendamentosPortalDatasource(),
  });

  return {
    agendamentosData: data,
    isGetAgendamentosLoading: isLoading,
    isGetAgendamentosError: isError,
    getAgendamentosError: error,
  };
}
