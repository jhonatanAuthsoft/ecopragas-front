import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { CadastrarLeadRequest, CadastrarLeadResponse } from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { cadastrarLeadDatasource } from "@/rest/lead";
import { refreshLeadColumn, refreshLeadDashboard } from "./kanban-leads-cache";

export function useCreateLead(params: UseCaseBaseParams<CadastrarLeadResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess } = params;

  const {
    mutate: createLead,
    data,
    error,
    isLoading,
  } = useCustomMutation<CadastrarLeadResponse, CadastrarLeadRequest>({
    mutationFn: cadastrarLeadDatasource,
    onSuccess: (response) => {
      if (response.data?.status) {
        refreshLeadColumn(queryClient, response.data.status);
      }

      refreshLeadDashboard(queryClient);
      onSuccess?.(response);
    },
  });

  return {
    createLead,
    createLeadData: data,
    createLeadError: error,
    isCreateLeadLoading: isLoading,
  };
}
