import { BuildingOffice2Icon } from "@/assets/icons/building-office-2";
import { UserPlusIcon } from "@/assets/icons/user-plus";
import { UsersIcon } from "@/assets/icons/users";
import { H2 } from "@/atomic/atm.typography";
import { Card, CardContent, CardTitleSecondary } from "@/atomic/mol.card/card.component";
import type { Cliente } from "@/model/rest/cliente";

interface ClientesMetricsProps {
  clientes: Cliente[];
  totalElements: number;
}

export const ClientesMetrics = ({ clientes, totalElements }: ClientesMetricsProps) => {
  const totalClientes = totalElements || clientes.length;
  const clientesAtivos = clientes.filter((c) => c.status === "ATIVO").length;
  const clientesFixos = clientes.filter((c) => c.tipo === "RECORRENTE").length;
  const clientesEsporadicos = clientes.filter((c) => c.tipo === "ESPORADICO").length;

  const stats = [
    {
      title: "Total de Clientes",
      value: totalClientes,
      icon: UsersIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Clientes Ativos",
      value: clientesAtivos,
      icon: UserPlusIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Clientes Fixos",
      value: clientesFixos,
      icon: BuildingOffice2Icon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Clientes Esporadicos",
      value: clientesEsporadicos,
      icon: UsersIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent>
              <CardTitleSecondary>{stat.title}</CardTitleSecondary>
              <H2>{stat.value}</H2>
            </CardContent>

            <div className={`p-sm rounded-full ${stat.bgColor}`}>
              <Icon className={`size-lg ${stat.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
