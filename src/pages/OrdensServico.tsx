import { AlertCircle, CheckCircle2, ClipboardList, Clock, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import { AddOrdemServicoDialog } from "@/atomic/obj.add-ordem-servico-dialog/add-ordem-servico-dialog.component";
import { OrdensServicoTable } from "@/atomic/obj.ordens-servico-table/ordens-servico-table.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";

export type OrdemServico = {
  id: string;
  numeroOS: string;
  clienteId: string;
  clienteNome: string;
  tipoServico: "dedetizacao" | "limpeza_caixa" | "sanitizacao" | "desratizacao" | "outro";
  tecnicoId: string;
  tecnicoNome: string;
  dataAgendamento: Date;
  horaAgendamento: string;
  endereco: string;
  status: "agendada" | "em_andamento" | "concluida" | "cancelada";
  observacoes?: string;
  dataConclusao?: Date;
  valorServico: number;
  fotosAntes?: string[];
  fotosDepois?: string[];
};

const OrdensServico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([
    {
      id: "1",
      numeroOS: "OS-2025-001",
      clienteId: "c1",
      clienteNome: "Restaurante Bom Sabor",
      tipoServico: "dedetizacao",
      tecnicoId: "t1",
      tecnicoNome: "Carlos Silva",
      dataAgendamento: new Date("2025-01-15"),
      horaAgendamento: "09:00",
      endereco: "Rua das Flores, 123 - São Paulo/SP",
      status: "concluida",
      dataConclusao: new Date("2025-01-15"),
      valorServico: 450,
    },
    {
      id: "2",
      numeroOS: "OS-2025-002",
      clienteId: "c2",
      clienteNome: "Padaria Pão Quente",
      tipoServico: "limpeza_caixa",
      tecnicoId: "t2",
      tecnicoNome: "João Santos",
      dataAgendamento: new Date("2025-01-16"),
      horaAgendamento: "14:00",
      endereco: "Av. Principal, 456 - São Paulo/SP",
      status: "em_andamento",
      valorServico: 300,
    },
    {
      id: "3",
      numeroOS: "OS-2025-003",
      clienteId: "c3",
      clienteNome: "Supermercado Central",
      tipoServico: "sanitizacao",
      tecnicoId: "t1",
      tecnicoNome: "Carlos Silva",
      dataAgendamento: new Date("2025-01-17"),
      horaAgendamento: "08:00",
      endereco: "Rua do Comércio, 789 - São Paulo/SP",
      status: "agendada",
      valorServico: 1200,
    },
    {
      id: "4",
      numeroOS: "OS-2025-004",
      clienteId: "c4",
      clienteNome: "Ana Oliveira",
      tipoServico: "desratizacao",
      tecnicoId: "t3",
      tecnicoNome: "Pedro Costa",
      dataAgendamento: new Date("2025-01-18"),
      horaAgendamento: "10:00",
      endereco: "Rua das Palmeiras, 321 - São Paulo/SP",
      status: "agendada",
      valorServico: 350,
    },
    {
      id: "5",
      numeroOS: "OS-2025-005",
      clienteId: "c5",
      clienteNome: "Hotel Descanso",
      tipoServico: "dedetizacao",
      tecnicoId: "t2",
      tecnicoNome: "João Santos",
      dataAgendamento: new Date("2025-01-14"),
      horaAgendamento: "15:00",
      endereco: "Av. Turística, 999 - Guarujá/SP",
      status: "cancelada",
      valorServico: 800,
    },
  ]);

  const filteredOrdens = ordensServico.filter(
    (os) =>
      os.numeroOS.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.tecnicoNome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddOrdemServico = (os: Omit<OrdemServico, "id" | "numeroOS">) => {
    const year = new Date().getFullYear();
    const nextNumber = ordensServico.length + 1;
    const numeroOS = `OS-${year}-${String(nextNumber).padStart(3, "0")}`;

    const newOS: OrdemServico = {
      ...os,
      id: Date.now().toString(),
      numeroOS,
    };
    setOrdensServico([newOS, ...ordensServico]);
    setIsDialogOpen(false);
  };

  const totalOS = ordensServico.length;
  const osAgendadas = ordensServico.filter((os) => os.status === "agendada").length;
  const osEmAndamento = ordensServico.filter((os) => os.status === "em_andamento").length;
  const osConcluidas = ordensServico.filter((os) => os.status === "concluida").length;

  const stats = [
    {
      title: "Total de O.S.",
      value: totalOS,
      icon: ClipboardList,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-primary-light/20",
    },
    {
      title: "Agendadas",
      value: osAgendadas,
      icon: Clock,
      color: "text-brand-secondary-dark",
      bgColor: "bg-brand-secondary-light/30",
    },
    {
      title: "Em Andamento",
      value: osEmAndamento,
      icon: AlertCircle,
      color: "text-feedback-warning-medium",
      bgColor: "bg-feedback-warning-light",
    },
    {
      title: "Concluídas",
      value: osConcluidas,
      icon: CheckCircle2,
      color: "text-feedback-success-medium",
      bgColor: "bg-feedback-success-light",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ordens de Serviço</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie as ordens de serviço e acompanhe a execução
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Nova O.S.
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
                  placeholder="Buscar por número da O.S., cliente ou técnico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <OrdensServicoTable ordensServico={filteredOrdens} />
          </CardContent>
        </Card>

        <AddOrdemServicoDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddOrdemServico={handleAddOrdemServico}
        />
      </div>
    </MainLayout>
  );
};

export default OrdensServico;
