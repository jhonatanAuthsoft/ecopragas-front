import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { IdentificationIcon } from "@/assets/icons/identification";
import { MapPinIcon } from "@/assets/icons/map-pin";
import { PhoneIcon } from "@/assets/icons/phone";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, Body2, H1, H2, H3 } from "@/atomic/atm.typography";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { formatTecnicosLabel } from "@/pages/admin/agendamentos/agendamentos.utils";
import {
  formatCPFCNPJ,
  formatPhone,
  formatTipoServico,
  getStatusBadgeClass,
} from "@/utils/formatters";

type AgendamentoStatus = "agendada" | "em_andamento" | "concluida" | "cancelada";

const STATUS_LABELS: Record<AgendamentoStatus, string> = {
  agendada: "Agendada",
  em_andamento: "Em Andamento",
  concluida: "Concluída",
  cancelada: "Cancelada",
};

const mapStatusDaApi = (statusApi: string): AgendamentoStatus => {
  if (!statusApi) return "agendada";
  const s = statusApi.toLowerCase();
  if (s.includes("agendado") || s.includes("agendada")) return "agendada";
  if (s.includes("andamento") || s.includes("aguardo")) return "em_andamento";
  if (s.includes("concluido") || s.includes("concluida")) return "concluida";
  if (s.includes("cancelado") || s.includes("cancelada")) return "cancelada";
  return "agendada";
};

const DetalhesAgendamento = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const agendamentoRaw = location.state?.agendamento;

  if (!agendamentoRaw) {
    return <Navigate to={ROUTES.CLIENT_SCHEDULING} />;
  }

  // console.log(agendamentoRaw);

  const dataObj = agendamentoRaw.dataHoraAgendamento
    ? new Date(agendamentoRaw.dataHoraAgendamento)
    : null;
  const status = mapStatusDaApi(agendamentoRaw.status ?? "");

  const enderecoArray = [
    agendamentoRaw.rua,
    agendamentoRaw.numero,
    agendamentoRaw.complemento,
    agendamentoRaw.bairro,
    agendamentoRaw.cidade,
    agendamentoRaw.estado,
    agendamentoRaw.cep,
  ].filter(Boolean);
  const enderecoFormatado =
    enderecoArray.length > 0 ? enderecoArray.join(", ") : "Endereço não informado";

  const agendamento = {
    id: agendamentoRaw.id,
    servico: formatTipoServico(agendamentoRaw.tipoServico),
    data: dataObj ? format(dataObj, "dd/MM/yyyy", { locale: ptBR }) : "--/--/----",
    horario: dataObj ? format(dataObj, "HH:mm") : "--:--",
    status: status,
    tecnico: formatTecnicosLabel(agendamentoRaw.tecnicos) ?? "Não definido",
    endereco: enderecoFormatado,
    cpf: agendamentoRaw.clienteCpfCnpj
      ? formatCPFCNPJ(agendamentoRaw.clienteCpfCnpj)
      : "Não informado",
    telefone: agendamentoRaw.clienteTelefone
      ? formatPhone(agendamentoRaw.clienteTelefone)
      : "Não informado",
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <Button
          variant="link"
          className="self-start hover:no-underline"
          onClick={() => navigate(ROUTES.CLIENT_SCHEDULING)}
          leftIcon={<ChevronLeft className="size-md" />}
        >
          Voltar para Agendamentos
        </Button>

        <div className="flex flex-col self-start gap-xs">
          <H1>Detalhes do Agendamento</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Visualize detalhes do seu agendamento
          </Body1>
        </div>

        <div className="flex flex-col gap-lg p-lg bg-transparent rounded-lg shadow-sm border border-grayscale-light">
          <div className="flex flex-col gap-xs">
            <Badge className={`font-medium self-start ${getStatusBadgeClass(agendamento.status)}`}>
              {STATUS_LABELS[agendamento.status]}
            </Badge>
            <div className="flex flex-col gap-xs">
              <H2 className="capitalize">{agendamento.servico}</H2>
              <div className="flex flex-wrap items-center gap-md">
                <div className="flex items-center gap-2xs text-grayscale-dark">
                  <IdentificationIcon className="shrink-0 size-lg text-grayscale-medium" />
                  <Body2>{agendamento.cpf}</Body2>
                </div>
                <div className="flex items-center gap-2xs text-grayscale-dark">
                  <PhoneIcon className="shrink-0 size-lg text-grayscale-medium" />
                  <Body2>{agendamento.telefone}</Body2>
                </div>
                <div className="flex items-center gap-2xs text-grayscale-dark">
                  <MapPinIcon className="shrink-0 size-lg text-grayscale-medium" />
                  <Body2>{agendamento.endereco}</Body2>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-grayscale-light" />

          <div className="flex flex-col gap-md">
            <H3 className="text-grayscale-x-dark">Dados do Serviço</H3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="flex flex-col gap-2xs">
                <Body2 className="font-medium text-grayscale-medium font-bold">
                  Técnico responsável
                </Body2>
                <Body2 className="text-grayscale-x-dark">{agendamento.tecnico}</Body2>
              </div>
              <div className="flex flex-col gap-2xs">
                <Body2 className="font-medium text-grayscale-medium font-bold">
                  Data e horário
                </Body2>
                <Body2 className="text-grayscale-x-dark">
                  {agendamento.data} às {agendamento.horario}
                </Body2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DetalhesAgendamento;
