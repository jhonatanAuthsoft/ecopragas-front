import { Plus } from "lucide-react";
import { useState } from "react";
import { CheckCircleIcon } from "@/assets/icons/check-circle";
import { ClipboardDocumentListIcon } from "@/assets/icons/clipboard-document-list";
import { ClockIcon } from "@/assets/icons/clock";
import { ExclamationCircleIcon } from "@/assets/icons/exclamation-circle";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1, H2 } from "@/atomic/atm.typography";
import {
  Card,
  CardContent,
  CardSubtitle,
  CardTitleSecondary,
} from "@/atomic/mol.card/card.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { AddOrdemServicoDialog } from "./components/add-ordem-servico-dialog";
import { OrdensServicoTable } from "./components/OrdensServicoTable";

export type OrdemServico = {
  id: string;
  numeroOS: string;
  clienteId: string;
  clienteNome: string;
  tipoServico:
    | "sanitizacao"
    | "controle_pragas_vetores"
    | "higienizacao"
    | "monitoramento_insetos"
    | "monitoramento_roedores";
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

const OS_MOCKS: OrdemServico[] = [
  {
    id: "1",
    numeroOS: "OS-2025-001",
    clienteId: "c1",
    clienteNome: "Restaurante Bom Sabor",
    tipoServico: "controle_pragas_vetores",
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
    tipoServico: "higienizacao",
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
    tipoServico: "monitoramento_roedores",
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
    tipoServico: "controle_pragas_vetores",
    tecnicoId: "t2",
    tecnicoNome: "João Santos",
    dataAgendamento: new Date("2025-01-14"),
    horaAgendamento: "15:00",
    endereco: "Av. Turística, 999 - Guarujá/SP",
    status: "cancelada",
    valorServico: 800,
  },
];

const OrdensServico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>(OS_MOCKS);

  const filteredOrdens = ordensServico.filter(
    (os) =>
      os.numeroOS.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.tecnicoNome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddOrdemServico = (os: OrdemServico) => {
    const newOS: OrdemServico = {
      ...os,
      id: Date.now().toString(),
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
      icon: ClipboardDocumentListIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
      subtitle: "com base na data atual",
    },
    {
      title: "Agendadas",
      value: osAgendadas,
      icon: ClockIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Em Andamento",
      value: osEmAndamento,
      icon: ExclamationCircleIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Concluídas",
      value: osConcluidas,
      icon: CheckCircleIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col self-start gap-xs">
          <H1>Ordens de Serviço</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Gerencie as ordens de serviço e acompanhe a execução
          </Body1>
        </div>

        <div className="flex flex-col gap-md">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardContent>
                    <CardTitleSecondary>{stat.title}</CardTitleSecondary>
                    <H2>{stat.value}</H2>
                    {stat.subtitle && (
                      <CardSubtitle className="text-grayscale-dark">{stat.subtitle}</CardSubtitle>
                    )}
                  </CardContent>

                  <div className={`rounded-full ${stat.bgColor} p-sm`}>
                    <Icon className={`size-lg ${stat.color}`} />
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <SearchInput placeholder="Buscar  por clientes, Nº O.S." onChange={setSearchTerm} />
            <Button
              variant="primary"
              onClick={() => setIsDialogOpen(true)}
              size="lg"
              leftIcon={<Plus className="size-md" />}
            >
              Nova O.S.
            </Button>
          </div>

          <OrdensServicoTable ordensServico={filteredOrdens} />
        </div>

        <AddOrdemServicoDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddOrdemServico={handleAddOrdemServico}
          existingOsCount={ordensServico.length}
        />
      </div>
    </MainLayout>
  );
};

export default OrdensServico;
