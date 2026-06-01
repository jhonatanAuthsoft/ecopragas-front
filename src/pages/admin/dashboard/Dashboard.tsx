import { ClipboardCheck, DollarSign, TrendingUp, Users } from "lucide-react";
import { MetricCard } from "./components/MetricCard";
import { RecentClients } from "./components/RecentClients";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das operações da Eco Pragas</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Clientes Ativos"
          value={247}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Serviços do Mês"
          value={89}
          icon={ClipboardCheck}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Faturamento Mensal"
          value="R$ 45.280"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Taxa de Conversão"
          value="68%"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Recent Clients */}
      <RecentClients />
    </div>
  );
};

export default Dashboard;
