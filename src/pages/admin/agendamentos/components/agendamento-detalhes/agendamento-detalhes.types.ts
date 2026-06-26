import type { Agendamento } from "@/model/rest/agendamento";

// TODO: remover ao integrar
export type AgendamentoDetalhesExtras = {
  clienteTelefone?: string;
  numeroOrdemServico?: string;
  valorServico?: number;
};

export type AgendamentoDetalhesView = Agendamento & AgendamentoDetalhesExtras;
