import { cleanDigits } from "@/utils/formatters";
import { ENDERECO_FIELDS } from "./add-cliente-dialog.data";
import type {
  ClienteEndereco,
  ClienteEnderecoPayload,
  ClienteFormValues,
  ViaCepResponse,
} from "./add-cliente-dialog.types";

const REQUIRED_MESSAGE = "Campo Obrigatorio";

export const isAddressEmpty = (values: Pick<ClienteFormValues, (typeof ENDERECO_FIELDS)[number]>) =>
  ENDERECO_FIELDS.every((field) => !values[field]);

export const shouldValidateAddress = (
  values: Pick<ClienteFormValues, (typeof ENDERECO_FIELDS)[number]>,
  enderecos: ClienteEndereco[],
) => enderecos.length === 0 || !isAddressEmpty(values);

export const getAddressValidationErrors = (
  values: Pick<ClienteFormValues, (typeof ENDERECO_FIELDS)[number]>,
  enderecos: ClienteEndereco[],
): Partial<Record<(typeof ENDERECO_FIELDS)[number], string>> => {
  if (!shouldValidateAddress(values, enderecos)) {
    return {};
  }

  const errors: Partial<Record<(typeof ENDERECO_FIELDS)[number], string>> = {};

  for (const field of ENDERECO_FIELDS) {
    if (!values[field]) {
      errors[field] = REQUIRED_MESSAGE;
    }
  }

  return errors;
};

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

const toEnderecoPayload = (endereco: ClienteEndereco): ClienteEnderecoPayload => ({
  logradouro: endereco.endereco,
  numero: endereco.numero,
  complemento: endereco.complemento,
  bairro: endereco.bairro,
  cidade: endereco.cidade,
  estado: endereco.estado,
  cep: cleanDigits(endereco.cep),
  principal: endereco.padrao,
});

export const buildEnderecosPayload = (
  values: ClienteFormValues,
  enderecos: ClienteEndereco[],
): ClienteEnderecoPayload[] => {
  const payload = enderecos.map(toEnderecoPayload);

  const hasCurrentAddress = values.cep && values.endereco && values.numero;
  if (hasCurrentAddress && enderecos.length === 0) {
    payload.push(
      toEnderecoPayload({
        cep: values.cep,
        estado: values.estado,
        cidade: values.cidade,
        bairro: values.bairro,
        endereco: values.endereco,
        numero: values.numero,
        complemento: values.complemento,
        padrao: values.salvarEnderecoPadrao,
      }),
    );
  }

  return payload;
};

export const buildClientePayload = (
  values: ClienteFormValues,
  enderecos: ClienteEndereco[],
  arquivos: string[],
) => ({
  dados: {
    nome: values.nome,
    email: values.email,
    cpfCnpj: cleanDigits(values.cpfCnpj),
    telefone: cleanDigits(values.telefone),
    tipoCliente: values.tipoCliente ? values.tipoCliente.toUpperCase() : "FIXO",
    observacoes: values.observacoes || "",
    status: (values.status || "ativo").toUpperCase(),
    enderecos: buildEnderecosPayload(values, enderecos),
  },
  arquivos,
});

export const filesToBase64 = (files: File[]): Promise<string[]> =>
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

export const createEnderecoFromForm = (values: ClienteFormValues): ClienteEndereco | null => {
  if (!values.cep || !values.endereco || !values.numero) {
    return null;
  }

  return {
    cep: values.cep,
    estado: values.estado,
    cidade: values.cidade,
    bairro: values.bairro,
    endereco: values.endereco,
    numero: values.numero,
    complemento: values.complemento,
    padrao: values.salvarEnderecoPadrao,
  };
};

export const clearAddressFields = (): Pick<
  ClienteFormValues,
  (typeof ENDERECO_FIELDS)[number] | "salvarEnderecoPadrao"
> => ({
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  endereco: "",
  numero: "",
  complemento: "",
  salvarEnderecoPadrao: false,
});
