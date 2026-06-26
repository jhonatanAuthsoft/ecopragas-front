import { useCustomInfiniteQuery } from "@/domain/custom-infinite-query";
import { useDebounce } from "@/hooks/use-debounce";
import type { InfiniteSelectQueryConfig } from "./infinite-list.types";
import { DEFAULT_INFINITE_LIST_PAGE_SIZE, getNextOffsetPageParam } from "./infinite-list.utils";

export function useInfiniteListQuery<TItem>(
  config: InfiniteSelectQueryConfig<TItem>,
  searchText: string,
) {
  const pageSize = config.pageSize ?? DEFAULT_INFINITE_LIST_PAGE_SIZE;
  const debouncedSearchText = useDebounce(searchText, config.debounceMs);
  const queryKey = [config.queryKey, debouncedSearchText, config.queryParams];

  const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useCustomInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        config.fetchPage({
          offset: pageParam,
          limit: pageSize,
          searchText: debouncedSearchText,
          ...config.queryParams,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) =>
        getNextOffsetPageParam(pageSize, lastPage, allPages),
      enabled: config.enabled ?? true,
    });

  const items =
    data?.pages
      .flatMap((page) => page.data ?? [])
      .filter((item) => (config.filterItem ? config.filterItem(item) : true)) ?? [];

  const options = items
    .map((item) => config.mapToOption(item))
    .filter((option) => option.value.length > 0);

  return {
    items,
    options,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    fetchNextPage,
    debouncedSearchText,
  };
}
