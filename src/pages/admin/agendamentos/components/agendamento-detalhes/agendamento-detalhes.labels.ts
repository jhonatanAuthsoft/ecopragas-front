import type { Agendamento } from "@/model/rest/agendamento";

export const TIPO_SERVICO_LABELS: Record<Agendamento["tipoServico"], string> = {
  DEDETIZACAO: "Dedetizacao",
  LIMPEZA_CAIXA_AGUA: "Limpeza de caixa d'agua",
  SANITIZACAO: "Sanitizacao",
  DESRATIZACAO: "Desratizacao",
  OUTROS: "Outros",
};

export const STATUS_LABELS: Record<Agendamento["status"], string> = {
  AGENDADO: "Agendado",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluido",
  CANCELADO: "Cancelado",
};

export const RECORRENCIA_LABELS: Record<Agendamento["recorrencia"], string> = {
  NENHUMA: "Fixo",
  SEMANAL: "Semanal",
  MENSAL: "Mensal",
  TRIMESTRAL: "Trimestral",
  SEMESTRAL: "Semestral",
  ANUAL: "Anual",
};

export const getBadgeRecorrenciaLabel = (recorrencia?: Agendamento["recorrencia"]): string => {
  if (!recorrencia || recorrencia === "NENHUMA") {
    return RECORRENCIA_LABELS.NENHUMA;
  }

  return RECORRENCIA_LABELS[recorrencia];
};
