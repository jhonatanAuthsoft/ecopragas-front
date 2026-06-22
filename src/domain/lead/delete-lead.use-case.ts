import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { DeleteLeadParams } from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { deleteLeadDatasource } from "@/rest/lead";
import { GET_LEAD_DASHBOARD_QUERY_KEY } from "./get-lead-dashboard.use-case";
import { LIST_LEADS_QUERY_KEY } from "./list-leads.use-case";

export function useDeleteLead(params: UseCaseBaseParams<void> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restParams } = params;

  const {
    mutate: deleteLead,
    error,
    isLoading,
  } = useCustomMutation<void, DeleteLeadParams>({
    mutationFn: deleteLeadDatasource,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_LEADS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_LEAD_DASHBOARD_QUERY_KEY] });
      onSuccess?.(response);
    },
    ...restParams,
  });

  return {
    deleteLead,
    deleteLeadError: error,
    isDeleteLeadLoading: isLoading,
  };
}
