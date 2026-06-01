import { useMutation } from "@tanstack/react-query";
import type { AxiosErrorResponse, UseCaseBaseParams } from "@/model/use-case.model";

export function useCustomMutation<TData, TVariables, TError = AxiosErrorResponse>({
  mutationFn,
  onSuccess,
  onError,
  onSettled,
}: UseCaseBaseParams<TData, TError> & {
  mutationFn: (variables: TVariables) => Promise<TData>;
}) {
  const {
    mutate: mutateInternal,
    data,
    error,
    isPending,
  } = useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess,
    onError,
    onSettled,
  });

  const mutate = (variables: TVariables) => {
    if (isPending) return;
    mutateInternal(variables);
  };

  return { mutate, data, error, isLoading: isPending };
}
