import type { UseFormResetField } from "react-hook-form";
import type {
  CadastrarClienteInput,
  ClienteDocumentoInput,
  ClienteEndereco,
  ClienteEnderecoInput,
  ClienteFormValues,
} from "@/model/rest/cliente";
import { cleanDigits } from "@/utils/formatters";
import {
  ENDERECO_DRAFT_FIELDS,
  ENDERECO_REQUIRED_FIELDS,
} from "./add-cliente-dialog.data";
import type { ViaCepResponse } from "./add-cliente-dialog.types";

const sanitizeEndereco = (endereco: ClienteEndereco): ClienteEndereco => ({
  ...endereco,
  cep: endereco.cep ? cleanDigits(endereco.cep) : endereco.cep,
});

const toApiEndereco = (endereco: ClienteEndereco): ClienteEnderecoInput => ({
  ...sanitizeEndereco(endereco),
  padrao: endereco.padrao ?? false,
});

export const hasDefaultEndereco = (enderecos: Array<{ padrao?: boolean }>) =>
  enderecos.some((endereco) => endereco.padrao);

export const ensureDefaultEndereco = <T extends { padrao?: boolean }>(enderecos: T[]): T[] => {
  if (enderecos.length === 0 || hasDefaultEndereco(enderecos)) {
    return enderecos;
  }

  return enderecos.map((endereco, index) =>
    index === 0 ? { ...endereco, padrao: true } : endereco,
  );
};

export const appendEndereco = (
  enderecos: ClienteEndereco[],
  novoEndereco: ClienteEndereco,
): ClienteEndereco[] => {
  const enderecoFormatted: ClienteEndereco = {
    ...novoEndereco,
    padrao: novoEndereco.padrao ?? false,
  };

  let updatedEnderecos: ClienteEndereco[];

  if (!enderecoFormatted.padrao) {
    updatedEnderecos = [...enderecos, enderecoFormatted];
  } else {
    updatedEnderecos = [
      ...enderecos.map((endereco) => ({ ...endereco, padrao: false })),
      enderecoFormatted,
    ];
  }

  return ensureDefaultEndereco(updatedEnderecos);
};

export const buildCadastrarClienteInput = (
  values: ClienteFormValues,
  documentos: ClienteDocumentoInput[] = [],
): CadastrarClienteInput => {
  let enderecosInput = values.enderecos.map(toApiEndereco);

  const hasDraftAddress = ENDERECO_REQUIRED_FIELDS.every(
    (field) => String(values.enderecoDraft[field] ?? "").trim() !== "",
  );

  if (hasDraftAddress) {
    const draft = toApiEndereco(values.enderecoDraft);

    if (draft.padrao) {
      enderecosInput = enderecosInput.map((endereco) => ({ ...endereco, padrao: false }));
    }
    enderecosInput.push(draft);
  }

  enderecosInput = ensureDefaultEndereco(enderecosInput);

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
  ENDERECO_REQUIRED_FIELDS.every((field) => !endereco[field]);

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
