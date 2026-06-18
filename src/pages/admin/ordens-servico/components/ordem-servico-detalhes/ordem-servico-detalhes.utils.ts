import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { OrdemServico } from "@/model/rest/ordem-servico";

export const formatDataHorario = (ordem: OrdemServico): string => {
  if (ordem.dataAgendamento && ordem.horaAgendamento) {
    return `${format(ordem.dataAgendamento, "dd/MM/yyyy", { locale: ptBR })} - ${ordem.horaAgendamento}`;
  }
  if (ordem.dataAgendamento) {
    return format(ordem.dataAgendamento, "dd/MM/yyyy", { locale: ptBR });
  }
  return "-";
};
