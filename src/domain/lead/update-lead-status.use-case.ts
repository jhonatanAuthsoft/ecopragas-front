import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type {
  UpdateLeadStatusParams,
  UpdateLeadStatusRequest,
  UpdateLeadStatusResponse,
} from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { updateLeadStatusDatasource } from "@/rest/lead";
import { GET_LEAD_DASHBOARD_QUERY_KEY } from "./get-lead-dashboard.use-case";
import { LIST_LEADS_QUERY_KEY } from "./list-leads.use-case";

export function useUpdateLeadStatus(params: UseCaseBaseParams<UpdateLeadStatusResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restParams } = params;

  const {
    mutate: updateLeadStatus,
    data,
    error,
    isLoading,
  } = useCustomMutation<
    UpdateLeadStatusResponse,
    UpdateLeadStatusParams & { body: UpdateLeadStatusRequest }
  >({
    mutationFn: ({ id, body }) => updateLeadStatusDatasource(id, body),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_LEADS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_LEAD_DASHBOARD_QUERY_KEY] });
      onSuccess?.(response);
    },
    ...restParams,
  });

  return {
    updateLeadStatus,
    updateLeadStatusData: data,
    updateLeadStatusError: error,
    isUpdateLeadStatusLoading: isLoading,
  };
}
