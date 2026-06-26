import { format } from "date-fns";
import type { SelectInputOption } from "@/atomic/atm.select-input";
import type { AddAgendamentoFormValues } from "../add-agendamento-dialog/add-agendamento-dialog.types";
import type { AgendamentoDetalhesView } from "../agendamento-detalhes/agendamento-detalhes.types";
import type { ReagendarAgendamentoSubmitPayload } from "./reagendar-agendamento-dialog.types";

const TECNICO_DISPLAY_VALUE = "tecnico-display";

interface ReagendarAgendamentoDisplayLabels {
  clienteNome: string;
  ordemServicoLabel: string;
  tecnicoOptions: SelectInputOption[];
}

const parseAgendamentoDataHora = (
  dataHoraServico?: string,
): Pick<AddAgendamentoFormValues, "data" | "horario"> => {
  if (!dataHoraServico) {
    return { data: undefined, horario: "" };
  }

  const parsed = new Date(dataHoraServico);

  if (Number.isNaN(parsed.getTime())) {
    return { data: undefined, horario: "" };
  }

  return {
    data: parsed,
    horario: format(parsed, "HH:mm"),
  };
};

export const buildReagendarFormValues = (
  agendamento: AgendamentoDetalhesView,
): AddAgendamentoFormValues => {
  const { data, horario } = parseAgendamentoDataHora(agendamento.dataHoraServico);
  const tecnicoResponsavel = agendamento.tecnicoResponsavel?.trim();

  return {
    clienteId: agendamento.clienteId ?? "",
    ordemServicoId: agendamento.ordemServicoId ?? "",
    tecnicoIds: tecnicoResponsavel ? [TECNICO_DISPLAY_VALUE] : [],
    recorrencia: agendamento.recorrencia ?? "",
    data,
    horario,
  };
};

export const buildReagendarDisplayLabels = (
  agendamento: AgendamentoDetalhesView,
): ReagendarAgendamentoDisplayLabels => {
  const tecnicoResponsavel = agendamento.tecnicoResponsavel?.trim();

  return {
    clienteNome: agendamento.clienteNome ?? "",
    ordemServicoLabel: agendamento.numeroOrdemServico ?? agendamento.ordemServicoId ?? "-",
    tecnicoOptions: tecnicoResponsavel
      ? [{ value: TECNICO_DISPLAY_VALUE, label: tecnicoResponsavel }]
      : [],
  };
};

export const buildReagendarPayload = (
  values: Pick<AddAgendamentoFormValues, "data" | "horario">,
): ReagendarAgendamentoSubmitPayload | null => {
  if (!values.data || !values.horario) {
    return null;
  }

  return {
    data: values.data,
    horario: values.horario,
  };
};
