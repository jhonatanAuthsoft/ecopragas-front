import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { DeleteLeadParams, LeadStatus } from "@/model/rest/lead";
import type { AxiosErrorResponse, UseCaseBaseParams } from "@/model/use-case.model";
import { deleteLeadDatasource } from "@/rest/lead";
import { getErrorMessages } from "@/utils/get-error-messages";
import { findLeadInKanban, refreshLeadColumn, refreshLeadDashboard } from "./kanban-leads-cache";

type DeleteLeadContext = {
  columnStatus?: LeadStatus;
};

export function useDeleteLead(params: UseCaseBaseParams<void> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = params;

  const {
    mutate: deleteLead,
    error,
    isPending,
  } = useMutation<void, AxiosErrorResponse, DeleteLeadParams, DeleteLeadContext>({
    mutationFn: deleteLeadDatasource,
    onMutate: ({ id }) => ({
      columnStatus: findLeadInKanban(queryClient, id)?.status,
    }),
    onError: (mutationError) => {
      if (onError) {
        onError(mutationError);
        return;
      }

      toast.error(
        getErrorMessages(mutationError.response?.data) ||
          "Houve um erro, tente novamente mais tarde.",
      );
    },
    onSuccess: (_response, _variables, context) => {
      if (context?.columnStatus) {
        refreshLeadColumn(queryClient, context.columnStatus);
      }

      refreshLeadDashboard(queryClient);
      onSuccess?.();
    },
  });

  return {
    deleteLead,
    deleteLeadError: error,
    isDeleteLeadLoading: isPending,
  };
}
