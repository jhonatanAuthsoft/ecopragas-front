import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "@/model/rest/auth";
import type { AxiosErrorResponse, UseCaseBaseParams } from "@/model/use-case.model";
import { loginDatasource } from "@/rest/auth";

export function useLogin(params: UseCaseBaseParams<LoginResponse> = {}) {
  const { onSuccess, onError, onSettled } = params;

  const { mutate, data, error, isPending } = useMutation<
    LoginResponse,
    AxiosErrorResponse,
    LoginRequest
  >({
    mutationFn: loginDatasource,
    onSuccess,
    onError,
    onSettled,
  });

  const login = (body: LoginRequest) => {
    if (isPending) return;
    mutate(body);
  };

  return {
    login,
    data,
    error,
    isLoading: isPending,
  };
}
