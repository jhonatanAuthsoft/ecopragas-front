import type { components, operations } from "../api-types";

export type Cliente = components["schemas"]["ClienteResponseDTO"];
export type ClienteUltimoServico = components["schemas"]["ClienteUltimoServicoResponseDTO"];
export type ClienteDocumentoInput = components["schemas"]["ClienteDocumentoInputDTO"];
export type ClienteDocumentoResponse = components["schemas"]["ClienteDocumentoResponseDTO"];
export type ClienteTipo = CadastrarClienteInput["tipo"];
export type ClienteStatus = CadastrarClienteInput["status"];
export type ClienteEnderecoInput = components["schemas"]["ClienteEnderecoInputDTO"];
export type ClienteEnderecoResponse = components["schemas"]["ClienteEnderecoResponseDTO"];
export type ClienteEndereco = ClienteEnderecoInput;
export type ClienteDashboard = components["schemas"]["ClienteDashboardDTO"];

export type CadastrarClienteInput =
  operations["cliente_cadastrar"]["requestBody"]["content"]["application/json"];
export type CadastrarClienteResponse =
  operations["cliente_cadastrar"]["responses"][200]["content"]["application/json"];

export type ClienteFormValues = Omit<CadastrarClienteInput, "documentos" | "enderecos"> & {
  documentos: File[];
  enderecos: ClienteEndereco[];
  enderecoDraft: ClienteEndereco;
};

export type ListClientesParams = NonNullable<
  operations["cliente_obter_todos"]["parameters"]["query"]
>;
export type ListClientesResponse = components["schemas"]["StandardResponseListClienteResponseDTO"];

export type ClienteDashboardResponse = components["schemas"]["StandardResponseClienteDashboardDTO"];

export type UltimosServicosPortalParams = {
  tipoServico?: string;
  status?: string;
  limit?: number;
  offset?: number;
};

export type UltimosServicosPortalResponse =
  operations["cliente_obter_ultimos_servicos"]["responses"][200]["content"]["application/json"];

export type HistoricoOsPortalParams = NonNullable<
  operations["cliente_obter_historico_os"]["parameters"]["query"]
>;
export type HistoricoOsPortalResponse =
  operations["cliente_obter_historico_os"]["responses"][200]["content"]["application/json"];

export type AgendamentosPortalParams = NonNullable<
  operations["cliente_obter_agendamentos"]["parameters"]["query"]
>;

export type AgendamentosPortalResponse =
  operations["cliente_obter_agendamentos"]["responses"][200]["content"]["application/json"];

export type GetClienteParams = operations["cliente_obter_por_id"]["parameters"]["path"];
export type GetClienteResponse = Omit<
  components["schemas"]["StandardResponseClienteResponseDTO"],
  "data"
> & {
  data?: Cliente;
};

export type DeleteClienteParams = operations["cliente_excluir"]["parameters"]["path"];

export type EditClienteParams = operations["cliente_editar"]["parameters"]["path"];
export type EditClienteInput =
  operations["cliente_editar"]["requestBody"]["content"]["application/json"];
export type EditClienteResponse =
  operations["cliente_editar"]["responses"][200]["content"]["application/json"];
export type EditClienteMutationParams = EditClienteParams & {
  body: EditClienteInput;
};

export type EditClienteFormValues = ClienteFormValues & {
  documentosExistentes: ClienteDocumentoResponse[];
};
