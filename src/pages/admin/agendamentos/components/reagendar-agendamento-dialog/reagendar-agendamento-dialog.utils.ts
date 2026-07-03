import type { SelectInputOption } from "@/atomic/atm.select-input";
import type {
  Agendamento,
  CadastrarAgendamentoFormValues,
  EditAgendamentoInput,
  ReagendarAgendamentoFormValues,
} from "@/model/rest/agendamento";
import { parseDateTime } from "@/utils/date-time";
import { formatDateHour } from "../../agendamentos.utils";

interface ReagendarAgendamentoDisplayLabels {
  clienteNome: string;
  ordemServicoLabel: string;
  tecnicoOptions: SelectInputOption[];
}

export const buildReagendarFormValues = (
  agendamento: Agendamento,
): CadastrarAgendamentoFormValues => {
  const { date, time } = parseDateTime(agendamento.dataHoraAgendamento);
  const tecnicosIds =
    agendamento.tecnicos?.map((tecnico) => tecnico.id ?? "").filter(Boolean) ?? [];

  return {
    clienteId: agendamento.clienteId ?? "",
    ordemServicoId: agendamento.ordemServicoId ?? "",
    tecnicosIds,
    recorrencia: agendamento.recorrencia ?? "NENHUMA",
    data: date,
    horario: time,
  };
};

export const buildReagendarDisplayLabels = (
  agendamento: Agendamento,
): ReagendarAgendamentoDisplayLabels => {
  return {
    clienteNome: agendamento.clienteNome ?? "",
    ordemServicoLabel: agendamento.ordemServicoId ?? "-",
    tecnicoOptions:
      agendamento.tecnicos
        ?.filter((tecnico) => tecnico.id && tecnico.nome)
        .map((tecnico) => ({
          value: tecnico.id ?? "",
          label: tecnico.nome ?? "",
        })) ?? [],
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

export const buildEditAgendamentoInput = (
  agendamento: Agendamento,
  values: ReagendarAgendamentoFormValues,
): EditAgendamentoInput | null => {
  const tecnicosIds =
    agendamento.tecnicos?.map((tecnico) => tecnico.id ?? "").filter(Boolean) ?? [];

  return {
    ordemServicoId: agendamento.ordemServicoId,
    tecnicosIds: tecnicosIds.length > 0 ? tecnicosIds : undefined,
    dataHoraServico: formatDateHour(values.data, values.horario),
    recorrencia: agendamento.recorrencia ?? "NENHUMA",
    status: agendamento.status,
  };
};
