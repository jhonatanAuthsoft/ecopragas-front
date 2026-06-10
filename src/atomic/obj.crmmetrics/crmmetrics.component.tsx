import { ArrowPathIcon } from "@/assets/icons/arrowpath";
import { BankNotesIcon } from "@/assets/icons/banknotes";
import { UsersIcon } from "@/assets/icons/users";
import { H2 } from "@/atomic/atm.typography";
import {
  Card,
  CardContent,
  CardSubtitle,
  CardTitleSecondary,
} from "@/atomic/mol.card/card.component";
import type { Lead } from "@/pages/leads/Leads";

interface CRMMetricsProps {
  leads: Lead[];
}

export const CRMMetrics = ({ leads }: CRMMetricsProps) => {
  const totalLeads = leads.length;
  const leadsGanhos = leads.filter((l) => l.status === "ganho").length;
  const leadsPerdidos = leads.filter((l) => l.status === "perdido").length;
  const leadsAtivos = leads.filter((l) => !["ganho", "perdido"].includes(l.status)).length;

  const valorTotal = leads
    .filter((l) => l.status === "ganho")
    .reduce((sum, lead) => sum + lead.value, 0);

  const valorPotencial = leads
    .filter((l) => !["ganho", "perdido"].includes(l.status))
    .reduce((sum, lead) => sum + lead.value, 0);

  const taxaConversao = totalLeads > 0 ? ((leadsGanhos / totalLeads) * 100).toFixed(1) : "0";

  const cacSimulado = leadsGanhos > 0 ? (5000 / leadsGanhos).toFixed(2) : "0";

  const metrics = [
    {
      title: "Total de Leads",
      value: totalLeads,
      icon: UsersIcon,
    },
    {
      title: "Leads Ativos",
      value: leadsAtivos,
      icon: UsersIcon,
    },
    {
      title: "Valor Fechado",
      value: `R$ ${valorTotal.toLocaleString("pt-BR")}`,
      icon: BankNotesIcon,
    },
    {
      title: "Valor Potencial",
      value: `R$ ${valorPotencial.toLocaleString("pt-BR")}`,
      icon: BankNotesIcon,
    },
    {
      title: "Taxa de Conversão",
      value: `${taxaConversao}%`,
      icon: ArrowPathIcon,
      subtitle: `${leadsGanhos} ganhos / ${leadsPerdidos} perdidos`,
    },
    {
      title: "CAC Médio",
      value: `R$ ${Number(cacSimulado).toLocaleString("pt-BR")}`,
      icon: BankNotesIcon,
      subtitle: "Custo de Aquisição por Cliente",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardContent>
              <CardTitleSecondary>{metric.title}</CardTitleSecondary>
              <H2>{metric.value}</H2>

              {metric.subtitle && (
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
};
