import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { EditLeadParams, EditLeadRequest, EditLeadResponse } from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { editLeadDatasource } from "@/rest/lead";
import { GET_LEAD_DASHBOARD_QUERY_KEY } from "./get-lead-dashboard.use-case";
import { LIST_LEADS_QUERY_KEY } from "./list-leads.use-case";

export function useEditLead(params: UseCaseBaseParams<EditLeadResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restParams } = params;

  const {
    mutate: editLead,
    data,
    error,
    isLoading,
  } = useCustomMutation<EditLeadResponse, EditLeadParams & { body: EditLeadRequest }>({
    mutationFn: ({ id, body }) => editLeadDatasource(id, body),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_LEADS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_LEAD_DASHBOARD_QUERY_KEY] });
      onSuccess?.(response);
    },
    ...restParams,
  });

  return {
    editLead,
    editLeadData: data,
    editLeadError: error,
    isEditLeadLoading: isLoading,
  };
}
