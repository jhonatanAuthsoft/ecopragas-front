import type { components, operations } from "../api-types";

export type Cliente = components["schemas"]["ClienteResponseDTO"];
export type ClienteDocumento = components["schemas"]["ClienteDocumentoInputDTO"];
export type ClienteTipo = CadastrarClienteInput["tipo"];
export type ClienteStatus = CadastrarClienteInput["status"];
// TODO: o padrao devia vir do back
export type ClienteEndereco = components["schemas"]["ClienteEnderecoInputDTO"] & {
  padrao?: boolean;
};
export type ClienteDashboard = components["schemas"]["ClienteDashboardDTO"];

export type CadastrarClienteInput =
  operations["cadastrar_3"]["requestBody"]["content"]["application/json"];
export type CadastrarClienteResponse =
  operations["cadastrar_3"]["responses"][200]["content"]["*/*"];

export type ClienteFormValues = Omit<CadastrarClienteInput, "documentos" | "enderecos"> & {
  documentos: File[];
  enderecos: ClienteEndereco[];
  enderecoDraft: ClienteEndereco;
};

export type ListClientesParams = NonNullable<operations["obterTodos_2"]["parameters"]["query"]>;
export type ListClientesResponse = components["schemas"]["StandardResponseListClienteResponseDTO"];

export type ClienteDashboardResponse = components["schemas"]["StandardResponseClienteDashboardDTO"];
