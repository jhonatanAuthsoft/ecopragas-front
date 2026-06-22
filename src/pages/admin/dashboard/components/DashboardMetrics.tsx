import { ArrowTrendingUpIcon } from "@/assets/icons/arrow-trending-up";
import { ClipboardDocumentCheckIcon } from "@/assets/icons/clipboard-document-check";
import { CurrencyDollarIcon } from "@/assets/icons/currency-dollar";
import { UsersIcon } from "@/assets/icons/users";
import { LoadingState } from "@/atomic/obj.loading-state";
import { useGetDashboardVisaoGeral } from "@/domain/dashboard";
import type { DashboardVisaoGeral } from "@/model/rest/dashboard";
import { formatCurrency, formatPercentValue } from "@/utils/formatters";
import { MetricCard } from "./MetricCard";

type MetricWithVariation = {
  valorAtual?: number;
  variacaoPercentual?: number;
};

function formatVariationTrend(metric?: MetricWithVariation) {
  if (metric?.variacaoPercentual == null) return undefined;

  const variation = metric.variacaoPercentual;

  return {
    value: Math.round(Math.abs(variation)),
    isPositive: variation >= 0,
  };
}

function buildMetrics(visaoGeral?: DashboardVisaoGeral) {
  return [
    {
      title: "Clientes Ativos",
      value: visaoGeral?.clientesAtivos?.valorAtual ?? 0,
      icon: UsersIcon,
      trend: formatVariationTrend(visaoGeral?.clientesAtivos),
    },
    {
      title: "Servicos do Mes",
      value: visaoGeral?.servicos?.valorAtual ?? 0,
      icon: ClipboardDocumentCheckIcon,
      trend: formatVariationTrend(visaoGeral?.servicos),
    },
    {
      title: "Faturamento Mensal",
      value: formatCurrency(visaoGeral?.faturamento?.valorAtual ?? 0),
      icon: CurrencyDollarIcon,
      trend: formatVariationTrend(visaoGeral?.faturamento),
    },
    {
      title: "Taxa de Conversao",
      value: formatPercentValue(visaoGeral?.taxaConversao?.valorAtual, 2),
      icon: ArrowTrendingUpIcon,
      trend: formatVariationTrend(visaoGeral?.taxaConversao),
    },
  ];
}

export const DashboardMetrics = () => {
  const { visaoGeral, visaoGeralError, isVisaoGeralLoading } = useGetDashboardVisaoGeral();

  const metrics = buildMetrics(visaoGeral);

  const renderCards = (isLoading: boolean) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          trend={metric.trend}
          isLoading={isLoading}
        />
      ))}
    </div>
  );

  return (
    <LoadingState loading={isVisaoGeralLoading} error={!!visaoGeralError} data={!!visaoGeral}>
      <LoadingState.Shimmer>{renderCards(true)}</LoadingState.Shimmer>

      <LoadingState.Error>
        <div className="text-center py-lg">
          <p className="text-lg font-medium text-foreground">Erro ao carregar métricas</p>
          <p className="text-sm text-muted-foreground mt-1">Tente recarregar a página</p>
        </div>
      </LoadingState.Error>

      {renderCards(false)}
    </LoadingState>
  );
};
