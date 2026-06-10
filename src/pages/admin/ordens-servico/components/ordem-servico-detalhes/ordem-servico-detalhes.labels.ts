import type { OrdemServico } from "../../OrdensServico";

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
