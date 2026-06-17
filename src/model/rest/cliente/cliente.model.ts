import type { components, operations } from "../api-types";

export type Cliente = components["schemas"]["ClienteResponseDTO"];
// TODO: o padrao devia vir do back
export type ClienteEndereco = components["schemas"]["ClienteEnderecoInputDTO"] & {
  padrao?: boolean;
};
export type ClienteDocumento = components["schemas"]["ClienteDocumentoInputDTO"];
export type ClienteTipo = CadastrarClienteInput["tipo"];
export type ClienteStatus = CadastrarClienteInput["status"];

export type CadastrarClienteInput =
  operations["cadastrar_2"]["requestBody"]["content"]["application/json"];
export type CadastrarClienteResponse =
  operations["cadastrar_2"]["responses"][200]["content"]["*/*"];

export type ClienteFormValues = Omit<CadastrarClienteInput, "documentos" | "enderecos"> & {
  documentos: File[];
  enderecos: ClienteEndereco[];
  enderecoDraft: ClienteEndereco;
};
