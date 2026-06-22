import { useCustomMutation } from "@/domain/custom-mutation";
import type { EditLeadParams, EditLeadRequest, EditLeadResponse } from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { editLeadDatasource } from "@/rest/lead";

export function useEditLead(params: UseCaseBaseParams<EditLeadResponse> = {}) {
  const {
    mutate: editLead,
    data,
    error,
    isLoading,
  } = useCustomMutation<EditLeadResponse, EditLeadParams & { body: EditLeadRequest }>({
    mutationFn: ({ id, body }) => editLeadDatasource(id, body),
    ...params,
  });

  return {
    editLead,
    editLeadData: data,
    editLeadError: error,
    isEditLeadLoading: isLoading,
  };
}
