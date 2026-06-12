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
import { OS_MOCKS } from "./ordens-servico.mock";

export type PortaIscaRaticidaTypes =
  | "isca_consumida"
  | "isca_danificada"
  | "isca_extraviada"
  | "porta_isca_extraviado"
  | "isca_em_conformidade";
export type ArmadilhaAdesivaTypes =
  | "cola_danificada"
  | "porta_adesivo_quebrado"
  | "porta_adesivo_extraviado"
  | "em_conformidade";

export type OrdemServico = {
  id: string;
  numeroOS: string;
  cliente: {
    id: string;
    nome: string;
    cpfCnpj: string;
    telefone: string;
  };
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
  fotos?: string[];
  fotosAntes?: string[];
  fotosDepois?: string[];
  diagnosticoLocal?: {
    pragasAlvo?: string[];
    areaExterna?: string;
    areaVicinal?: string;
    pontoDeReferencia?: string;
    piscina?: boolean;
    pet?: boolean;
  };
  dadosProduto?: {
    sanitizacao?: {
      principioAtivo?: string;
      produto?: string;
      diluente?: string;
      volume?: string;
      setor?: string;
      equipamento?: string;
    };
    controlePragasVetores?: {
      id?: string;
      principioAtivo?: string;
      concentracao?: string;
      diluente?: string;
      volume?: string;
      setor?: string;
      equipamento?: string;
    }[];
    higienizacao?: {
      tipoEquipamento?: string;
      nivelChuva?: string;
      tempoDuracaoEstimado?: number;
      volume?: number;
      realizarColeta?: boolean;
      fecharRegistro?: boolean;
    };
  };
  vistoria?: {
    id?: string;
    setor?: string;
    situacao?: string;
    medidaCorretiva?: string;
    avaliacao?: string;
  }[];
  descricaoServico?: {
    id?: string;
    setor?: string;
    higieneLocal?: string;
    nivelInfestacao?: string;
    equipamento?: string;
  }[];
  reservatorios?: {
    id?: string;
    reservatorio?: string;
    material?: string;
    volume?: number;
    desinfeccao?: number;
    situacao?: string;
    vetores?: boolean;
    residuos?: boolean;
    fendas?: boolean;
    boia?: string;
    cobertura?: string;
    pintura?: string;
    revestimentoInterno?: string;
    sistemaDeLadrao?: string;
  }[];
  monitoramento?: {
    id?: string;
    areaMonitorada?: string;
    pragaAlvo?: string[];
    tratamento?: string;
    grauInfestacao?: string;
    produtoUtilizado?: string;
    adesiva?: string;
    produto?: string;
    ml?: number;
    refilLuminosa?: boolean;
    quantidade?: number;
    fotos?: string[];
    observacoes?: string;
  }[];
  estacoes?: {
    id?: string;
    nome?: string;
    portaIscaRaticida?: PortaIscaRaticidaTypes[];
    armadilhaAdesiva?: ArmadilhaAdesivaTypes[];
    controle?: {
      id?: string;
      produto?: string;
      quantidade?: number;
    }[];
    pontosVariaveis?: {
      id?: string;
      local?: string;
      produto?: string;
      quantidade?: number;
    }[];
    fotos?: string[];
    observacoes?: string;
  }[];
};

const OrdensServico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>(OS_MOCKS);

  const filteredOrdens = ordensServico.filter(
    (os) =>
      os.numeroOS.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
