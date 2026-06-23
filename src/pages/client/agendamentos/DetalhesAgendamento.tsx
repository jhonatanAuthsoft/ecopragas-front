import { Calendar, ChevronLeft, IdCard, MapPin, Phone, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, Body2, H1, H2, H3 } from "@/atomic/atm.typography";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";

type AgendamentoStatus = "agendada" | "em_andamento" | "concluida" | "cancelada";

const STATUS_LABELS: Record<AgendamentoStatus, string> = {
  agendada: "Agendada",
  em_andamento: "Em Andamento",
  concluida: "Concluída",
  cancelada: "Cancelada",
};

const getStatusClass = (status: AgendamentoStatus) => {
  switch (status) {
    case "agendada":
      return "bg-grayscale-light text-grayscale-dark border-grayscale-medium";
    case "em_andamento":
      return "bg-feedback-warning-light text-feedback-warning-dark border-brand-accessory-orange";
    case "concluida":
      return "bg-feedback-success-light text-feedback-success-dark border-feedback-success-medium";
    case "cancelada":
      return "bg-feedback-error-light text-feedback-error-dark border-feedback-error-medium";
  }
};

// TODO: substituir por dados da API quando disponível
const MOCK_AGENDAMENTOS = [
  {
    id: "1",
    servico: "Controle de Pragas e Vetores",
    data: "15/01/2026",
    horario: "08:00",
    status: "concluida" as AgendamentoStatus,
    tecnico: "Carlos Silva",
    endereco: "Rua das Flores, 1500, 01310-100, São Paulo - SP",
    cpf: "123.456.789-00",
    telefone: "(11) 98765-4321",
  },
  {
    id: "2",
    servico: "Limpeza de caixa d'água",
    data: "22/01/2026",
    horario: "10:30",
    status: "em_andamento" as AgendamentoStatus,
    tecnico: "Ana Oliveira",
    endereco: "Av. Principal, 123 - Centro, São Paulo - SP",
    cpf: "123.456.789-00",
    telefone: "(11) 98765-4321",
  },
  {
    id: "3",
    servico: "Desinsetização",
    data: "05/02/2026",
    horario: "14:00",
    status: "agendada" as AgendamentoStatus,
    tecnico: "Roberto Lima",
    endereco: "Rua das Flores, 456 - Jardim, São Paulo - SP",
    cpf: "123.456.789-00",
    telefone: "(11) 98765-4321",
  },
];

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col gap-2xs">
    <div className="flex items-center gap-xs text-grayscale-medium">
      <Icon size={14} />
      <Body2 className="font-medium">{label}</Body2>
    </div>
    <Body2 className="text-grayscale-x-dark">{value}</Body2>
  </div>
);

const DetalhesAgendamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const agendamento = MOCK_AGENDAMENTOS.find((a) => a.id === id) ?? MOCK_AGENDAMENTOS[0];

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        {/* Voltar */}
        <Button
          variant="link"
          className="self-start hover:no-underline"
          onClick={() => navigate(ROUTES.CLIENT_SCHEDULING)}
          leftIcon={<ChevronLeft className="size-md" />}
        >
          Voltar para Agendamentos
        </Button>

        {/* Título */}
        <div className="flex flex-col self-start gap-xs">
          <H1>Detalhes do Agendamento</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Visualize detalhes do seu agendamento
          </Body1>
        </div>

        {/* Card principal */}
        <div className="flex flex-col gap-lg p-lg bg-transparent rounded-lg shadow-sm border border-grayscale-light">
          {/* Status + Nome do serviço + CPF, Telefone e Endereço */}
          <div className="flex flex-col gap-xs">
            <Badge className={`font-medium self-start ${getStatusClass(agendamento.status)}`}>
              {STATUS_LABELS[agendamento.status]}
            </Badge>
            <div className="flex flex-col gap-xs">
              <H2>{agendamento.servico}</H2>
              <div className="flex flex-wrap items-center gap-md">
                <div className="flex items-center gap-xs text-grayscale-dark">
                  <IdCard size={14} className="shrink-0 text-grayscale-medium" />
                  <Body2>{agendamento.cpf}</Body2>
                </div>
                <div className="flex items-center gap-xs text-grayscale-dark">
                  <Phone size={14} className="shrink-0 text-grayscale-medium" />
                  <Body2>{agendamento.telefone}</Body2>
                </div>
                <div className="flex items-center gap-xs text-grayscale-dark">
                  <MapPin size={14} className="shrink-0 text-grayscale-medium" />
                  <Body2>{agendamento.endereco}</Body2>
                </div>
              </div>
            </div>
          </div>

          {/* Divisor */}
          <div className="w-full h-[1px] bg-grayscale-light" />

          {/* Dados do Serviço */}
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
