import { useCustomInfiniteQuery } from "@/domain/custom-infinite-query";
import type { LeadStatus, ListLeadsResponse } from "@/model/rest/lead";
import { listLeadsDatasource } from "@/rest/lead";

export const LIST_LEADS_INFINITE_QUERY_KEY = "list-leads-infinite";
export const LEADS_PAGE_SIZE = 10;

const getNextOffset = (lastPage: ListLeadsResponse, allPages: ListLeadsResponse[]) => {
  const pageData = lastPage.data ?? [];
  if (pageData.length < LEADS_PAGE_SIZE) return undefined;

  const totalElements = lastPage.pagination?.totalElements ?? 0;
  const loadedCount = allPages.reduce((sum, page) => sum + (page.data?.length ?? 0), 0);

  if (loadedCount >= totalElements) return undefined;
  return loadedCount;
};

export function useListLeadsInfinite(status: LeadStatus) {
  const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useCustomInfiniteQuery<ListLeadsResponse, number>({
      queryKey: [LIST_LEADS_INFINITE_QUERY_KEY, status],
      queryFn: ({ pageParam }) =>
        listLeadsDatasource({ status, limit: LEADS_PAGE_SIZE, offset: pageParam }),
      initialPageParam: 0,
      getNextPageParam: getNextOffset,
    });

  const leads = data?.pages.flatMap((page) => page.data ?? []) ?? [];
  const totalCount = data?.pages[0]?.pagination?.totalElements ?? 0;

  return {
    leads,
    totalCount,
    listLeadsError: error,
    isListLeadsLoading: isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetchLeads: refetch,
  };
}
