import { useCustomQuery } from "@/domain/custom-query";
import type { GetClienteParams } from "@/model/rest/cliente";
import { getClienteDatasource } from "@/rest/cliente";

export function useGetCliente(params: GetClienteParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: ["get-cliente", params],
    queryFn: () => getClienteDatasource(params.id),
    enabled: !!params.id,
  });

  return {
    cliente: data?.data,
    getClienteError: error,
    isGetClienteLoading: isLoading,
    refetchCliente: refetch,
  };
}
