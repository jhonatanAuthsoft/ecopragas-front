import type { CadastrarAgendamentoInput } from "@/model/rest/agendamento";

// TODO: apagar apos integrar com API
export interface AddAgendamentoFormValues {
  clienteId: string;
  ordemServicoId: string;
  tecnicoIds: string[];
  recorrencia: CadastrarAgendamentoInput["recorrencia"] | "";
  data?: Date;
  horario: string;
}

// TODO: apagar apos integrar com API
export type AgendamentoRecorrenciaMock =
  | "semanal"
  | "mensal"
  | "trimestral"
  | "semestral"
  | "anual";

// TODO: apagar apos integrar com API
export interface AddAgendamentoSubmitPayload {
  clienteId: string;
  clienteNome: string;
  ordemServicoId?: string;
  tecnicoNome: string;
  recorrencia?: AgendamentoRecorrenciaMock;
  data: Date;
  horario: string;
  tipoServico: string;
  endereco: string;
}
