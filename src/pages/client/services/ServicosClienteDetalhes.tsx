import { Calendar, ChevronLeft, MapPin, Repeat2 } from "lucide-react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, Body2, H1, H2 } from "@/atomic/atm.typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import type { components } from "@/model/rest/api-types";
import { formatTipoServico, getStatusBadgeClass } from "@/utils/formatters";
import { ServicoCertificados } from "./components/ServicoCertificados";
import { ServicoFotos } from "./components/ServicoFotos";
import { ServicoLaudos } from "./components/ServicoLaudos";

type ServicoState = components["schemas"]["UltimoServicoResponseDTO"] & { status?: string };

const mapStatusToCard = (
  statusApi?: string | null,
): "Em Andamento" | "Agendada" | "Concluída" | "Cancelada" => {
  if (!statusApi) return "Concluída";
  const s = statusApi.toLowerCase();
  if (s.includes("agendado") || s.includes("agendada")) return "Agendada";
  if (s.includes("andamento") || s.includes("aguardo")) return "Em Andamento";
  if (s.includes("concluido") || s.includes("concluida")) return "Concluída";
  if (s.includes("cancelado") || s.includes("cancelada")) return "Cancelada";
  return "Concluída";
};

const ServicosClienteDetalhes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const servicoData = location.state?.servico as ServicoState | undefined;

  if (!servicoData) {
    return <Navigate to={ROUTES.CLIENT_SERVICES} />;
  }

  const dataObj = servicoData.dataHoraServico ? new Date(servicoData.dataHoraServico) : null;
  const formattedTime = dataObj
    ? `${dataObj.toLocaleDateString("pt-BR")} - ${dataObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
    : "--/--/---- --:--";

  const enderecoArray = [
    servicoData.rua,
    servicoData.numero,
    servicoData.complemento,
    servicoData.bairro,
    servicoData.cidade,
    servicoData.estado,
    servicoData.cep,
  ].filter(Boolean);

  const enderecoFormatado =
    enderecoArray.length > 0 ? enderecoArray.join(", ") : "Endereço não informado";

  const servico = {
    id: servicoData.id,
    titulo: formatTipoServico(servicoData.tipoServico),
    data: dataObj ? dataObj.toLocaleDateString("pt-BR") : "--/--/----",
    status: mapStatusToCard(servicoData.status),
    dataHorario: formattedTime,
    endereco: enderecoFormatado,
    recorrencia: servicoData.recorrencia ?? "Nenhuma",
    fotosAntes: servicoData.fotos ?? [],
    fotosDepois: [],
    observacoes: "",
  };

  const laudos = servicoData.laudos ?? [];
  const certificados = servicoData.certificados ?? [];

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
            <div className="flex flex-col gap-xs">
              <H2>{servico.titulo}</H2>
              <Badge className={`font-medium self-start ${getStatusBadgeClass(servico.status)}`}>
                {servico.status}
              </Badge>
            </div>
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
              <ServicoLaudos laudos={laudos} />
            </TabsContent>

            <TabsContent value="certificados" className="pt-md">
              <ServicoCertificados certificados={certificados} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicosClienteDetalhes;
