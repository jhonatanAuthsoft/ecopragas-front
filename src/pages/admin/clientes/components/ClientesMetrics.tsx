import { BuildingOffice2Icon } from "@/assets/icons/building-office-2";
import { UserPlusIcon } from "@/assets/icons/user-plus";
import { UsersIcon } from "@/assets/icons/users";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { H2 } from "@/atomic/atm.typography";
import { Card, CardContent, CardTitleSecondary } from "@/atomic/mol.card/card.component";
import { LoadingState } from "@/atomic/obj.loading-state";
import type { ClienteDashboard } from "@/model/rest/cliente";

interface ClientesMetricsProps {
  dashboard?: ClienteDashboard;
  isLoading?: boolean;
  error?: boolean;
}

export const ClientesMetrics = ({ dashboard, isLoading, error }: ClientesMetricsProps) => {
  const stats = [
    {
      title: "Total de Clientes",
      value: dashboard?.totalClientes ?? 0,
      icon: UsersIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Clientes Ativos",
      value: dashboard?.clientesAtivos ?? 0,
      icon: UserPlusIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Clientes Fixos",
      value: dashboard?.clientesFixos ?? 0,
      icon: BuildingOffice2Icon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Clientes Esporadicos",
      value: dashboard?.clientesEsporadicos ?? 0,
      icon: UsersIcon,
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
            </CardContent>

            <div className={`p-sm rounded-full ${stat.bgColor}`}>
              <Icon className={`size-lg ${stat.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <LoadingState loading={isLoading} error={error} data={!!dashboard}>
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
