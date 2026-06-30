import { endOfDay, formatISO, startOfDay } from "date-fns";
import type {
  DashboardMetricas,
  DashboardVisaoGeral,
  GetDashboardMetricasParams,
} from "@/model/rest/dashboard";

type DataRange = { start: Date; end: Date };
export type DateFilter = Date | DataRange | undefined;

export function mapDateFilterToDashboardParams(
  dateFilter: DateFilter,
): GetDashboardMetricasParams | undefined {
  if (!dateFilter) return undefined;

  if (dateFilter instanceof Date) {
    return {
      dataHoraInicio: formatISO(startOfDay(dateFilter)),
      dataHoraFim: formatISO(endOfDay(dateFilter)),
    };
  }

  if (!dateFilter.start || !dateFilter.end) return undefined;

  const start = dateFilter.start <= dateFilter.end ? dateFilter.start : dateFilter.end;
  const end = dateFilter.start <= dateFilter.end ? dateFilter.end : dateFilter.start;

  return {
    dataHoraInicio: formatISO(startOfDay(start)),
    dataHoraFim: formatISO(endOfDay(end)),
  };
}

import { formatCurrency, formatPercentValue, formatTipoServico } from "@/utils/formatters";
import { STATUS_OS_LABELS, type StatusOrdemServico } from "./relatorios.labels";

type MetricWithVariation = {
  valorAtual?: number;
  variacaoPercentual?: number;
};

export function formatVariationTrend(metric?: MetricWithVariation) {
  if (metric?.variacaoPercentual == null) return undefined;

  const variation = metric.variacaoPercentual;

  return {
    value: Math.round(Math.abs(variation)),
    isPositive: variation >= 0,
  };
}

export function buildRelatoriosMetrics(visaoGeral?: DashboardVisaoGeral) {
  return [
    {
      title: "Total de Serviços",
      value: visaoGeral?.servicos?.valorAtual ?? 0,
      trend: formatVariationTrend(visaoGeral?.servicos),
    },
    {
      title: "Receita Total",
      value: formatCurrency(visaoGeral?.faturamento?.valorAtual ?? 0),
      trend: formatVariationTrend(visaoGeral?.faturamento),
    },
    {
      title: "Clientes Ativos",
      value: visaoGeral?.clientesAtivos?.valorAtual ?? 0,
      trend: formatVariationTrend(visaoGeral?.clientesAtivos),
    },
    {
      title: "Taxa de Conclusão",
      value: formatPercentValue(visaoGeral?.taxaConclusao?.valorAtual, 1),
      trend: formatVariationTrend(visaoGeral?.taxaConclusao),
    },
  ];
}

export function mapServicosPorMes(metricas?: DashboardMetricas) {
  return (metricas?.servicosRealizados ?? []).map((item) => ({
    mes: item.mes ?? "",
    servicos: item.quantidade ?? 0,
  }));
}

export function mapFaturamentoMensal(metricas?: DashboardMetricas) {
  return (metricas?.faturamentoMensal ?? []).map((item) => ({
    mes: item.mes ?? "",
    receita: item.faturamento ?? 0,
  }));
}

export function mapTiposServico(metricas?: DashboardMetricas) {
  const items = metricas?.servicosMaisSolicitados ?? [];
  const total = items.reduce((sum, item) => sum + (item.quantidade ?? 0), 0);

  return items.map((item) => {
    const valor = item.quantidade ?? 0;
    const tipoServico = item.tipoServico ?? "";

    return {
      nome: formatTipoServico(tipoServico),
      valor,
      percentual: total > 0 ? Math.round((valor / total) * 100) : 0,
    };
  });
}

export function mapStatusOS(metricas?: DashboardMetricas) {
  return (metricas?.statusOSs ?? []).map((item) => {
    const status = (item.status ?? "").toUpperCase() as StatusOrdemServico;

    return {
      status: STATUS_OS_LABELS[status] ?? item.status ?? "-",
      quantidade: item.quantidade ?? 0,
    };
  });
}
