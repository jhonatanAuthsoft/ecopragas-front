import type { OrdemServico } from "../../OrdensServico";

export type TipoServico = OrdemServico["tipoServico"];

export const TIPO_SERVICO_LABELS: Record<TipoServico, string> = {
  sanitizacao: "Sanitizacao",
  controle_pragas_vetores: "Controle de Pragas e Vetores",
  higienizacao: "Higienizacao",
  monitoramento_insetos: "Monitoramento de insetos",
  monitoramento_roedores: "Monitoramento de roedores",
};

export const STATUS_LABELS: Record<OrdemServico["status"], string> = {
  agendada: "Agendada",
  em_andamento: "Em andamento",
  concluida: "Concluida",
  cancelada: "Cancelada",
};

export const STATUS_BADGE_COLOR: Record<
  OrdemServico["status"],
  "blue" | "orange" | "neutral" | undefined
> = {
  agendada: "blue",
  em_andamento: "orange",
  concluida: undefined,
  cancelada: "neutral",
};
