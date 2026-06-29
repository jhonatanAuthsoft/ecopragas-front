import type { SelectInputOption } from "@/atomic/atm.select-input";
import type {
  Agendamento,
  CadastrarAgendamentoFormValues,
  ReagendarAgendamentoFormValues,
} from "@/model/rest/agendamento";
import { parseDataHoraServico } from "../../agendamentos.utils";

interface ReagendarAgendamentoDisplayLabels {
  clienteNome: string;
  ordemServicoLabel: string;
  tecnicoOptions: SelectInputOption[];
}

export const buildReagendarFormValues = (
  agendamento: Agendamento,
): CadastrarAgendamentoFormValues => {
  const { data, horario } = parseDataHoraServico(agendamento.dataHoraServico);
  const tecnicosIds =
    agendamento.tecnicos?.map((tecnico) => tecnico.id ?? "").filter(Boolean) ?? [];

  return {
    clienteId: agendamento.clienteId ?? "",
    ordemServicoId: agendamento.ordemServicoId ?? "",
    tecnicosIds,
    recorrencia: agendamento.recorrencia ?? "NENHUMA",
    data,
    horario,
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
