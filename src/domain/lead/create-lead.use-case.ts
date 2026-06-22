import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { CadastrarLeadRequest, CadastrarLeadResponse } from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { cadastrarLeadDatasource } from "@/rest/lead";
import { GET_LEAD_DASHBOARD_QUERY_KEY } from "./get-lead-dashboard.use-case";
import { LIST_LEADS_QUERY_KEY } from "./list-leads.use-case";

export function useCreateLead(params: UseCaseBaseParams<CadastrarLeadResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restParams } = params;

  const {
    mutate: createLead,
    data,
    error,
    isLoading,
  } = useCustomMutation<CadastrarLeadResponse, CadastrarLeadRequest>({
    mutationFn: cadastrarLeadDatasource,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_LEADS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_LEAD_DASHBOARD_QUERY_KEY] });
      onSuccess?.(response);
    },
    ...restParams,
  });

  return {
    createLead,
    createLeadData: data,
    createLeadError: error,
    isCreateLeadLoading: isLoading,
  };
}
