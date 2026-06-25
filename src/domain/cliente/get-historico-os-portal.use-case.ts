import { useQuery } from "@tanstack/react-query";
import type { HistoricoOsPortalParams } from "@/model/rest/cliente";
import { getHistoricoOsPortalDatasource } from "@/rest/cliente/cliente.datasource";

export function useGetHistoricoOsPortal(params: HistoricoOsPortalParams) {
  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ["getHistoricoOsPortal", params],
    queryFn: () => getHistoricoOsPortalDatasource(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    historicoOsData: data,
    isGetHistoricoOsLoading: isLoading,
    isGetHistoricoOsError: isError,
    getHistoricoOsError: error,
    isGetHistoricoOsPlaceholderData: isPlaceholderData,
  };
}
