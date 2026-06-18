import { useCustomMutation } from "@/domain/custom-mutation";
import type { RedefinirSenhaInput, RedefinirSenhaResponse } from "@/model/rest/auth";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { redefinirSenhaDatasource } from "@/rest/auth";

export function useRedefinirSenha(params: UseCaseBaseParams<RedefinirSenhaResponse> = {}) {
  const {
    mutate: redefinirSenha,
    data,
    error,
    isLoading,
  } = useCustomMutation<RedefinirSenhaResponse, RedefinirSenhaInput>({
    mutationFn: redefinirSenhaDatasource,
    ...params,
  });

  return {
    redefinirSenha,
    redefinirSenhaData: data,
    redefinirSenhaError: error,
    isRedefinirSenhaLoading: isLoading,
  };
}
