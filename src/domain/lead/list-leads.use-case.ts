import { useCustomQuery } from "@/domain/custom-query";
import type { ListLeadsParams } from "@/model/rest/lead";
import { listLeadsDatasource } from "@/rest/lead";

export const LIST_LEADS_QUERY_KEY = "list-leads";

export function useListLeads(params: ListLeadsParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [LIST_LEADS_QUERY_KEY, params],
    queryFn: () => listLeadsDatasource(params),
  });

  return {
    leads: data?.data ?? [],
    pagination: data?.pagination,
    listLeadsError: error,
    isListLeadsLoading: isLoading,
    refetchLeads: refetch,
  };
}
