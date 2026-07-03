import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Agendamento } from "@/model/rest/agendamento";
import { formatCEP } from "@/utils/formatters";

export const formatEndereco = (
  agendamento: Pick<
    Agendamento,
    "rua" | "numero" | "complemento" | "bairro" | "cidade" | "estado" | "cep"
  >,
): string => {
  const partes = [
    agendamento.rua,
    agendamento.numero,
    agendamento.complemento,
    agendamento.bairro,
    agendamento.cidade,
    agendamento.estado,
    formatCEP(agendamento.cep),
  ].filter(Boolean);

  return partes.length > 0 ? partes.join(", ") : "-";
};

export const formatDataHorario = (dataHoraAgendamento?: string): string => {
  if (!dataHoraAgendamento) {
    return "-";
  }

  const data = new Date(dataHoraAgendamento);

  if (Number.isNaN(data.getTime())) {
    return "-";
  }

  return `${format(data, "dd/MM/yyyy", { locale: ptBR })} - ${format(data, "HH:mm", { locale: ptBR })}`;
};
