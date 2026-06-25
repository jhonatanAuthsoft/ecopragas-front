import { ChevronRight, MapPin, Phone, User } from "lucide-react";
import type React from "react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Separator } from "@/atomic/atm.separator/separator.component";
import { Body2, H3 } from "@/atomic/atm.typography";
import { Card } from "@/atomic/mol.card/card.component";
import { cn } from "@/lib/utils";
import { getStatusBadgeClass } from "@/utils/formatters";

export interface SchedulingCardProps {
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

export const SchedulingCard: React.FC<SchedulingCardProps> = ({
  time,
  title,
  status,
  clientName,
  phone,
  address,
  onClick,
  className,
}) => {
  return (
    <Card
      className={cn(
        "cursor-pointer hover:bg-accent/50 transition-colors border-muted-foreground/20 bg-background overflow-hidden rounded-large!",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-stretch min-h-[120px]">
        {/* Horário */}
        <div className="flex items-center justify-center px-lg min-w-[100px]">
          <H3 className="font-bold text-grayscale-dark">{time}</H3>
        </div>

        {/* Divisor Vertical */}
        <div className="py-lg">
          <Separator orientation="vertical" className="h-full bg-muted-foreground/20" />
        </div>

        {/* Conteúdo Central */}
        <div className="flex-1 p-md flex flex-col justify-center gap-xs">
          <div className="flex items-center gap-sm flex-wrap">
            <H3 className="text-grayscale-x-dark font-medium">{title}</H3>
            <Badge className={`font-medium ${getStatusBadgeClass(status)}`}>{status}</Badge>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-xs text-grayscale-dark">
              <User size={14} />
              <Body2>{clientName}</Body2>
            </div>
            <div className="flex items-center gap-xs text-grayscale-dark">
              <Phone size={14} />
              <Body2>{phone}</Body2>
            </div>
            <div className="flex items-center gap-xs text-grayscale-dark">
              <MapPin size={14} />
              <Body2>{address}</Body2>
            </div>
          </div>
        </div>

        {/* Chevron Direito */}
        <div className="flex items-center pr-md">
          <ChevronRight className="text-brand-primary-medium" size={24} />
        </div>
      </div>
    </Card>
  );
};
