import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";

export type TipoServico = NonNullable<OrdemServico["tipoServico"]>;
export type StatusOrdemServico = NonNullable<OrdemServico["status"]>;

export const TIPO_SERVICO_LABELS: Record<TipoServico, string> = {
  SANITIZACAO: "Sanitização",
  CONTROLE_PRAGAS_VETORES: "Controle de Pragas e Vetores",
  HIGIENIZACAO: "Higienização",
  MONITORAMENTO_INSETOS: "Monitoramento de insetos",
  MONITORAMENTO_ROEDORES: "Monitoramento de roedores",
};

export const STATUS_LABELS: Record<StatusOrdemServico, string> = {
  AGENDADO: "Agendado",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
};

export const STATUS_BADGE_COLOR: Record<
  StatusOrdemServico,
  "blue" | "orange" | "neutral" | undefined
> = {
  AGENDADO: "blue",
  EM_ANDAMENTO: "orange",
  CONCLUIDO: undefined,
  CANCELADO: "neutral",
};

export const PORTA_ISCA_RATICIDA_LABELS: Record<string, string> = {
  consumida: "Isca consumida",
  danificada: "Isca danificada",
  extraviada: "Isca extraviada",
  porta_isca_extraviado: "Porta isca extraviada",
  conformidade: "Isca em conformidade",
};

export const PORTA_ISCA_RATICIDA_ALIASES: Record<string, string> = {
  isca_consumida: "consumida",
  isca_danificada: "danificada",
  isca_extraviada: "extraviada",
  isca_em_conformidade: "conformidade",
  porta_isca_extraviada: "porta_isca_extraviado",
};

export const ARMADILHA_ADESIVA_LABELS: Record<string, string> = {
  cola_danificada: "Cola danificada",
  porta_adesivo_quebrado: "Porta adesivo quebrada",
  porta_adesivo_extraviado: "Porta adesivo extraviada",
  conformidade: "Em conformidade",
};

export const ARMADILHA_ADESIVA_ALIASES: Record<string, string> = {
  em_conformidade: "conformidade",
  porta_adesivo_quebrada: "porta_adesivo_quebrado",
  porta_adesivo_extraviada: "porta_adesivo_extraviado",
};
