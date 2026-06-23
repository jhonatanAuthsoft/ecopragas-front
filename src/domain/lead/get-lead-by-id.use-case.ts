import { useCustomQuery } from "@/domain/custom-query";
import type { GetLeadParams } from "@/model/rest/lead";
import { getLeadDatasource } from "@/rest/lead";

export const GET_LEAD_QUERY_KEY = "get-lead";

export function useGetLead(params: GetLeadParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: [GET_LEAD_QUERY_KEY, params],
    queryFn: () => getLeadDatasource(params.id),
    enabled: !!params.id,
  });

  return {
    lead: data?.data,
    getLeadError: error,
    isGetLeadLoading: isLoading,
    refetchLead: refetch,
  };
}
