import { type QueryKey, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import type { AxiosErrorResponse } from "@/model/use-case.model";
import { getErrorMessages } from "@/utils/get-error-messages";

function defaultOnError(error: AxiosErrorResponse) {
  toast.error(
    getErrorMessages(error.response?.data) || "Houve um erro, tente novamente mais tarde.",
  );
}

export function useCustomQuery<TData>({
  queryKey,
  queryFn,
  enabled = true,
  onError = defaultOnError,
}: {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
  onError?: (error: AxiosErrorResponse) => void;
}) {
  const { data, error, isPending, refetch } = useQuery<TData, AxiosErrorResponse>({
    queryKey,
    queryFn,
    enabled,
  });

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, [error, onError]);

  return {
    data,
    error,
    isLoading: isPending,
    refetch,
  };
}
