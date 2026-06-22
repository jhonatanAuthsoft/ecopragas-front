import { useCustomMutation } from "@/domain/custom-mutation";
import type {
  UpdateLeadStatusParams,
  UpdateLeadStatusRequest,
  UpdateLeadStatusResponse,
} from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { updateLeadStatusDatasource } from "@/rest/lead";

export function useUpdateLeadStatus(params: UseCaseBaseParams<UpdateLeadStatusResponse> = {}) {
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
    ...params,
  });

  return {
    updateLeadStatus,
    updateLeadStatusData: data,
    updateLeadStatusError: error,
    isUpdateLeadStatusLoading: isLoading,
  };
}
