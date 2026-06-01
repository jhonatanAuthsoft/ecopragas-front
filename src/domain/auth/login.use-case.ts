import { useCustomMutation } from "@/domain/custom-mutation";
import type { LoginRequest, LoginResponse } from "@/model/rest/auth";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { loginDatasource } from "@/rest/auth";

export function useLogin(params: UseCaseBaseParams<LoginResponse> = {}) {
  const {
    mutate: login,
    data,
    error,
    isLoading,
  } = useCustomMutation<LoginResponse, LoginRequest>({
    mutationFn: loginDatasource,
    ...params,
  });

  return {
    login,
    loginData: data,
    loginError: error,
    isLoginLoading: isLoading,
  };
}
