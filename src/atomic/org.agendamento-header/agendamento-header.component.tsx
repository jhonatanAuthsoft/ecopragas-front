import { IdentificationIcon } from "@/assets/icons/identification";
import { MapPinIcon } from "@/assets/icons/map-pin";
import { PhoneIcon } from "@/assets/icons/phone";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Body2, H2 } from "@/atomic/atm.typography";
import { Card } from "@/atomic/mol.card/card.component";

export interface AgendamentoHeaderProps {
  agendamento: {
    status: string;
    osNumber: string;
    clientName: string;
    cpf: string;
    phone: string;
    address: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export const AgendamentoHeader = ({ agendamento, className, children }: AgendamentoHeaderProps) => {
  return (
    <Card
      className={`rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-0! ${
        className || ""
      }`}
    >
      <div className="p-sm flex flex-col gap-md w-full">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-xs">
            <div className="flex">
              <Badge color="blue">
                {agendamento.status} - <b className="ml-2xs">{agendamento.osNumber}</b>
              </Badge>
            </div>
            <div className="flex flex-col gap-sm">
              <H2 className="font-bold">{agendamento.clientName}</H2>

              <div className="flex flex-wrap items-center gap-sm text-grayscale-dark">
                <div className="flex items-center gap-2xs">
                  <IdentificationIcon className="shrink-0 size-lg" />
                  <Body2>{agendamento.cpf || "-"}</Body2>
                </div>
                <div className="flex items-center gap-2xs">
                  <PhoneIcon className="shrink-0 size-lg" />
                  <Body2>{agendamento.phone || "-"}</Body2>
                </div>
                <div className="flex items-center gap-2xs">
                  <MapPinIcon className="shrink-0 size-lg" />
                  <Body2>{agendamento.address || "-"}</Body2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </Card>
  );
};
