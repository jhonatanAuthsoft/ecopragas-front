import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { H2 } from "@/atomic/atm.typography";
import {
  Card,
  CardContent,
  CardSubtitle,
  CardTitleSecondary,
} from "@/atomic/mol.card/card.component";
import { LoadingState } from "@/atomic/obj.loading-state";
import type { buildRelatoriosMetrics } from "../relatorios.utils";

type RelatorioMetric = ReturnType<typeof buildRelatoriosMetrics>[number];

const METRIC_SHIMMER_KEYS = [
  "total-servicos",
  "receita-total",
  "clientes-ativos",
  "taxa-conclusao",
];

interface RelatoriosMetricsProps {
  metrics: RelatorioMetric[];
  isLoading: boolean;
  hasError: boolean;
  hasData: boolean;
}

export const RelatoriosMetrics = ({
  metrics,
  isLoading,
  hasError,
  hasData,
}: RelatoriosMetricsProps) => (
  <LoadingState loading={isLoading} error={hasError} data={hasData}>
    <LoadingState.Shimmer>
      <RelatoriosMetricCardsShimmer />
    </LoadingState.Shimmer>

    <LoadingState.Error>
      <div className="text-center py-lg">
        <p className="text-lg font-medium text-foreground">Erro ao carregar métricas</p>
        <p className="text-sm text-muted-foreground mt-1">Tente recarregar a página</p>
      </div>
    </LoadingState.Error>

    <RelatoriosMetricCards metrics={metrics} />
  </LoadingState>
);

interface RelatoriosMetricCardsProps {
  metrics: RelatorioMetric[];
}

const RelatoriosMetricCards = ({ metrics }: RelatoriosMetricCardsProps) => (
  <div className="grid gap-4 md:grid-cols-4">
    {metrics.map((metric) => (
      <Card key={metric.title}>
        <CardContent>
          <CardTitleSecondary>{metric.title}</CardTitleSecondary>
          <H2>{metric.value}</H2>
          {metric.trend && (
            <CardSubtitle>
              {metric.trend.isPositive ? "+" : "-"}
              {metric.trend.value}% em relação ao mês anterior
            </CardSubtitle>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
);

const RelatoriosMetricCardsShimmer = () => (
  <div className="grid gap-4 md:grid-cols-4">
    {METRIC_SHIMMER_KEYS.map((key) => (
      <Card key={key}>
        <CardContent>
          <Skeleton className="h-[16px] w-[120px]" />
          <Skeleton className="h-[31px] w-[54px] mt-xs" />
        </CardContent>
      </Card>
    ))}
  </div>
);
