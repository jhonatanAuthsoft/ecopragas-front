import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";

export type TipoServico = NonNullable<OrdemServico["tipoServico"]>;
export type StatusOrdemServico = NonNullable<OrdemServico["status"]>;

export const TIPO_SERVICO_LABELS: Record<TipoServico, string> = {
  SANITIZACAO: "Sanitizacao",
  CONTROLE_PRAGAS_VETORES: "Controle de Pragas e Vetores",
  HIGIENIZACAO: "Higienizacao",
  MONITORAMENTO_INSETOS: "Monitoramento de insetos",
  MONITORAMENTO_ROEDORES: "Monitoramento de roedores",
};

export const STATUS_LABELS: Record<StatusOrdemServico, string> = {
  AGENDADO: "Agendado",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluido",
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
