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
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";

const Relatorios = () => {
  const servicosPorMes = [
    { mes: "Jan", servicos: 45, receita: 12500 },
    { mes: "Fev", servicos: 52, receita: 14800 },
    { mes: "Mar", servicos: 48, receita: 13200 },
    { mes: "Abr", servicos: 61, receita: 16900 },
    { mes: "Mai", servicos: 55, receita: 15300 },
    { mes: "Jun", servicos: 67, receita: 18400 },
  ];

  const tiposServico = [
    { nome: "Dedetização", valor: 145, percentual: 35 },
    { nome: "Limpeza Caixa D'água", valor: 98, percentual: 24 },
    { nome: "Desinsetização", valor: 87, percentual: 21 },
    { nome: "Descupinização", valor: 56, percentual: 13 },
    { nome: "Outros", valor: 28, percentual: 7 },
  ];

  const statusOS = [
    { status: "Agendadas", quantidade: 28 },
    { status: "Em Andamento", quantidade: 15 },
    { status: "Concluídas", quantidade: 156 },
    { status: "Canceladas", quantidade: 8 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios e Gráficos</h1>
          <p className="text-muted-foreground">Visualize o desempenho e métricas do seu negócio</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Serviços Realizados por Mês</CardTitle>
              <CardDescription>
                Quantidade de serviços concluídos nos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={servicosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="servicos" fill="#8884d8" name="Serviços" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
              <CardDescription>Evolução da receita nos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={servicosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) =>
                      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                        value,
                      )
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
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
            <CardHeader>
              <CardTitle>Tipos de Serviço Mais Solicitados</CardTitle>
              <CardDescription>Distribuição dos serviços por tipo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tiposServico}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ nome, percentual }) => `${nome} (${percentual}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {tiposServico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status das Ordens de Serviço</CardTitle>
              <CardDescription>Visão geral do status das O.S.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusOS} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="status" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantidade" fill="#8884d8" name="Quantidade">
                    {statusOS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Serviços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">328</div>
              <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Receita Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 91.100,00</div>
              <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clientes Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+5 novos este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Taxa de Conclusão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95,2%</div>
              <p className="text-xs text-muted-foreground">Excelente desempenho</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Relatorios;
