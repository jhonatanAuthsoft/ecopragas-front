import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Body1, H1, H2 } from "@/atomic/atm.typography";
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardSubtitle,
  CardTitle,
  CardTitleSecondary,
} from "@/atomic/mol.card/card.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { formatCurrency } from "@/utils/formatters";
import { renderPiePercentLabel } from "./pie-percent-label.utils";

interface DateRange {
  start: Date;
  end: Date;
}

const Relatorios = () => {
  const [dateFilter, setDateFilter] = useState<Date | DateRange | undefined>(undefined);

  const servicosPorMes = [
    { mes: "Jan", servicos: 80, receita: 12500 },
    { mes: "Fev", servicos: 52, receita: 14800 },
    { mes: "Mar", servicos: 48, receita: 13200 },
    { mes: "Abr", servicos: 71, receita: 16900 },
    { mes: "Mai", servicos: 15, receita: 15300 },
    { mes: "Jun", servicos: 67, receita: 18400 },
  ];

  const tiposServico = [
    { nome: "Limpeza Caixa D'água", valor: 98, percentual: 24 },
    { nome: "Dedetização", valor: 145, percentual: 35 },
    { nome: "Sanitização", valor: 87, percentual: 21 },
    { nome: "Desratização", valor: 56, percentual: 13 },
    { nome: "Outros", valor: 28, percentual: 7 },
  ];

  const statusOS = [
    { status: "Agendadas", quantidade: 170 },
    { status: "Em Andamento", quantidade: 45 },
    { status: "Concluídas", quantidade: 106 },
    { status: "Canceladas", quantidade: 30 },
  ];

  const metrics = [
    { title: "Total de Serviços", value: 328, trend: { value: 12, isPositive: true } },
    { title: "Receita Total", value: formatCurrency(91100), trend: { value: 8, isPositive: true } },
    { title: "Clientes Ativos", value: 156, trend: { value: 5, isPositive: true } },
    { title: "Taxa de Conclusão", value: "95,2%" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <MainLayout>
      <div className="flex flex-col gap-lg">
        <div className="flex flex-col">
          <div className="flex flex-col gap-xs">
            <H1>Relatórios e Gráficos</H1>
            <Body1 className="font-normal text-grayscale-dark">
              Visualize o desempenho e métricas do seu negócio
            </Body1>
          </div>

          <CalendarDropdown
            className="self-end"
            value={dateFilter}
            onChange={(val) =>
              setDateFilter(
                val instanceof Date
                  ? val
                  : val.start
                    ? { start: val.start as Date, end: val.end as Date }
                    : undefined,
              )
            }
            maxDate={new Date()}
            label="Selecione o período"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardContent>
                <CardTitleSecondary>{metric.title}</CardTitleSecondary>
                <H2>{metric.value}</H2>
                {metric.trend && (
                  <CardSubtitle>
                    {metric.trend.isPositive ? "+" : "-"}
                    {metric.trend.value}% em relação ao mês anterior
                  </CardSubtitle>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="gap-md!">
              <CardHeader>
                <CardTitle>Serviços Realizados por Mês</CardTitle>
                <CardDescription>
                  Quantidade de serviços concluídos nos últimos 6 meses
                </CardDescription>
              </CardHeader>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={servicosPorMes}>
                  <CartesianGrid strokeDasharray="1 3" vertical={false} />

                  <XAxis dataKey="mes" tickLine={false} tickMargin={4} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="servicos" fill="#1EB1FF" radius={8} barSize={33} name="Serviços" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="gap-md!">
              <CardHeader>
                <CardTitle>Faturamento Mensal</CardTitle>
                <CardDescription>Evolução da receita nos últimos 6 meses</CardDescription>
              </CardHeader>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={servicosPorMes}>
                  <CartesianGrid strokeDasharray="1 3" vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} tickMargin={4} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip
                    formatter={(value: number) =>
                      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                        value,
                      )
                    }
                  />
                  <Line
                    type="linear"
                    dataKey="receita"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    name="Receita (R$)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="gap-md!">
              <CardHeader>
                <CardTitle>Tipos de Serviço Mais Solicitados</CardTitle>
                <CardDescription>
                  Quantidade de serviços concluidos nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={tiposServico}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderPiePercentLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="valor"
                    nameKey="nome"
                  >
                    {tiposServico.map((entry, index) => {
                      const key = `report-cell-${entry.nome}-${index}`;
                      return <Cell key={key} fill={COLORS[index % COLORS.length]} />;
                    })}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="top"
                    iconType="circle"
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="gap-md!">
              <CardHeader>
                <CardTitle>Status das Ordens de Serviço</CardTitle>
                <CardDescription>Visão geral do status das O.S.</CardDescription>
              </CardHeader>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={statusOS} layout="vertical" barCategoryGap="20%">
                  <XAxis type="number" tickLine={false} />
                  <YAxis
                    dataKey="status"
                    type="category"
                    width={110}
                    axisLine={false}
                    tickLine={false}
                    tick={{ textAnchor: "start", dx: -106 }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="quantidade"
                    fill="#8884d8"
                    name="Quantidade"
                    radius={8}
                    barSize={24}
                  >
                    {statusOS.map((entry, index) => {
                      const key = `report-cell-${entry.status}-${index}`;
                      return <Cell key={key} fill={COLORS[index % COLORS.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Relatorios;
