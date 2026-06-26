import type {
  CadastrarAgendamentoFormValues,
  CadastrarAgendamentoLocalPayload,
} from "@/model/rest/agendamento";

export interface AddAgendamentoSelectionLabels {
  clienteNome: string;
  tecnicoNomes: string[];
  ordemServicoTipoServico?: string;
  ordemServicoEndereco?: string;
}

export const buildAddAgendamentoPayload = (
  values: CadastrarAgendamentoFormValues,
  selectionLabels: AddAgendamentoSelectionLabels,
): CadastrarAgendamentoLocalPayload | null => {
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
    values.recorrencia === "NENHUMA" || !values.recorrencia
      ? undefined
      : values.recorrencia;

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
