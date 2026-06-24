import { type InfiniteData, type QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import type { AxiosErrorResponse } from "@/model/use-case.model";
import { getErrorMessages } from "@/utils/get-error-messages";

function defaultOnError(error: AxiosErrorResponse) {
  toast.error(
    getErrorMessages(error.response?.data) || "Houve um erro, tente novamente mais tarde.",
  );
}

interface UseCustomInfiniteQueryParams<TData, TPageParam = number> {
  queryKey: QueryKey;
  queryFn: (context: { pageParam: TPageParam }) => Promise<TData>;
  initialPageParam: TPageParam;
  getNextPageParam: (lastPage: TData, allPages: TData[]) => TPageParam | undefined;
  enabled?: boolean;
  onError?: (error: AxiosErrorResponse) => void;
}

export function useCustomInfiniteQuery<TData, TPageParam>({
  queryKey,
  queryFn,
  initialPageParam,
  getNextPageParam,
  enabled = true,
  onError = defaultOnError,
}: UseCustomInfiniteQueryParams<TData, TPageParam>) {
  const { data, error, isPending, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<TData, AxiosErrorResponse, InfiniteData<TData>, QueryKey, TPageParam>({
      queryKey,
      queryFn: ({ pageParam }) => queryFn({ pageParam: pageParam as TPageParam }),
      initialPageParam,
      getNextPageParam,
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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
}
