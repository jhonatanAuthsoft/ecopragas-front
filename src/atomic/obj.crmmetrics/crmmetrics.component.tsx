import { ArrowPathIcon } from "@/assets/icons/arrowpath";
import { BankNotesIcon } from "@/assets/icons/banknotes";
import { UsersIcon } from "@/assets/icons/users";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { H2 } from "@/atomic/atm.typography";
import {
  Card,
  CardContent,
  CardSubtitle,
  CardTitleSecondary,
} from "@/atomic/mol.card/card.component";
import { LoadingState } from "@/atomic/obj.loading-state";
import { useGetLeadDashboard } from "@/domain/lead";
import { formatCurrency } from "@/utils/formatters";

// TODO: pegar esses valores do back
const MOCK_LEADS_GANHOS = 0;
const MOCK_LEADS_PERDIDOS = 0;
const MOCK_CAC_CUSTO_MARKETING = 5000;

export const CRMMetrics = () => {
  const { dashboard, dashboardError, isDashboardLoading } = useGetLeadDashboard();

  const taxaConversao = (dashboard?.taxaConversao ?? 0).toFixed(2);
  const cacMedio = MOCK_LEADS_GANHOS > 0 ? MOCK_CAC_CUSTO_MARKETING / MOCK_LEADS_GANHOS : 0;

  const metrics = [
    {
      title: "Total de Leads",
      value: dashboard?.totalLeads ?? 0,
      icon: UsersIcon,
    },
    {
      title: "Leads Ativos",
      value: dashboard?.leadsAtivos ?? 0,
      icon: UsersIcon,
    },
    {
      title: "Valor Fechado",
      value: formatCurrency(dashboard?.valorFechado ?? 0),
      icon: BankNotesIcon,
    },
    {
      title: "Valor Potencial",
      value: formatCurrency(dashboard?.valorPotencial ?? 0),
      icon: BankNotesIcon,
    },
    {
      title: "Taxa de Conversão",
      value: `${taxaConversao}%`,
      icon: ArrowPathIcon,
      subtitle: `${MOCK_LEADS_GANHOS} ganhos / ${MOCK_LEADS_PERDIDOS} perdidos`,
    },
    {
      title: "CAC Médio",
      value: formatCurrency(cacMedio),
      icon: BankNotesIcon,
      subtitle: "Custo de Aquisição por Cliente",
    },
  ];

  const renderCards = (showSkeleton: boolean) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardContent>
              <CardTitleSecondary>{metric.title}</CardTitleSecondary>
              {showSkeleton ? (
                <Skeleton className="h-[31px] w-[54px] mt-xs" />
              ) : (
                <H2>{metric.value}</H2>
              )}

              {metric.subtitle && !showSkeleton && (
                <CardSubtitle className="text-grayscale-dark">{metric.subtitle}</CardSubtitle>
              )}
            </CardContent>

            <div className="self-start rounded-full bg-brand-cta-light p-2xs">
              <Icon className="size-5 text-brand-primary-medium" />
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <LoadingState loading={isDashboardLoading} error={!!dashboardError} data={!!dashboard}>
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
