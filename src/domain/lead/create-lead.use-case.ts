import { useCustomMutation } from "@/domain/custom-mutation";
import type { CadastrarLeadRequest, CadastrarLeadResponse } from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { cadastrarLeadDatasource } from "@/rest/lead";

export function useCreateLead(params: UseCaseBaseParams<CadastrarLeadResponse> = {}) {
  const {
    mutate: createLead,
    data,
    error,
    isLoading,
  } = useCustomMutation<CadastrarLeadResponse, CadastrarLeadRequest>({
    mutationFn: cadastrarLeadDatasource,
    ...params,
  });

  return {
    createLead,
    createLeadData: data,
    createLeadError: error,
    isCreateLeadLoading: isLoading,
  };
}
