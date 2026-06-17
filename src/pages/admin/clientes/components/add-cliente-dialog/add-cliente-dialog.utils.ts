import type {
  CadastrarClienteInput,
  ClienteDocumento,
  ClienteEndereco,
  ClienteFormValues,
} from "@/model/rest/cliente";
import { cleanDigits } from "@/utils/formatters";
import { ENDERECO_FIELDS } from "./add-cliente-dialog.data";
import type { ViaCepResponse } from "./add-cliente-dialog.types";

const sanitizeEndereco = (endereco: ClienteEndereco): ClienteEndereco => ({
  ...endereco,
  cep: endereco.cep ? cleanDigits(endereco.cep) : endereco.cep,
});

const toApiEndereco = (endereco: ClienteEndereco): ClienteEndereco => {
  const { padrao: _padrao, ...apiEndereco } = endereco;
  return sanitizeEndereco(apiEndereco);
};

// TODO: modificar
const buildClienteDocumentos = (files: File[], base64Urls: string[]): ClienteDocumento[] =>
  files.map((file, index) => ({
    nome: file.name,
    tipo: file.type,
    url: base64Urls[index] ?? "",
  }));

// TODO: modificar, possivelmente excluir
const filesToBase64 = (files: File[]): Promise<string[]> =>
  Promise.all(
    files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
              return;
            }
            reject(new Error("Falha ao converter arquivo"));
          };
          reader.onerror = () => reject(reader.error);
        }),
    ),
  );

// TODO: tirar o async
export const buildCadastrarClienteInput = async (
  values: ClienteFormValues,
): Promise<CadastrarClienteInput> => {
  const enderecosInput = values.enderecos.map(toApiEndereco);

  const hasDraftAddress =
    values.enderecoDraft.cep &&
    values.enderecoDraft.estado &&
    values.enderecoDraft.cidade &&
    values.enderecoDraft.bairro &&
    values.enderecoDraft.rua &&
    values.enderecoDraft.numero;

  if (hasDraftAddress) {
    enderecosInput.push(toApiEndereco(values.enderecoDraft));
  }

  const base64Urls = await filesToBase64(values.documentos);
  const documentos = buildClienteDocumentos(values.documentos, base64Urls);

  return {
    nomeRazaoSocial: values.nomeRazaoSocial,
    cnpjCpf: values.cnpjCpf ? cleanDigits(values.cnpjCpf) : values.cnpjCpf,
    tipo: values.tipo,
    telefone: values.telefone ? cleanDigits(values.telefone) : values.telefone,
    email: values.email,
    observacoes: values.observacoes,
    status: values.status,
    enderecos: enderecosInput,
    documentos: documentos.length > 0 ? documentos : undefined,
  };
};

export const isAddressEmpty = (endereco: ClienteEndereco) =>
  ENDERECO_FIELDS.every((field) => !endereco[field]);

export const fetchAddressByCep = async (cep: string): Promise<ViaCepResponse | null> => {
  const cleanCep = cleanDigits(cep);
  if (cleanCep.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = (await response.json()) as ViaCepResponse;
    return data.erro ? null : data;
  } catch {
    return null;
  }
};

export const clearEnderecoDraft = (): ClienteEndereco => ({
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  rua: "",
  numero: "",
  complemento: "",
  padrao: false,
});

export const shouldValidateEnderecoDraft = (
  enderecoDraft: ClienteEndereco,
  enderecosCount: number,
) => enderecosCount === 0 || !isAddressEmpty(enderecoDraft);
