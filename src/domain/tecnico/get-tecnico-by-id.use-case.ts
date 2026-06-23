import { useCustomQuery } from "@/domain/custom-query";
import type { GetTecnicoParams } from "@/model/rest/tecnico";
import { getTecnicoDatasource } from "@/rest/tecnico";

export const GET_TECNICO_QUERY_KEY = "get-tecnico";

export function useGetTecnico(params: GetTecnicoParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [GET_TECNICO_QUERY_KEY, params],
    queryFn: () => getTecnicoDatasource(params.id),
    enabled: !!params.id,
  });

  return {
    tecnico: data?.data,
    getTecnicoError: error,
    isGetTecnicoLoading: isLoading,
    refetchTecnico: refetch,
  };
}
