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
    mutateAsync: mutateAsyncInternal,
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

  const mutateAsync = (variables: TVariables) => {
    if (isPending) {
      return Promise.reject(new Error("Mutation already in progress"));
    }
    return mutateAsyncInternal(variables);
  };

  return { mutate, mutateAsync, data, error, isLoading: isPending };
}
