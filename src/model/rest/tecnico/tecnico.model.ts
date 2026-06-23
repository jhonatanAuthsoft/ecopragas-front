import type { components, operations } from "../api-types";

export type Tecnico = components["schemas"]["TecnicoResponseDTO"];

export type CadastrarTecnicoInput =
  operations["tecnico_cadastrar"]["requestBody"]["content"]["application/json"];
export type CadastrarTecnicoResponse =
  operations["tecnico_cadastrar"]["responses"][200]["content"]["application/json"];

export type ListTecnicosParams = operations["tecnico_obter_todos"]["parameters"]["query"];
export type ListTecnicosResponse = components["schemas"]["StandardResponseListTecnicoResponseDTO"];

export type GetTecnicoParams = operations["tecnico_obter_por_id"]["parameters"]["path"];
export type GetTecnicoResponse = components["schemas"]["StandardResponseTecnicoResponseDTO"];

export type DeleteTecnicoParams = operations["tecnico_excluir"]["parameters"]["path"];

export type EditTecnicoParams = operations["tecnico_editar"]["parameters"]["path"];
export type EditTecnicoInput =
  operations["tecnico_editar"]["requestBody"]["content"]["application/json"];
export type EditTecnicoResponse =
  operations["tecnico_editar"]["responses"][200]["content"]["application/json"];
