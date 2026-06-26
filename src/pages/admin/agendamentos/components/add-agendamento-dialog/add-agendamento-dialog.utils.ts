import type { CadastrarAgendamentoInput } from "@/model/rest/agendamento";
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

export interface AddAgendamentoSelectionLabels {
  clienteNome: string;
  tecnicoNomes: string[];
  ordemServicoTipoServico?: string;
  ordemServicoEndereco?: string;
}

export const buildAddAgendamentoPayload = (
  values: AddAgendamentoFormValues,
  selectionLabels: AddAgendamentoSelectionLabels,
): AddAgendamentoSubmitPayload | null => {
  if (
    !values.clienteId ||
    values.tecnicoIds.length === 0 ||
    !values.data ||
    !values.horario ||
    !values.recorrencia ||
    !selectionLabels.clienteNome
  ) {
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
    clienteNome: selectionLabels.clienteNome,
    ordemServicoId: values.ordemServicoId || undefined,
    tecnicoNome: selectionLabels.tecnicoNomes.join(", "),
    recorrencia,
    data: values.data,
    horario: values.horario,
    tipoServico: selectionLabels.ordemServicoTipoServico ?? "Servico",
    endereco: selectionLabels.ordemServicoEndereco ?? "",
  };
};
