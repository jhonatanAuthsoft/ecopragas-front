import { Button } from "@/atomic/atm.button/button.component";
import { DetailItem } from "@/atomic/atm.detail-item/detail-item.component";
import { Separator } from "@/atomic/atm.separator/separator.component";
import { H3 } from "@/atomic/atm.typography";

export interface ServicoHeaderProps {
  agendamento: {
    serviceType: string;
    technician: string;
    date: string;
    time: string;
    value: string;
  };
  onStart: () => void;
}

export const ServicoHeader = ({ agendamento, onStart }: ServicoHeaderProps) => {
  return (
    <div>
      <Separator className="bg-muted-foreground/20" />
      <div className="flex flex-col gap-md pt-lg">
        <H3 className="font-normal">Dados do Serviço</H3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-md gap-x-xl">
          <DetailItem label="Tipo de Serviço" value={[agendamento.serviceType]} className="gap-1" />
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
              </span>,
            ]}
            className="gap-1"
          />
        </div>
      </div>

      <Separator className="bg-muted-foreground/20 mt-sm" />

      <div className="flex justify-center pt-lg">
        <Button className="w-full md:w-auto md:px-2xl!" onClick={onStart} size="lg">
          Iniciar Serviço
        </Button>
      </div>
    </div>
  );
};
