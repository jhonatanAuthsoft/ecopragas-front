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
  operations["cadastrar_4"]["requestBody"]["content"]["application/json"];
export type CadastrarClienteResponse =
  operations["cadastrar_4"]["responses"][200]["content"]["*/*"];

export type ClienteFormValues = Omit<CadastrarClienteInput, "documentos" | "enderecos"> & {
  documentos: File[];
  enderecos: ClienteEndereco[];
  enderecoDraft: ClienteEndereco;
};

export type ListClientesParams = NonNullable<operations["obterTodos_3"]["parameters"]["query"]>;
export type ListClientesResponse = components["schemas"]["StandardResponseListClienteResponseDTO"];

export type ClienteDashboardResponse = components["schemas"]["StandardResponseClienteDashboardDTO"];

export type GetClienteParams = operations["obterPorId_3"]["parameters"]["path"];
export type GetClienteResponse = Omit<
  components["schemas"]["StandardResponseClienteResponseDTO"],
  "data"
> & {
  data?: Cliente;
};

export type DeleteClienteParams = operations["excluir_3"]["parameters"]["path"];
