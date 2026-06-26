import type { PaginatedListResponse } from "./infinite-list.types";

export const DEFAULT_INFINITE_LIST_PAGE_SIZE = 10;

export const getNextOffsetPageParam = <TItem>(
  pageSize: number,
  lastPage: PaginatedListResponse<TItem>,
  allPages: PaginatedListResponse<TItem>[],
): number | undefined => {
  const pageData = lastPage.data ?? [];

  if (pageData.length < pageSize) {
    return undefined;
  }

  const totalElements = lastPage.pagination?.totalElements ?? 0;
  const loadedCount = allPages.reduce((sum, page) => sum + (page.data?.length ?? 0), 0);

  if (loadedCount >= totalElements) {
    return undefined;
  }

  return loadedCount;
};
