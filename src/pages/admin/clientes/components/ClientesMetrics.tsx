import { BuildingOffice2Icon } from "@/assets/icons/building-office-2";
import { UserPlusIcon } from "@/assets/icons/user-plus";
import { UsersIcon } from "@/assets/icons/users";
import { Body2, H2 } from "@/atomic/atm.typography";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import type { Cliente } from "../types";

interface ClientesMetricsProps {
  clientes: Cliente[];
  totalElements: number;
}

export const ClientesMetrics = ({ clientes, totalElements }: ClientesMetricsProps) => {
  const totalClientes = totalElements || clientes.length;
  const clientesAtivos = clientes.filter((c) => c.status === "ativo").length;
  const clientesFixos = clientes.filter((c) => c.tipoCliente === "fixo").length;
  const clientesEsporadicos = clientes.filter((c) => c.tipoCliente === "esporadico").length;

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
          <Card key={stat.title} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-xs">
                <div className="flex flex-col gap-xs">
                  <Body2 className="text-xxs! text-grayscale-dark font-normal">{stat.title}</Body2>
                  <H2>{stat.value}</H2>
                </div>
                <div className={`p-sm rounded-full ${stat.bgColor}`}>
                  <Icon className={`size-lg ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
