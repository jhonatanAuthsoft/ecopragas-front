import { Body1, H1 } from "@/atomic/atm.typography";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { DashboardMetrics } from "./components/DashboardMetrics";
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

        <DashboardMetrics />
        <RecentClients />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
