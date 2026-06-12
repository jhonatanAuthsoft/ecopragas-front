import { ChevronLeft, MapPin, Phone, User, IdCard } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Separator } from "@/atomic/atm.separator/separator.component";
import { Body1, Body2, H1, H3, H4 } from "@/atomic/atm.typography";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { DetailItem } from "@/atomic/atm.detail-item/detail-item.component";

const DetalhesAgendamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // MOCK: Em uma aplicação real, buscaríamos os dados pelo ID
  const agendamento = {
    id: id || "OS-2025-001",
    osNumber: "OS-2025-001",
    status: "Agendada",
    clientName: "João Silva de Jesus da Souza",
    cpf: "000.000.000-00",
    phone: "(11) 0000-0000",
    address: "Rio da Dona, 139, 44380-00, Cruz das Almas - Ba",
    serviceType: "Limpeza de caixa d'água",
    technician: "João Carlos Silva",
    date: "03/12/2025",
    time: "08:00",
    value: "R$ 400,00",
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-lg">
        {/* Back Link */}
        <Button
          variant="link"
          className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs"
          onClick={() => navigate(ROUTES.TECHNICIAN_SCHEDULING)}
        >
          <ChevronLeft size={20} />
          Voltar para Agendamentos
        </Button>

        {/* Header */}
        <div className="flex flex-col gap-xs">
          <H1>Detalhes do Agendamento</H1>
          <Body2 className="text-muted-foreground">
            Visualize informações sobre o agendamento
          </Body2>
        </div>

        {/* Content Card */}
        <Card className="rounded-large! border-muted-foreground/20 bg-background overflow-hidden">
          <div className="p-xl flex flex-col gap-md">
            {/* Badge Status */}
            <div className="flex pt-xs">
              <Badge variant="secondary" className="bg-brand-secondary-medium/10 text-brand-secondary-medium border-brand-secondary-medium/20 px-md py-1">
                {agendamento.status} - {agendamento.osNumber}
              </Badge>
            </div>

            {/* Client Info Header */}
            <div className="flex flex-col gap-sm">
              <H3 className="text-grayscale-x-dark font-bold">{agendamento.clientName}</H3>
              
              <div className="flex flex-wrap gap-x-md gap-y-xs text-grayscale-dark">
                <div className="flex items-center gap-xs">
                  <IdCard size={16} />
                  <Body2>{agendamento.cpf}</Body2>
                </div>
                <div className="flex items-center gap-xs">
                  <Phone size={16} />
                  <Body2>{agendamento.phone}</Body2>
                </div>
                <div className="flex items-center gap-xs">
                  <MapPin size={16} />
                  <Body2>{agendamento.address}</Body2>
                </div>
              </div>
            </div>

            <Separator className="bg-muted-foreground/20" />

            {/* Service Details */}
            <div className="flex flex-col gap-md">
              <H4 className="text-grayscale-medium font-medium tracking-wider text-xxs">Dados do Serviço</H4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-md gap-x-xl">
                <DetailItem 
                  label="Tipo de Serviço" 
                  value={[agendamento.serviceType]} 
                  className="gap-1"
                />
                <DetailItem 
                  label="Técnico responsável." 
                  value={[agendamento.technician]} 
                  className="gap-1"
                />
                <DetailItem 
                  label="Data e horário" 
                  value={[`${agendamento.date} - ${agendamento.time}`]} 
                  className="gap-1"
                />
                <DetailItem 
                  label="Valor do serviço" 
                  value={[
                    <span key="value" className="text-brand-cta-dark font-bold">
                      {agendamento.value}
                    </span>
                  ]} 
                  className="gap-1"
                />
              </div>
            </div>

            <Separator className="bg-muted-foreground/20" />

            {/* Actions */}
            <div className="flex justify-center pt-md">
              <Button className="bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md">
                Iniciar Serviço
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DetalhesAgendamento;
