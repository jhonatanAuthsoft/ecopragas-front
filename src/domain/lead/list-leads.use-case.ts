import { useCustomQuery } from "@/domain/custom-query";
import type { ListLeadsParams } from "@/model/rest/lead";
import { listLeadsDatasource } from "@/rest/lead";

export function useListLeads(params: ListLeadsParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: ["list-leads", params],
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
