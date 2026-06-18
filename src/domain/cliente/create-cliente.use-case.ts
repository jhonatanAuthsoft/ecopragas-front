import { useCustomMutation } from "@/domain/custom-mutation";
import type { CadastrarClienteInput, CadastrarClienteResponse } from "@/model/rest/cliente";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { cadastrarClienteDatasource } from "@/rest/cliente";

export function useCreateCliente(params: UseCaseBaseParams<CadastrarClienteResponse> = {}) {
  const {
    mutateAsync: createCliente,
    data,
    error,
    isLoading,
  } = useCustomMutation<CadastrarClienteResponse, CadastrarClienteInput>({
    mutationFn: cadastrarClienteDatasource,
    ...params,
  });

  return {
    createCliente,
    createClienteData: data,
    createClienteError: error,
    isCreateClienteLoading: isLoading,
  };
}
