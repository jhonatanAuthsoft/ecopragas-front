import { CheckCircleIcon } from "@/assets/icons/check-circle";
import { ClipboardDocumentListIcon } from "@/assets/icons/clipboard-document-list";
import { ClockIcon } from "@/assets/icons/clock";
import { ExclamationCircleIcon } from "@/assets/icons/exclamation-circle";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { H2 } from "@/atomic/atm.typography";
import {
  Card,
  CardContent,
  CardSubtitle,
  CardTitleSecondary,
} from "@/atomic/mol.card/card.component";
import { LoadingState } from "@/atomic/obj.loading-state";
import type { OrdemServicoMetricas } from "@/model/rest/ordem-servico";

interface OrdensServicoMetricsProps {
  metricas?: OrdemServicoMetricas;
  isLoading?: boolean;
  error?: boolean;
}

export const OrdensServicoMetrics = ({ metricas, isLoading, error }: OrdensServicoMetricsProps) => {
  const stats = [
    {
      title: "Total de O.S.",
      value: metricas?.total ?? 0,
      icon: ClipboardDocumentListIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
      subtitle: "com base na data atual",
    },
    {
      title: "Agendadas",
      value: metricas?.agendadas ?? 0,
      icon: ClockIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Em Andamento",
      value: metricas?.emAndamento ?? 0,
      icon: ExclamationCircleIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Concluídas",
      value: metricas?.concluidas ?? 0,
      icon: CheckCircleIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
  ];

  const renderCards = (showSkeleton: boolean) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent>
              <CardTitleSecondary>{stat.title}</CardTitleSecondary>
              {showSkeleton ? (
                <Skeleton className="h-[31px] w-[54px] mt-xs" />
              ) : (
                <H2>{stat.value}</H2>
              )}
              {stat.subtitle && !showSkeleton && (
                <CardSubtitle className="text-grayscale-dark">{stat.subtitle}</CardSubtitle>
              )}
            </CardContent>

            <div className={`rounded-full ${stat.bgColor} p-sm`}>
              <Icon className={`size-lg ${stat.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <LoadingState loading={isLoading} error={error} data={!!metricas}>
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
