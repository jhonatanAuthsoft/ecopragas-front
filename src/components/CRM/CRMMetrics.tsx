import { Lead } from "@/pages/Leads";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Target, Percent } from "lucide-react";

interface CRMMetricsProps {
  leads: Lead[];
}

export const CRMMetrics = ({ leads }: CRMMetricsProps) => {
  const totalLeads = leads.length;
  const leadsGanhos = leads.filter((l) => l.status === "ganho").length;
  const leadsPerdidos = leads.filter((l) => l.status === "perdido").length;
  const leadsAtivos = leads.filter(
    (l) => !["ganho", "perdido"].includes(l.status)
  ).length;

  const valorTotal = leads
    .filter((l) => l.status === "ganho")
    .reduce((sum, lead) => sum + lead.value, 0);

  const valorPotencial = leads
    .filter((l) => !["ganho", "perdido"].includes(l.status))
    .reduce((sum, lead) => sum + lead.value, 0);

  const taxaConversao =
    totalLeads > 0 ? ((leadsGanhos / totalLeads) * 100).toFixed(1) : "0";

  // CAC simulado (custo de aquisição por cliente)
  const cacSimulado = leadsGanhos > 0 ? (5000 / leadsGanhos).toFixed(2) : "0";

  const metrics = [
    {
      title: "Total de Leads",
      value: totalLeads,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Leads Ativos",
      value: leadsAtivos,
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Valor Fechado",
      value: `R$ ${valorTotal.toLocaleString("pt-BR")}`,
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Valor Potencial",
      value: `R$ ${valorPotencial.toLocaleString("pt-BR")}`,
      icon: Target,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      title: "Taxa de Conversão",
      value: `${taxaConversao}%`,
      icon: Percent,
      color: "text-accent",
      bgColor: "bg-accent/10",
      subtitle: `${leadsGanhos} ganhos / ${leadsPerdidos} perdidos`,
    },
    {
      title: "CAC Médio",
      value: `R$ ${cacSimulado}`,
      icon: DollarSign,
      color: "text-warning",
      bgColor: "bg-warning/10",
      subtitle: "Custo de Aquisição por Cliente",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  {metric.subtitle && (
                    <p className="text-xs text-muted-foreground">
                      {metric.subtitle}
                    </p>
                  )}
                </div>
                <div className={`rounded-full ${metric.bgColor} p-2`}>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
