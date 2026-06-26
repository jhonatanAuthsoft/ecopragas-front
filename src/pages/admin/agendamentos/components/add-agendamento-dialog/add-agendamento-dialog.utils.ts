import type { SelectInputOption } from "@/atomic/atm.select-input";
import type { CadastrarAgendamentoInput } from "@/model/rest/agendamento";
import type { Cliente } from "@/model/rest/cliente";
import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";
import type { Tecnico } from "@/model/rest/tecnico";
import { formatCPFCNPJ, formatTipoServico } from "@/utils/formatters";
import type {
  AddAgendamentoFormValues,
  AddAgendamentoSubmitPayload,
  AgendamentoRecorrenciaMock,
} from "./add-agendamento-dialog.types";

const RECORRENCIA_TO_MOCK: Record<
  Exclude<CadastrarAgendamentoInput["recorrencia"], "NENHUMA">,
  AgendamentoRecorrenciaMock
> = {
  SEMANAL: "semanal",
  MENSAL: "mensal",
  TRIMESTRAL: "trimestral",
  SEMESTRAL: "semestral",
  ANUAL: "anual",
};

export const getClienteSelectLabel = (cliente: Cliente): string => {
  const nome = cliente.nomeRazaoSocial ?? "-";
  const documento = cliente.cnpjCpf ? formatCPFCNPJ(cliente.cnpjCpf) : "";

  return documento ? `${nome} [${documento}]` : nome;
};

export const getOrdemServicoSelectLabel = (ordemServico: OrdemServico): string => {
  const numero = ordemServico.osNumero != null ? `OS-${ordemServico.osNumero}` : "-";
  const tipo = ordemServico.tipoServico ? formatTipoServico(ordemServico.tipoServico) : "";

  return tipo ? `${numero} - ${tipo}` : numero;
};

export const getClienteOptions = (clientes: Cliente[]): SelectInputOption[] =>
  clientes
    .filter((cliente) => cliente.id)
    .map((cliente) => ({
      value: cliente.id as string,
      label: getClienteSelectLabel(cliente),
    }));

export const getOrdemServicoOptions = (ordensServico: OrdemServico[]): SelectInputOption[] =>
  ordensServico
    .filter((ordemServico) => ordemServico.id)
    .map((ordemServico) => ({
      value: ordemServico.id as string,
      label: getOrdemServicoSelectLabel(ordemServico),
    }));

export const getTecnicoOptions = (tecnicos: Tecnico[]): SelectInputOption[] =>
  tecnicos
    .filter((tecnico) => tecnico.id)
    .map((tecnico) => ({
      value: tecnico.id as string,
      label: tecnico.nome ?? "-",
    }));

export const filterOrdensServicoByCliente = (
  ordensServico: OrdemServico[],
  clienteId: string,
): OrdemServico[] => {
  if (!clienteId) {
    return [];
  }

  return ordensServico.filter((ordemServico) => ordemServico.clienteId === clienteId);
};

const formatEnderecoFromOrdemServico = (ordemServico?: OrdemServico): string => {
  if (!ordemServico) {
    return "";
  }

  const rua = [ordemServico.rua, ordemServico.numero].filter(Boolean).join(", ");
  const cidade = [ordemServico.bairro, ordemServico.cidade, ordemServico.estado]
    .filter(Boolean)
    .join(" - ");

  return [rua, cidade].filter(Boolean).join(" | ");
};

export const buildAddAgendamentoPayload = (
  values: AddAgendamentoFormValues,
  clientes: Cliente[],
  tecnicos: Tecnico[],
  ordensServico: OrdemServico[],
): AddAgendamentoSubmitPayload | null => {
  const cliente = clientes.find((item) => item.id === values.clienteId);
  const tecnico = tecnicos.find((item) => item.id === values.tecnicoId);
  const ordemServico = ordensServico.find((item) => item.id === values.ordemServicoId);

  if (!cliente || !tecnico || !values.data || !values.horario || !values.recorrencia) {
    return null;
  }

  const recorrencia =
    values.recorrencia === "NENHUMA"
      ? undefined
      : RECORRENCIA_TO_MOCK[
          values.recorrencia as Exclude<CadastrarAgendamentoInput["recorrencia"], "NENHUMA">
        ];

  return {
    clienteId: values.clienteId,
    clienteNome: cliente.nomeRazaoSocial ?? "-",
    ordemServicoId: ordemServico?.id,
    tecnicoNome: tecnico.nome ?? "-",
    recorrencia,
    data: values.data,
    horario: values.horario,
    tipoServico: ordemServico?.tipoServico
      ? formatTipoServico(ordemServico.tipoServico)
      : "Servico",
    endereco: formatEnderecoFromOrdemServico(ordemServico),
  };
};
