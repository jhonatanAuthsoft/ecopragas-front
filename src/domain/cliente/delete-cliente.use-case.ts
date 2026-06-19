import { useCustomMutation } from "@/domain/custom-mutation";
import type { DeleteClienteParams } from "@/model/rest/cliente";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { deleteClienteDatasource } from "@/rest/cliente";

export function useDeleteCliente(params: UseCaseBaseParams<void> = {}) {
  const {
    mutate: deleteCliente,
    error,
    isLoading,
  } = useCustomMutation<void, DeleteClienteParams>({
    mutationFn: deleteClienteDatasource,
    ...params,
  });

  return {
    deleteCliente,
    deleteClienteError: error,
    isDeleteClienteLoading: isLoading,
  };
}
