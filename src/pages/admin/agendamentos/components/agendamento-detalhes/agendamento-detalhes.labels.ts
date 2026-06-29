import type { Agendamento } from "@/model/rest/agendamento";

export const TIPO_SERVICO_LABELS: Record<NonNullable<Agendamento["tipoServico"]>, string> = {
  SANITIZACAO: "Sanitização",
  CONTROLE_PRAGAS_VETORES: "Controle de pragas e vetores",
  HIGIENIZACAO: "Higienização",
  MONITORAMENTO_INSETOS: "Monitoramento de insetos",
  MONITORAMENTO_ROEDORES: "Monitoramento de roedores",
};

export const STATUS_LABELS: Record<NonNullable<Agendamento["status"]>, string> = {
  AGENDADO: "Agendado",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
};

export const RECORRENCIA_LABELS: Record<NonNullable<Agendamento["recorrencia"]>, string> = {
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
