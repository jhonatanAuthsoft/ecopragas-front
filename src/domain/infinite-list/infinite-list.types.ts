import type { SelectInputOption } from "@/atomic/atm.select-input";

export interface PaginatedListResponse<TItem> {
  data?: TItem[];
  pagination?: {
    totalElements?: number;
  };
}

export interface InfiniteSelectFetchPageParams {
  offset: number;
  limit: number;
  searchText: string;
}

export interface InfiniteSelectQueryConfig<TItem> {
  queryKey: string;
  pageSize?: number;
  debounceMs?: number;
  enabled?: boolean;
  queryParams?: Record<string, string | number | boolean | undefined>;
  fetchPage: (
    params: InfiniteSelectFetchPageParams & Record<string, string | number | boolean | undefined>,
  ) => Promise<PaginatedListResponse<TItem>>;
  mapToOption: (item: TItem) => SelectInputOption;
  filterItem?: (item: TItem) => boolean;
}
