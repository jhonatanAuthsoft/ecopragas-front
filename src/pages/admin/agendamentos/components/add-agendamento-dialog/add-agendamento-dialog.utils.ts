import type {
  CadastrarAgendamentoFormValues,
  CadastrarAgendamentoInput,
} from "@/model/rest/agendamento";
import { formatDateHour } from "../../agendamentos.utils";

export const buildCadastrarAgendamentoInput = (
  values: CadastrarAgendamentoFormValues,
): CadastrarAgendamentoInput | null => {
  return {
    ordemServicoId: values.ordemServicoId,
    tecnicosIds: values.tecnicosIds,
    dataHoraServico: formatDateHour(values.data, values.horario),
    recorrencia: values.recorrencia,
  };
};
