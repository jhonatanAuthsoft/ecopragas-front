import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosErrorResponse, UseCaseBaseParams } from "@/model/use-case.model";
import { getErrorMessages } from "@/utils/get-error-messages";

function defaultOnError(error: AxiosErrorResponse) {
  toast.error(
    getErrorMessages(error?.response?.data) || "Houve um erro, tente novamente mais tarde.",
  );
}

export function useCustomMutation<TData, TVariables>({
  mutationFn,
  onSuccess,
  onError = defaultOnError,
  onSettled,
}: UseCaseBaseParams<TData, AxiosErrorResponse> & {
  mutationFn: (variables: TVariables) => Promise<TData>;
}) {
  const {
    mutate: mutateInternal,
    mutateAsync: mutateAsyncInternal,
    data,
    error,
    isPending,
  } = useMutation<TData, AxiosErrorResponse, TVariables>({
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
