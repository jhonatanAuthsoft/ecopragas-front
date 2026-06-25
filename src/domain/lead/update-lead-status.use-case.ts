import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  Lead,
  UpdateLeadStatusParams,
  UpdateLeadStatusRequest,
  UpdateLeadStatusResponse,
} from "@/model/rest/lead";
import type { AxiosErrorResponse, UseCaseBaseParams } from "@/model/use-case.model";
import { updateLeadStatusDatasource } from "@/rest/lead";
import { getErrorMessages } from "@/utils/get-error-messages";
import {
  type KanbanSnapshot,
  moveLeadBetweenColumns,
  refreshLeadDashboard,
  restoreKanban,
  snapshotKanban,
} from "./kanban-leads-cache";
import { LIST_LEADS_INFINITE_QUERY_KEY } from "./list-leads-infinite.use-case";

type UpdateLeadStatusInput = UpdateLeadStatusParams & {
  body: UpdateLeadStatusRequest;
  lead: Lead;
};

export function useUpdateLeadStatus(params: UseCaseBaseParams<UpdateLeadStatusResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = params;

  const {
    mutate: updateLeadStatus,
    data,
    error,
    isPending,
  } = useMutation<
    UpdateLeadStatusResponse,
    AxiosErrorResponse,
    UpdateLeadStatusInput,
    { snapshot: KanbanSnapshot }
  >({
    mutationFn: ({ id, body }) => updateLeadStatusDatasource(id, body),
    onMutate: async ({ lead, body }) => {
      await queryClient.cancelQueries({ queryKey: [LIST_LEADS_INFINITE_QUERY_KEY] });

      const snapshot = snapshotKanban(queryClient);
      moveLeadBetweenColumns(queryClient, lead, body.status);

      return { snapshot };
    },
    onError: (mutationError, _variables, context) => {
      restoreKanban(queryClient, context?.snapshot);

      if (onError) {
        onError(mutationError);
        return;
      }

      toast.error(
        getErrorMessages(mutationError.response?.data) ||
          "Houve um erro, tente novamente mais tarde.",
      );
    },
    onSuccess: (response) => {
      refreshLeadDashboard(queryClient);
      onSuccess?.(response);
    },
  });

  return {
    updateLeadStatus,
    updateLeadStatusData: data,
    updateLeadStatusError: error,
    isUpdateLeadStatusLoading: isPending,
  };
}
