import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { EditLeadParams, EditLeadRequest, EditLeadResponse } from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { editLeadDatasource } from "@/rest/lead";
import { findLeadInKanban, refreshLeadColumn, refreshLeadDashboard } from "./kanban-leads-cache";

export function useEditLead(params: UseCaseBaseParams<EditLeadResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess } = params;

  const {
    mutate: editLead,
    data,
    error,
    isLoading,
  } = useCustomMutation<EditLeadResponse, EditLeadParams & { body: EditLeadRequest }>({
    mutationFn: ({ id, body }) => editLeadDatasource(id, body),
    onSuccess: (response) => {
      const updatedLead = response.data;

      if (updatedLead?.id && updatedLead.status) {
        const cachedLead = findLeadInKanban(queryClient, updatedLead.id);

        if (cachedLead?.status && cachedLead.status !== updatedLead.status) {
          refreshLeadColumn(queryClient, cachedLead.status);
        }

        refreshLeadColumn(queryClient, updatedLead.status);
      }

      refreshLeadDashboard(queryClient);
      onSuccess?.(response);
    },
  });

  return {
    editLead,
    editLeadData: data,
    editLeadError: error,
    isEditLeadLoading: isLoading,
  };
}
