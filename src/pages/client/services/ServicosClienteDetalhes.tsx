import { Calendar, ChevronLeft, MapPin, Repeat2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, Body2, H1, H2 } from "@/atomic/atm.typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import type { Cliente } from "@/model/rest/cliente";
import { ServicoCertificados } from "./components/ServicoCertificados";
import { ServicoFotos } from "./components/ServicoFotos";
import { ServicoLaudos } from "./components/ServicoLaudos";

const MOCK_CLIENTE: Cliente = {
  id: "mock-cliente-001",
  nomeRazaoSocial: "Supermercado Bom Preco Ltda",
  cnpjCpf: "12.345.678/0001-90",
  tipo: "RECORRENTE",
  telefone: "(11) 98765-4321",
  email: "contato@bompreco.com.br",
  status: "ATIVO",
  cidade: "Sao Paulo",
  estado: "SP",
  dataUltimoServico: "2026-01-15",
  observacoes: "Cliente prioritario - contrato anual",
  enderecos: [
    {
      rua: "Rua das Flores",
      numero: "1500",
      complemento: "Loja 3",
      bairro: "",
      cidade: "Sao Paulo",
      estado: "SP",
      cep: "01310-100",
    },
  ],
  documentos: [
    {
      nome: "Contrato de Servico.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "Alvara de Funcionamento.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "CNPJ.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "Certificado Sanitario.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "Licenca Ambiental.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "Comprovante Endereco.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "ART Responsavel Tecnico.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
  ],
};

const MOCK_SERVICO = {
  titulo: "Controle de Pragas e Vetores",
  status: "Concluída" as const,
  dataHorario: "15/01/2026 - 14:00",
  endereco: "Rua das Flores, 1500, 01310-100, São Paulo - SP",
  recorrencia: "Mensal",
  fotosAntes: [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
  ],
  fotosDepois: [
    "https://picsum.photos/400/300?random=4",
    "https://picsum.photos/400/300?random=5",
    "https://picsum.photos/400/300?random=6",
    "https://picsum.photos/400/300?random=7",
    "https://picsum.photos/400/300?random=8",
  ],
  observacoes:
    "Foi aplicado gel formicida nos rodapés e cantos escuros. Recomendado não lavar o local por 48 horas.",
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Agendada":
      return "bg-grayscale-light text-grayscale-dark border-grayscale-medium";
    case "Em Andamento":
      return "bg-feedback-warning-light text-feedback-warning-dark border-feedback-warning-medium";
    case "Concluída":
      return "bg-feedback-success-light text-feedback-success-dark border-feedback-success-medium";
    case "Cancelada":
      return "bg-feedback-error-light text-feedback-error-dark border-feedback-error-medium";
    default:
      return "bg-grayscale-light text-grayscale-dark border-grayscale-medium";
  }
};

const ServicosClienteDetalhes = () => {
  const navigate = useNavigate();
  const documentos = MOCK_CLIENTE.documentos ?? [];
  const servico = MOCK_SERVICO;

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <Button
          variant="link"
          className="self-start hover:no-underline"
          onClick={() => navigate(ROUTES.CLIENT_SERVICES)}
          leftIcon={<ChevronLeft className="size-md" />}
        >
          Voltar para Serviços
        </Button>

        <div className="flex flex-col self-start gap-xs">
          <H1>Detalhes</H1>
          <Body1 className="font-normal text-grayscale-dark">Visualize detalhes do serviço</Body1>
        </div>

        <div className="flex flex-col gap-sm p-lg bg-transparent rounded-lg shadow-sm border border-grayscale-light">
          <div className="flex items-center justify-between gap-sm">
            <H2>{servico.titulo}</H2>
            <Badge className={`font-medium shrink-0 ${getStatusClass(servico.status)}`}>
              {servico.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-md pt-xs">
            <div className="flex flex-col gap-2xs">
              <div className="flex items-center gap-xs text-grayscale-medium">
                <Calendar size={14} />
                <Body2 className="font-medium">Data e horário</Body2>
              </div>
              <Body2 className="text-grayscale-x-dark">{servico.dataHorario}</Body2>
            </div>
            <div className="flex flex-col gap-2xs">
              <div className="flex items-center gap-xs text-grayscale-medium">
                <MapPin size={14} />
                <Body2 className="font-medium">Endereço</Body2>
              </div>
              <Body2 className="text-grayscale-x-dark">{servico.endereco}</Body2>
            </div>
            <div className="flex flex-col gap-2xs">
              <div className="flex items-center gap-xs text-grayscale-medium">
                <Repeat2 size={14} />
                <Body2 className="font-medium">Recorrência</Body2>
              </div>
              <Body2 className="text-grayscale-x-dark">{servico.recorrencia}</Body2>
            </div>
          </div>

          <div className="w-full h-[1px] bg-grayscale-light mt-sm" />

          <Tabs defaultValue="fotos" className="w-full">
            <TabsList className="w-full bg-transparent border-b border-grayscale-light rounded-none h-auto p-0 gap-0">
              <TabsTrigger
                value="fotos"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary-medium data-[state=active]:text-brand-primary-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none px-lg py-sm text-grayscale-medium font-medium"
              >
                Fotos
              </TabsTrigger>
              <TabsTrigger
                value="laudos"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary-medium data-[state=active]:text-brand-primary-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none px-lg py-sm text-grayscale-medium font-medium"
              >
                Laudos
              </TabsTrigger>
              <TabsTrigger
                value="certificados"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary-medium data-[state=active]:text-brand-primary-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none px-lg py-sm text-grayscale-medium font-medium"
              >
                Certificados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fotos" className="pt-md">
              <ServicoFotos
                fotosAntes={servico.fotosAntes}
                fotosDepois={servico.fotosDepois}
                observacoes={servico.observacoes}
              />
            </TabsContent>

            <TabsContent value="laudos" className="pt-md">
              <ServicoLaudos laudos={documentos} />
            </TabsContent>

            <TabsContent value="certificados" className="pt-md">
              <ServicoCertificados certificados={documentos} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicosClienteDetalhes;
