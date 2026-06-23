import { useCustomQuery } from "@/domain/custom-query";
import type { ListClientesParams } from "@/model/rest/cliente";
import { listClientesDatasource } from "@/rest/cliente";

export function useListClientes(params: ListClientesParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: ["list-clientes", params],
    queryFn: () => listClientesDatasource(params),
  });

  return {
    clientes: data?.data ?? [],
    pagination: data?.pagination,
    listClientesError: error,
    isListClientesLoading: isLoading,
    refetchClientes: refetch,
  };
}
