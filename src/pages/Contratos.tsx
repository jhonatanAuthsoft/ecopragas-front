import { CheckCircle2, Clock, FileText, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import { ContratosTable } from "@/atomic/obj.contratos-table/contratos-table.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";

export type Contrato = {
  id: string;
  numeroContrato: string;
  clienteId: string;
  clienteNome: string;
  clienteCpfCnpj: string;
  tipoServico: string;
  valorMensal: number;
  dataInicio: Date;
  dataVencimento: Date;
  status: "ativo" | "pendente" | "vencido" | "cancelado";
  assinadoEm?: Date;
  urlDocumento?: string;
};

const Contratos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - dados de exemplo
  const [contratos] = useState<Contrato[]>([
    {
      id: "1",
      numeroContrato: "CONT-2025-001",
      clienteId: "c1",
      clienteNome: "Restaurante Bom Sabor",
      clienteCpfCnpj: "12.345.678/0001-90",
      tipoServico: "Dedetização Mensal",
      valorMensal: 450,
      dataInicio: new Date("2025-01-01"),
      dataVencimento: new Date("2026-01-01"),
      status: "ativo",
      assinadoEm: new Date("2024-12-28"),
      urlDocumento: "#",
    },
    {
      id: "2",
      numeroContrato: "CONT-2025-002",
      clienteId: "c2",
      clienteNome: "Padaria Pão Quente",
      clienteCpfCnpj: "98.765.432/0001-10",
      tipoServico: "Limpeza de Caixa D'água",
      valorMensal: 300,
      dataInicio: new Date("2025-01-15"),
      dataVencimento: new Date("2025-07-15"),
      status: "ativo",
      assinadoEm: new Date("2025-01-10"),
      urlDocumento: "#",
    },
    {
      id: "3",
      numeroContrato: "CONT-2025-003",
      clienteId: "c3",
      clienteNome: "Supermercado Central",
      clienteCpfCnpj: "11.222.333/0001-44",
      tipoServico: "Controle de Pragas Completo",
      valorMensal: 1200,
      dataInicio: new Date("2025-02-01"),
      dataVencimento: new Date("2026-02-01"),
      status: "pendente",
      urlDocumento: "#",
    },
    {
      id: "4",
      numeroContrato: "CONT-2024-045",
      clienteId: "c4",
      clienteNome: "Hotel Descanso",
      clienteCpfCnpj: "55.666.777/0001-88",
      tipoServico: "Dedetização Trimestral",
      valorMensal: 800,
      dataInicio: new Date("2024-06-01"),
      dataVencimento: new Date("2024-12-31"),
      status: "vencido",
      assinadoEm: new Date("2024-05-25"),
      urlDocumento: "#",
    },
    {
      id: "5",
      numeroContrato: "CONT-2024-032",
      clienteId: "c5",
      clienteNome: "Clínica Saúde Total",
      clienteCpfCnpj: "33.444.555/0001-22",
      tipoServico: "Sanitização Mensal",
      valorMensal: 650,
      dataInicio: new Date("2024-03-01"),
      dataVencimento: new Date("2025-03-01"),
      status: "cancelado",
      assinadoEm: new Date("2024-02-20"),
      urlDocumento: "#",
    },
  ]);

  const filteredContratos = contratos.filter(
    (contrato) =>
      contrato.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.numeroContrato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.clienteCpfCnpj.includes(searchTerm),
  );

  const totalContratos = contratos.length;
  const contratosAtivos = contratos.filter((c) => c.status === "ativo").length;
  const contratosPendentes = contratos.filter((c) => c.status === "pendente").length;
  const contratosVencidos = contratos.filter((c) => c.status === "vencido").length;

  const valorTotalMensal = contratos
    .filter((c) => c.status === "ativo")
    .reduce((sum, c) => sum + c.valorMensal, 0);

  const stats = [
    {
      title: "Total de Contratos",
      value: totalContratos,
      icon: FileText,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-primary-light/20",
    },
    {
      title: "Contratos Ativos",
      value: contratosAtivos,
      icon: CheckCircle2,
      color: "text-feedback-success-medium",
      bgColor: "bg-feedback-success-light",
    },
    {
      title: "Pendentes Assinatura",
      value: contratosPendentes,
      icon: Clock,
      color: "text-feedback-warning-medium",
      bgColor: "bg-feedback-warning-light",
    },
    {
      title: "Vencidos",
      value: contratosVencidos,
      icon: XCircle,
      color: "text-feedback-error-medium",
      bgColor: "bg-feedback-error-light",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contratos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os contratos de clientes fixos e esporádicos
            </p>
          </div>
          <Button size="lg">
            <FileText className="mr-2 h-5 w-5" />
            Novo Contrato
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className={`rounded-full ${stat.bgColor} p-3`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente, número do contrato ou CPF/CNPJ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="mb-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Receita Mensal Recorrente (Contratos Ativos)
                  </p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    R$ {valorTotalMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">MRR Anual Projetado</p>
                  <p className="text-xl font-semibold text-foreground mt-1">
                    R${" "}
                    {(valorTotalMensal * 12).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            <ContratosTable contratos={filteredContratos} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Contratos;
