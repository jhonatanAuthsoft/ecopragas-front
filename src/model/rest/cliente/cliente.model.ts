import type { components, operations } from "../api-types";

// TODO: excluir essa tipagem no front quando for adicionado a parte de ultimo serviço no back
export type Cliente = components["schemas"]["ClienteResponseDTO"] & {
  tipoDeServico?: string;
  tecnicoResponsavel?: string;
  valor?: number;
};
export type ClienteDocumentoInput = components["schemas"]["ClienteDocumentoInputDTO"];
export type ClienteDocumentoResponse = components["schemas"]["ClienteDocumentoResponseDTO"];
export type ClienteTipo = CadastrarClienteInput["tipo"];
export type ClienteStatus = CadastrarClienteInput["status"];
// TODO: o padrao devia vir do back
export type ClienteEndereco = components["schemas"]["ClienteEnderecoInputDTO"] & {
  padrao?: boolean;
};
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
