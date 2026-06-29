import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";

export type StatusOrdemServico = NonNullable<OrdemServico["status"]>;

export const STATUS_OS_LABELS: Record<StatusOrdemServico, string> = {
  AGENDADO: "Agendadas",
  EM_ANDAMENTO: "Em Andamento",
  CONCLUIDO: "Concluídas",
  CANCELADO: "Canceladas",
};

export const RELATORIOS_CHART_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
