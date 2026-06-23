import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "@/domain/custom-mutation";
import type { CadastrarTecnicoInput, CadastrarTecnicoResponse } from "@/model/rest/tecnico";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { cadastrarTecnicoDatasource } from "@/rest/tecnico";
import { LIST_TECNICOS_QUERY_KEY } from "./list-tecnicos.use-case";

export function useCreateTecnico(params: UseCaseBaseParams<CadastrarTecnicoResponse> = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restParams } = params;

  const {
    mutate: createTecnico,
    mutateAsync: createTecnicoAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<CadastrarTecnicoResponse, CadastrarTecnicoInput>({
    mutationFn: cadastrarTecnicoDatasource,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [LIST_TECNICOS_QUERY_KEY] });
      onSuccess?.(response);
    },
    ...restParams,
  });

  return {
    createTecnico,
    createTecnicoAsync,
    createTecnicoData: data,
    createTecnicoError: error,
    isCreateTecnicoLoading: isLoading,
  };
}
