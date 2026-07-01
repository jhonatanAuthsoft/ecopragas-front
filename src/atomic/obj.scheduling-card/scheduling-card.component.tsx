import { ChevronRight, MapPin, Phone, User } from "lucide-react";
import type React from "react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Separator } from "@/atomic/atm.separator/separator.component";
import { Body2, H3 } from "@/atomic/atm.typography";
import { Card } from "@/atomic/mol.card/card.component";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  return (
    <Card
      className={cn(
        "cursor-pointer hover:bg-accent/50 transition-colors border-muted-foreground/20 bg-background overflow-hidden rounded-large!",
        className,
      )}
      onClick={onClick}
    >
            <div className={cn("flex w-full", isMobile ? "flex-col p-4" : "items-stretch min-h-[120px]")}>
        {isMobile ? (
        <>
          <div className="flex justify-between items-center mb-3">
            <H3 className="font-bold text-grayscale-dark text-xl">{time}</H3>
            <Badge className={`font-medium ${getStatusBadgeClass(status)}`}>{status}</Badge>
          </div>
          
          <H3 className="text-grayscale-x-dark font-medium mb-3">{title}</H3>
          
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-xs text-grayscale-dark">
              <User size={16} className="shrink-0" />
              <Body2 className="line-clamp-1">{clientName}</Body2>
            </div>
            <div className="flex items-center gap-xs text-grayscale-dark">
              <Phone size={16} className="shrink-0" />
              <Body2 className="line-clamp-1">{phone}</Body2>
            </div>
            <div className="flex items-start gap-xs text-grayscale-dark">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <Body2 className="line-clamp-2">{address}</Body2>
            </div>
          </div>
          
          <div className="flex items-center justify-center w-full pt-3 border-t border-muted-foreground/20 text-brand-primary-medium">
             <span className="text-sm font-medium flex items-center">
                Ver Agendamento <ChevronRight size={16} className="ml-1" />
             </span>
          </div>
        </>
        ) : (
        <>
        {/* Horário */}
        <div className="flex items-center justify-center px-lg min-w-[100px]">
          <H3 className="font-bold text-grayscale-dark">{time}</H3>
        </div>

        {/* Divisor Vertical */}
        <div className="py-lg">
          <Separator orientation="vertical" className="h-full bg-muted-foreground/20" />
        </div>

        {/* Conteúdo Central */}
        <div className="flex-1 p-md flex flex-col justify-center gap-xs overflow-hidden">
          <div className="flex items-center gap-sm flex-wrap">
            <H3 className="text-grayscale-x-dark font-medium">{title}</H3>
            <Badge className={`font-medium ${getStatusBadgeClass(status)}`}>{status}</Badge>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-xs text-grayscale-dark">
              <User size={14} className="shrink-0" />
              <Body2 className="truncate">{clientName}</Body2>
            </div>
            <div className="flex items-center gap-xs text-grayscale-dark">
              <Phone size={14} className="shrink-0" />
              <Body2 className="truncate">{phone}</Body2>
            </div>
            <div className="flex items-center gap-xs text-grayscale-dark">
              <MapPin size={14} className="shrink-0" />
              <Body2 className="truncate">{address}</Body2>
            </div>
          </div>
        </div>

        {/* Chevron Direito */}
        <div className="flex items-center pr-md shrink-0">
          <ChevronRight className="text-brand-primary-medium" size={24} />
        </div>
        </>
        )}
      </div>
    </Card>
  );
};
