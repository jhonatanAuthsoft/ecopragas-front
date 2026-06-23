import type {
  Cliente,
  ClienteDocumentoInput,
  ClienteDocumentoResponse,
  ClienteEndereco,
  ClienteEnderecoResponse,
  EditClienteFormValues,
  EditClienteInput,
} from "@/model/rest/cliente";
import { formatCEP, formatCPFCNPJ, formatPhone } from "@/utils/formatters";
import { DEFAULT_VALUES } from "../../../../../../../add-cliente-dialog/add-cliente-dialog.data";
import {
  buildCadastrarClienteInput,
  clearEnderecoDraft,
} from "../../../../../../../add-cliente-dialog/add-cliente-dialog.utils";

const mapEnderecoResponseToForm = (endereco: ClienteEnderecoResponse): ClienteEndereco => ({
  cep: endereco.cep ? formatCEP(endereco.cep) : "",
  estado: endereco.estado ?? "",
  cidade: endereco.cidade ?? "",
  bairro: endereco.bairro ?? "",
  rua: endereco.rua ?? "",
  numero: endereco.numero ?? "",
  complemento: endereco.complemento ?? "",
  padrao: endereco.padrao ?? false,
});

const mapDocumentoToInput = (documento: ClienteDocumentoResponse): ClienteDocumentoInput => ({
  nome: documento.nome,
  tipo: documento.tipo,
  url: documento.url,
});

export const mapClienteToFormValues = (cliente: Cliente): EditClienteFormValues => ({
  ...DEFAULT_VALUES,
  nomeRazaoSocial: cliente.nomeRazaoSocial ?? "",
  cnpjCpf: cliente.cnpjCpf ? formatCPFCNPJ(cliente.cnpjCpf) : "",
  tipo: cliente.tipo ?? DEFAULT_VALUES.tipo,
  email: cliente.email ?? "",
  telefone: cliente.telefone ? formatPhone(cliente.telefone) : "",
  observacoes: cliente.observacoes ?? "",
  status: cliente.status ?? DEFAULT_VALUES.status,
  enderecos: (cliente.enderecos ?? []).map(mapEnderecoResponseToForm),
  documentos: [],
  documentosExistentes: cliente.documentos ?? [],
  enderecoDraft: clearEnderecoDraft(),
});

export const buildEditClienteInput = (
  values: EditClienteFormValues,
  novosDocumentos: ClienteDocumentoInput[] = [],
): EditClienteInput => {
  const { documentos: _documentos, ...baseInput } = buildCadastrarClienteInput(values, []);
  const documentosExistentes = values.documentosExistentes.map(mapDocumentoToInput);
  const documentos = [...documentosExistentes, ...novosDocumentos];

  return {
    ...baseInput,
    documentos: documentos.length > 0 ? documentos : undefined,
  };
};
