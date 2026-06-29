import type { SelectInputOption } from "@/atomic/atm.select-input";
import type { ClienteEnderecoResponse } from "@/model/rest/cliente";
import type { CadastrarOrdemServicoInput } from "@/model/rest/ordem-servico";
import { formatDateHour } from "@/pages/admin/agendamentos/agendamentos.utils";
import { cleanDigits, formatCurrencyNumber } from "@/utils/formatters";
import { ENDERECO_FIELDS, getTipoServicoVariacao } from "./add-ordem-servico-dialog.data";
import type {
  OrdemServicoFormValues,
  ServicoEndereco,
  ViaCepResponse,
} from "./add-ordem-servico-dialog.types";

const REQUIRED_MESSAGE = "Campo obrigatório";

export const getSelectOptionLabel = (options: SelectInputOption[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

export const getMultiSelectOptionLabels = (options: SelectInputOption[], values: string[]) =>
  values.map((value) => getSelectOptionLabel(options, value)).join(", ");

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

export const mapClienteEnderecoToServicoEndereco = (
  endereco: ClienteEnderecoResponse,
): ServicoEndereco => ({
  id: endereco.id ?? "",
  cep: endereco.cep ?? "",
  estado: endereco.estado ?? "",
  cidade: endereco.cidade ?? "",
  bairro: endereco.bairro ?? "",
  endereco: endereco.rua ?? "",
  numero: endereco.numero ?? "",
  complemento: endereco.complemento ?? "",
  padrao: endereco.padrao,
});

export const buildCadastrarOrdemServicoInput = (
  values: OrdemServicoFormValues,
  endereco: ServicoEndereco,
): CadastrarOrdemServicoInput | null => {
  if (!values.clienteId || !values.tipoServico) {
    return null;
  }

  const dataHoraServico = formatDateHour(values.data ?? new Date(), values.horario || "09:00");

  const variacao = getTipoServicoVariacao(values.tipoServico);

  const dadosEspecificos =
    variacao === "monitoramento_insetos"
      ? {
          areasMonitoramentoInsetos: values.areasMonitoramentoInsetos.map((area) => ({
            areaMonitorada: area.nome,
            pragasAlvo: area.pragaAlvo.length > 0 ? area.pragaAlvo : undefined,
            tratamento: area.tratamento || undefined,
          })),
        }
      : variacao === "monitoramento_roedores"
        ? {
            estacoesMonitoramentoRoedores: values.estacoesMonitoramento.map((estacao) => ({
              nome: estacao.nome,
            })),
          }
        : undefined;

  return {
    clienteId: values.clienteId,
    tipoServico: values.tipoServico,
    valor: formatCurrencyNumber(values.valorServico),
    dataHoraServico,
    rua: endereco.endereco,
    numero: endereco.numero,
    complemento: endereco.complemento || undefined,
    bairro: endereco.bairro,
    cidade: endereco.cidade,
    estado: endereco.estado,
    cep: endereco.cep ? cleanDigits(endereco.cep) : undefined,
    observacoes: values.observacoes || undefined,
    dadosEspecificos,
  };
};
