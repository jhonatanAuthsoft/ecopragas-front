import { useCustomQuery } from "@/domain/custom-query";
import { getUltimosServicosPortalDatasource } from "@/rest/cliente";
import type { UltimosServicosPortalParams } from "@/model/rest/cliente";

export function useGetUltimosServicosPortal(params?: UltimosServicosPortalParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: ["get-ultimos-servicos-portal", params],
    queryFn: () => getUltimosServicosPortalDatasource(params),
  });

  return {
    ultimosServicos: data?.data ?? [],
    pagination: data?.pagination,
    getUltimosServicosError: error,
    isGetUltimosServicosLoading: isLoading,
    refetchUltimosServicos: refetch,
  };
}
