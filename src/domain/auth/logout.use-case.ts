import { useCustomMutation } from "@/domain/custom-mutation";
import type { LogoutResponse } from "@/model/rest/auth";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { logoutDatasource } from "@/rest/auth";

export function useLogout(params: UseCaseBaseParams<LogoutResponse> = {}) {
  const { mutate, isLoading } = useCustomMutation<LogoutResponse, void>({
    mutationFn: logoutDatasource,
    ...params,
  });

  return {
    logout: mutate,
    isLogoutLoading: isLoading,
  };
}
