import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { OrdemServicoDetalhesData } from "./ordem-servico-detalhes.types";

export const formatDataHorario = (ordem: OrdemServicoDetalhesData): string => {
  if (ordem.dataAgendamento && ordem.horaAgendamento) {
    return `${format(ordem.dataAgendamento, "dd/MM/yyyy", { locale: ptBR })} - ${ordem.horaAgendamento}`;
  }
  if (ordem.dataAgendamento) {
    return format(ordem.dataAgendamento, "dd/MM/yyyy", { locale: ptBR });
  }
  return "-";
};
