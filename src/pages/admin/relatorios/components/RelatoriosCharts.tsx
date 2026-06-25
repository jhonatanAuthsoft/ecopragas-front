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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/atomic/mol.card/card.component";
import { LoadingState } from "@/atomic/obj.loading-state";
import { formatCurrency } from "@/utils/formatters";
import { renderPiePercentLabel } from "../pie-percent-label.utils";
import { RELATORIOS_CHART_COLORS } from "../relatorios.labels";
import type {
  mapFaturamentoMensal,
  mapServicosPorMes,
  mapStatusOS,
  mapTiposServico,
} from "../relatorios.utils";
import { RelatoriosChartsShimmer } from "./RelatoriosChartsShimmer";

interface RelatoriosChartsContentProps {
  servicosPorMes: ReturnType<typeof mapServicosPorMes>;
  faturamentoMensal: ReturnType<typeof mapFaturamentoMensal>;
  tiposServico: ReturnType<typeof mapTiposServico>;
  statusOS: ReturnType<typeof mapStatusOS>;
}

const RelatoriosChartsContent = ({
  servicosPorMes,
  faturamentoMensal,
  tiposServico,
  statusOS,
}: RelatoriosChartsContentProps) => (
  <div className="flex flex-col gap-lg">
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="gap-md!">
          <CardHeader>
            <CardTitle>Serviços Realizados por Mês</CardTitle>
            <CardDescription>Quantidade de serviços concluídos nos últimos 6 meses</CardDescription>
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
            <LineChart data={faturamentoMensal}>
              <CartesianGrid strokeDasharray="1 3" vertical={false} />
              <XAxis dataKey="mes" tickLine={false} tickMargin={4} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
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
            <CardDescription>Quantidade de serviços concluidos nos últimos 6 meses</CardDescription>
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
                  return (
                    <Cell
                      key={key}
                      fill={RELATORIOS_CHART_COLORS[index % RELATORIOS_CHART_COLORS.length]}
                    />
                  );
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
              <Bar dataKey="quantidade" fill="#8884d8" name="Quantidade" radius={8} barSize={24}>
                {statusOS.map((entry, index) => {
                  const key = `report-cell-${entry.status}-${index}`;
                  return (
                    <Cell
                      key={key}
                      fill={RELATORIOS_CHART_COLORS[index % RELATORIOS_CHART_COLORS.length]}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

interface RelatoriosChartsProps extends RelatoriosChartsContentProps {
  isLoading: boolean;
  hasError: boolean;
  hasData: boolean;
}

export const RelatoriosCharts = ({
  servicosPorMes,
  faturamentoMensal,
  tiposServico,
  statusOS,
  isLoading,
  hasError,
  hasData,
}: RelatoriosChartsProps) => (
  <LoadingState loading={isLoading} error={hasError} data={hasData}>
    <LoadingState.Shimmer>
      <RelatoriosChartsShimmer />
    </LoadingState.Shimmer>

    <LoadingState.Error>
      <div className="text-center py-lg">
        <p className="text-lg font-medium text-foreground">Erro ao carregar gráficos</p>
        <p className="text-sm text-muted-foreground mt-1">Tente recarregar a página</p>
      </div>
    </LoadingState.Error>

    <RelatoriosChartsContent
      servicosPorMes={servicosPorMes}
      faturamentoMensal={faturamentoMensal}
      tiposServico={tiposServico}
      statusOS={statusOS}
    />
  </LoadingState>
);
