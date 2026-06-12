import { ArrowTrendingUpIcon } from "@/assets/icons/arrow-trending-up";
import { ClipboardDocumentCheckIcon } from "@/assets/icons/clipboard-document-check";
import { CurrencyDollarIcon } from "@/assets/icons/currency-dollar";
import { UsersIcon } from "@/assets/icons/users";
import { Body1, H1 } from "@/atomic/atm.typography";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { MetricCard } from "./components/MetricCard";
import { RecentClients } from "./components/RecentClients";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col self-start gap-xs">
          <H1>Dashboard</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Visão geral das operações da Eco Pragas
          </Body1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Clientes Ativos"
            value={247}
            icon={UsersIcon}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Serviços do Mês"
            value={89}
            icon={ClipboardDocumentCheckIcon}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Faturamento Mensal"
            value="R$ 45.280"
            icon={CurrencyDollarIcon}
            trend={{ value: 15, isPositive: true }}
          />
          <MetricCard
            title="Taxa de Conversão"
            value="68%"
            icon={ArrowTrendingUpIcon}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <RecentClients />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
