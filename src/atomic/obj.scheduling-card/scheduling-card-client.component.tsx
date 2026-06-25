import { CalendarIcon, ChevronRight } from "lucide-react";
import type React from "react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Body2, H3 } from "@/atomic/atm.typography";
import { Card } from "@/atomic/mol.card/card.component";
import { cn } from "@/lib/utils";
import { getStatusBadgeClass } from "@/utils/formatters";

export interface SchedulingCardClientProps {
  id: string;
  time: string;
  title: string;
  status: "Em Andamento" | "Agendada" | "Concluída" | "Cancelada";
  clientName: string;
  phone: string;
  address: string;
  onClick?: () => void;
  className?: string;
}

export const SchedulingCardClient: React.FC<SchedulingCardClientProps> = ({
  time,
  title,
  status,
  onClick,
  className,
}) => {
  return (
    <Card
      className={cn(
        "cursor-pointer hover:bg-accent/50 transition-colors border-muted-foreground/20 bg-grayscale-x-light overflow-hidden rounded-large!",
        className,
      )}
      onClick={onClick}
    >
      <div className=" w-full flex items-stretch justify-between">
        {/* Conteúdo Central */}
        <div className="flex-1 flex flex-col justify-center gap-xs">
          <div className="flex items-center gap-sm flex-wrap">
            <Badge className={`font-medium ${getStatusBadgeClass(status)}`}>{status}</Badge>
          </div>

          <div className="flex items-center gap-sm flex-wrap">
            <H3 className="text-grayscale-x-dark font-medium">{title}</H3>
          </div>

          <div className="flex items-center gap-xs text-grayscale-dark mt-1">
            <CalendarIcon size={16} />
            <Body2>{time}</Body2>
          </div>
        </div>

        {/* Botão de Ação / Ícone */}
        <div className="flex items-center pr-md">
          <ChevronRight className="text-brand-primary-medium" size={24} />
        </div>
      </div>
    </Card>
  );
};
