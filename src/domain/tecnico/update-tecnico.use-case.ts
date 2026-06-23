import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type {
  EditTecnicoInput,
  EditTecnicoParams,
  EditTecnicoResponse,
} from "@/model/rest/tecnico";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { editTecnicoDatasource } from "@/rest/tecnico";
import { GET_TECNICO_QUERY_KEY } from "./get-tecnico-by-id.use-case";
import { LIST_TECNICOS_QUERY_KEY } from "./list-tecnicos.use-case";

export function useEditTecnico(params: UseCaseBaseParams<EditTecnicoResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restParams } = params;

  const {
    mutate: editTecnico,
    mutateAsync: editTecnicoAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<EditTecnicoResponse, EditTecnicoParams & { body: EditTecnicoInput }>({
    mutationFn: ({ id, body }) => editTecnicoDatasource(id, body),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_TECNICOS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_TECNICO_QUERY_KEY] });
      onSuccess?.(response);
    },
    ...restParams,
  });

  return {
    editTecnico,
    editTecnicoAsync,
    editTecnicoData: data,
    editTecnicoError: error,
    isEditTecnicoLoading: isLoading,
  };
}
