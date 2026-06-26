import type { components, operations } from "../api-types";

export type Agendamento = components["schemas"]["AgendamentoResponseDTO"];
export type AgendamentoAtividade = components["schemas"]["AgendamentoAtividadeResponseDTO"];

export type CadastrarAgendamentoInput =
  operations["agendamento_cadastrar"]["requestBody"]["content"]["application/json"];

export type CadastrarAgendamentoFormValues = Pick<
  CadastrarAgendamentoInput,
  "clienteId" | "ordemServicoId" | "recorrencia"
> & {
  tecnicoIds?: string[];
  data?: Date;
  horario?: string;
};

export type ReagendarAgendamentoFormValues = Pick<
  CadastrarAgendamentoFormValues,
  "data" | "horario"
>;

export type CadastrarAgendamentoLocalPayload = Pick<
  Agendamento,
  "clienteId" | "clienteNome" | "ordemServicoId"
> & {
  tecnicoNome?: string;
  recorrencia?: Agendamento["recorrencia"];
  data?: Date;
  horario?: string;
  tipoServico?: string;
  endereco?: string;
};

export type CadastrarAgendamentoResponse =
  operations["agendamento_cadastrar"]["responses"][200]["content"]["application/json"];

export type ListAgendamentosParams = operations["agendamento_obter_todos"]["parameters"]["query"];
export type ListAgendamentosResponse =
  components["schemas"]["StandardResponseListAgendamentoResponseDTO"];

export type GetAgendamentoParams = operations["agendamento_obter_por_id"]["parameters"]["path"];
export type GetAgendamentoResponse =
  components["schemas"]["StandardResponseAgendamentoResponseDTO"];

export type EditAgendamentoParams = operations["agendamento_editar"]["parameters"]["path"];
export type EditAgendamentoInput =
  operations["agendamento_editar"]["requestBody"]["content"]["application/json"];
export type EditAgendamentoResponse =
  operations["agendamento_editar"]["responses"][200]["content"]["application/json"];

export type DeleteAgendamentoParams = operations["agendamento_excluir"]["parameters"]["path"];

export type AtualizarChecklistAgendamentoParams =
  operations["agendamento_atualizar_checklist"]["parameters"]["path"];
export type AtualizarChecklistAgendamentoInput =
  operations["agendamento_atualizar_checklist"]["requestBody"]["content"]["application/json"];
export type AtualizarChecklistAgendamentoResponse =
  operations["agendamento_atualizar_checklist"]["responses"][200]["content"]["application/json"];
