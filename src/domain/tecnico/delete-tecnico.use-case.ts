import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { DeleteTecnicoParams } from "@/model/rest/tecnico";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { deleteTecnicoDatasource } from "@/rest/tecnico";
import { LIST_TECNICOS_QUERY_KEY } from "./list-tecnicos.use-case";

export function useDeleteTecnico(params: UseCaseBaseParams<void> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restParams } = params;

  const {
    mutate: deleteTecnico,
    mutateAsync: deleteTecnicoAsync,
    error,
    isLoading,
  } = useCustomMutation<void, DeleteTecnicoParams>({
    mutationFn: deleteTecnicoDatasource,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_TECNICOS_QUERY_KEY] });
      onSuccess?.(response);
    },
    ...restParams,
  });

  return {
    deleteTecnico,
    deleteTecnicoAsync,
    deleteTecnicoError: error,
    isDeleteTecnicoLoading: isLoading,
  };
}
