import { useCustomQuery } from "@/domain/custom-query";
import type { GetLeadParams } from "@/model/rest/lead";
import { getLeadDatasource } from "@/rest/lead";

export function useGetLead(params: GetLeadParams) {
  const { data, error, isLoading, refetch } = useCustomQuery({
    queryKey: ["get-lead", params],
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
