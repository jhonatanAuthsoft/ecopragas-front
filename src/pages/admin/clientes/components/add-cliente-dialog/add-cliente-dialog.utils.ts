import type { UseFormResetField } from "react-hook-form";
import type {
  CadastrarClienteInput,
  ClienteDocumentoInput,
  ClienteEndereco,
  ClienteFormValues,
} from "@/model/rest/cliente";
import { cleanDigits } from "@/utils/formatters";
import { ENDERECO_DRAFT_FIELDS, ENDERECO_FIELDS } from "./add-cliente-dialog.data";
import type { ViaCepResponse } from "./add-cliente-dialog.types";

const sanitizeEndereco = (endereco: ClienteEndereco): ClienteEndereco => ({
  ...endereco,
  cep: endereco.cep ? cleanDigits(endereco.cep) : endereco.cep,
});

const toApiEndereco = (endereco: ClienteEndereco): ClienteEndereco => {
  const { padrao: _padrao, ...apiEndereco } = endereco;
  return sanitizeEndereco(apiEndereco);
};

export const buildCadastrarClienteInput = (
  values: ClienteFormValues,
  documentos: ClienteDocumentoInput[] = [],
): CadastrarClienteInput => {
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

export const resetEnderecoDraftFields = <T extends ClienteFormValues>(
  resetField: UseFormResetField<T>,
) => {
  const reset = resetField as unknown as UseFormResetField<ClienteFormValues>;
  const emptyDraft = clearEnderecoDraft();

  for (const field of ENDERECO_DRAFT_FIELDS) {
    const draftKey = field.replace("enderecoDraft.", "") as keyof ClienteEndereco;
    reset(field, { defaultValue: String(emptyDraft[draftKey]) });
  }

  reset("enderecoDraft.padrao", { defaultValue: false });
};
