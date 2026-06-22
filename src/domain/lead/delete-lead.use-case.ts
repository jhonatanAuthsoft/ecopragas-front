import { useCustomMutation } from "@/domain/custom-mutation";
import type { DeleteLeadParams } from "@/model/rest/lead";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { deleteLeadDatasource } from "@/rest/lead";

export function useDeleteLead(params: UseCaseBaseParams<void> = {}) {
  const {
    mutate: deleteLead,
    error,
    isLoading,
  } = useCustomMutation<void, DeleteLeadParams>({
    mutationFn: deleteLeadDatasource,
    ...params,
  });

  return {
    deleteLead,
    deleteLeadError: error,
    isDeleteLeadLoading: isLoading,
  };
}
