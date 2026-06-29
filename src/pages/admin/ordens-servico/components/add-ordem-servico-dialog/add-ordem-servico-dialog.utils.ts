import type { SelectInputOption } from "@/atomic/atm.select-input";
import { cleanDigits } from "@/utils/formatters";
import { ENDERECO_FIELDS } from "./add-ordem-servico-dialog.data";
import type {
  OrdemServicoFormValues,
  ServicoEndereco,
  ViaCepResponse,
} from "./add-ordem-servico-dialog.types";

const REQUIRED_MESSAGE = "Campo obrigatorio";

export const getSelectOptionLabel = (options: SelectInputOption[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

export const formatEnderecoLabel = (endereco: ServicoEndereco) => {
  const complemento = endereco.complemento ? ` - ${endereco.complemento}` : "";
  return `${endereco.endereco}, ${endereco.numero}${complemento} - ${endereco.cidade}/${endereco.estado}`;
};

const isAddressEmpty = (values: Pick<OrdemServicoFormValues, (typeof ENDERECO_FIELDS)[number]>) =>
  ENDERECO_FIELDS.every((field) => !values[field]);

export const getAddressValidationErrors = (
  values: Pick<OrdemServicoFormValues, (typeof ENDERECO_FIELDS)[number]>,
): Partial<Record<(typeof ENDERECO_FIELDS)[number], string>> => {
  if (isAddressEmpty(values)) {
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

export const createEnderecoFromForm = (values: OrdemServicoFormValues): ServicoEndereco | null => {
  if (
    !values.cep ||
    !values.endereco ||
    !values.numero ||
    !values.estado ||
    !values.cidade ||
    !values.bairro
  ) {
    return null;
  }

  return {
    id: `novo-${Date.now()}`,
    cep: values.cep,
    estado: values.estado,
    cidade: values.cidade,
    bairro: values.bairro,
    endereco: values.endereco,
    numero: values.numero,
    complemento: values.complemento,
  };
};

export const clearAddressFields = (): Pick<
  OrdemServicoFormValues,
  (typeof ENDERECO_FIELDS)[number]
> => ({
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  endereco: "",
  numero: "",
  complemento: "",
});
