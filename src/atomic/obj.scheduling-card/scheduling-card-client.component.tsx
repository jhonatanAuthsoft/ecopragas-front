import { CalendarIcon, ChevronRight } from "lucide-react";
import type React from "react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Body2, H3 } from "@/atomic/atm.typography";
import { Card } from "@/atomic/mol.card/card.component";
import { cn } from "@/lib/utils";

export interface SchedulingCardClientProps {
  id: string;
  time: string;
  title: string;
  status: "Em Andamento" | "Agendada" | "Concluída";
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
  clientName,
  phone,
  address,
  onClick,
  className,
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Agendada":
        return "bg-grayscale-light";

      case "Em Andamento":
        return "bg-feedback-warning-light";

      case "Concluída":
        return "bg-feedback-success-light";
      case "Cancelada":
        return "bg-feedback-error-light";
      default:
        return "bg-grayscale-light";
    }
  };

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
            <Badge
              className={`font-medium ${getStatusClass(
                status,
              )} text-feedback-warning-dark border-grayscale-medium`}
            >
              {status}
            </Badge>
          </div>

          <div className="flex items-center gap-sm flex-wrap">
            <H3 className="text-grayscale-x-dark font-medium">{title}</H3>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-xs text-grayscale-dark">
              <CalendarIcon size={14} />
              <Body2>{time}</Body2>
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
