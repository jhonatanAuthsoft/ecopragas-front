import type { SelectInputOption } from "@/atomic/atm.select-input";
import type { OrdemServicoMock } from "@/model/rest/ordem-servico/ordem-servico.mock.model";
import { cleanDigits, formatCurrencyNumber } from "@/utils/formatters";
import { ENDERECO_FIELDS, MOCK_CLIENTES, MOCK_TECNICOS } from "./add-ordem-servico-dialog.data";
import type {
  OrdemServicoFormValues,
  ServicoEndereco,
  ViaCepResponse,
} from "./add-ordem-servico-dialog.types";

const REQUIRED_MESSAGE = "Campo obrigatorio";

export const getSelectOptionLabel = (options: SelectInputOption[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

const generateNumeroOS = (sequence: number) => {
  const year = new Date().getFullYear();
  return `OS-${year}-${String(sequence).padStart(3, "0")}`;
};

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

export const buildOrdemServicoPayload = (
  values: OrdemServicoFormValues,
  selectedEndereco: ServicoEndereco,
  existingOsCount: number,
): Omit<OrdemServicoMock, "id"> => {
  const cliente = MOCK_CLIENTES.find((item) => item.id === values.clienteId);
  const tecnico = MOCK_TECNICOS.find((item) => item.id === values.tecnicoId);

  return {
    numeroOS: generateNumeroOS(existingOsCount + 1),
    cliente: {
      id: values.clienteId,
      nome: cliente?.nome ?? "",
      cpfCnpj: cliente?.cpfCnpj ?? "",
      telefone: cliente?.telefone ?? "",
    },
    tipoServico: values.tipoServico as OrdemServicoMock["tipoServico"],
    tecnicoId: values.tecnicoId,
    tecnicoNome: tecnico?.nome ?? "",
    dataAgendamento: new Date(),
    horaAgendamento: "09:00",
    endereco: formatEnderecoLabel(selectedEndereco),
    status: (values.status || "agendada") as OrdemServicoMock["status"],
    observacoes: values.observacoes || undefined,
    valorServico: formatCurrencyNumber(values.valorServico),
  };
};
