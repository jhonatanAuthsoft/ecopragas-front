import { toast } from "sonner";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { CadastrarClienteInput, CadastrarClienteResponse } from "@/model/rest/cliente";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { cadastrarClienteDatasource } from "@/rest/cliente";

export function useCreateCliente(params: UseCaseBaseParams<CadastrarClienteResponse> = {}) {
  const { onError, ...restParams } = params;

  const {
    mutateAsync: createCliente,
    data,
    error,
    isLoading,
  } = useCustomMutation<CadastrarClienteResponse, CadastrarClienteInput>({
    mutationFn: cadastrarClienteDatasource,
    ...restParams,
    onError: (createClienteError) => {
      toast.error("Erro ao cadastrar cliente. Tente novamente.");
      onError?.(createClienteError);
    },
  });

  return {
    createCliente,
    createClienteData: data,
    createClienteError: error,
    isCreateClienteLoading: isLoading,
  };
}
