import { useCustomMutation } from "@/domain/custom-mutation";
import type { EditClienteMutationParams, EditClienteResponse } from "@/model/rest/cliente";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { editClienteDatasource } from "@/rest/cliente";

export function useEditCliente(params: UseCaseBaseParams<EditClienteResponse> = {}) {
  const {
    mutate: editCliente,
    data,
    error,
    isLoading,
  } = useCustomMutation<EditClienteResponse, EditClienteMutationParams>({
    mutationFn: editClienteDatasource,
    ...params,
  });

  return {
    editCliente,
    editClienteData: data,
    editClienteError: error,
    isEditClienteLoading: isLoading,
  };
}
