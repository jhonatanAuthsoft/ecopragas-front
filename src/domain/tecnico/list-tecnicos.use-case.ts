import { useCustomQuery } from "@/domain/custom-query";
import type { ListTecnicosParams } from "@/model/rest/tecnico";
import { listTecnicosDatasource } from "@/rest/tecnico";

export const LIST_TECNICOS_QUERY_KEY = "list-tecnicos";

export function useListTecnicos(params: ListTecnicosParams = {}) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [LIST_TECNICOS_QUERY_KEY, params],
    queryFn: () => listTecnicosDatasource(params),
  });

  return {
    tecnicos: data?.data ?? [],
    pagination: data?.pagination,
    listTecnicosError: error,
    isListTecnicosLoading: isLoading,
    refetchTecnicos: refetch,
  };
}
