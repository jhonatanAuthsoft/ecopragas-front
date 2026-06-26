import { format } from "date-fns";
import type { SelectInputOption } from "@/atomic/atm.select-input";
import type {
  Agendamento,
  CadastrarAgendamentoFormValues,
  ReagendarAgendamentoFormValues,
} from "@/model/rest/agendamento";

const TECNICO_DISPLAY_VALUE = "tecnico-display";

interface ReagendarAgendamentoDisplayLabels {
  clienteNome: string;
  ordemServicoLabel: string;
  tecnicoOptions: SelectInputOption[];
}

const parseAgendamentoDataHora = (
  dataHoraServico?: string,
): Pick<CadastrarAgendamentoFormValues, "data" | "horario"> => {
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
  agendamento: Agendamento,
): CadastrarAgendamentoFormValues => {
  const { data, horario } = parseAgendamentoDataHora(agendamento.dataHoraServico);
  const tecnicoResponsavel = agendamento.tecnicoResponsavel?.trim();

  return {
    clienteId: agendamento.clienteId ?? "",
    ordemServicoId: agendamento.ordemServicoId ?? "",
    tecnicoIds: tecnicoResponsavel ? [TECNICO_DISPLAY_VALUE] : [],
    recorrencia: agendamento.recorrencia ?? "NENHUMA",
    data,
    horario,
  };
};

export const buildReagendarDisplayLabels = (
  agendamento: Agendamento,
): ReagendarAgendamentoDisplayLabels => {
  const tecnicoResponsavel = agendamento.tecnicoResponsavel?.trim();

  return {
    clienteNome: agendamento.clienteNome ?? "",
    // TODO: adicionar ao atualizar back
    ordemServicoLabel: agendamento.ordemServicoId ?? "-",
    tecnicoOptions: tecnicoResponsavel
      ? [{ value: TECNICO_DISPLAY_VALUE, label: tecnicoResponsavel }]
      : [],
  };
};

export const buildReagendarPayload = (
  values: Pick<CadastrarAgendamentoFormValues, "data" | "horario">,
): ReagendarAgendamentoFormValues | null => {
  if (!values.data || !values.horario) {
    return null;
  }

  return {
    data: values.data,
    horario: values.horario,
  };
};
