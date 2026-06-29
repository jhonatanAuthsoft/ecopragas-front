import type { OrdemServico } from "@/model/rest/ordem-servico";

export const TIPO_SERVICO_RELATORIO_LABELS: Record<string, string> = {
  DEDETIZACAO: "Dedetização",
  LIMPEZA_CAIXA_AGUA: "Limpeza de Caixa d'água",
  SANITIZACAO: "Sanitização",
  DESRATIZACAO: "Desratização",
  OUTROS: "Outros",
};

export const STATUS_OS_LABELS: Record<OrdemServico["status"], string> = {
  agendada: "Agendadas",
  em_andamento: "Em Andamento",
  concluida: "Concluídas",
  cancelada: "Canceladas",
};

export const RELATORIOS_CHART_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
