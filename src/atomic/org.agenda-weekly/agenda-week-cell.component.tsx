import { cn } from "@/lib/utils";
import { AgendaEventCard } from "./agenda-event-card.component";
import type { AgendaWeeklyItem } from "./agenda-weekly.types";
import { getEventColorVariant, getItemTecnicos } from "./agenda-weekly.utils";

interface AgendaWeekCellProps {
  agendamentos: AgendaWeeklyItem[];
  onAgendamentoClick?: (agendamento: AgendaWeeklyItem) => void;
}

export function AgendaWeekCell({ agendamentos, onAgendamentoClick }: AgendaWeekCellProps) {
  const count = agendamentos.length;

  if (count === 0) {
    return <div className="border-b border-l border-r border-grayscale-light p-xs min-h-[82px]" />;
  }

  if (count === 1) {
    const item = agendamentos[0];
    const tecnicos = getItemTecnicos(item);

    return (
      <div className="border-b border-l border-r border-grayscale-light p-xs min-h-[82px]">
        <AgendaEventCard
          tipoServico={item.tipoServico}
          horario={item.horario}
          tecnicos={tecnicos}
          colorVariant={getEventColorVariant(item)}
          onClick={() => onAgendamentoClick?.(item)}
        />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="border-b border-l border-r border-grayscale-light p-xs min-h-[82px] flex flex-col gap-2xs">
        {agendamentos.map((item, index) => {
          const tecnicos = getItemTecnicos(item);

          return (
            <AgendaEventCard
              key={item.id}
              tipoServico={item.tipoServico}
              horario={item.horario}
              tecnicos={tecnicos}
              colorVariant={getEventColorVariant(item)}
              onClick={() => onAgendamentoClick?.(item)}
              className={index > 0 ? "w-[83%] ml-auto" : undefined}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-b border-l border-r border-grayscale-light p-xs min-h-[82px]",
        "max-h-[240px] overflow-y-auto",
        "custom-scrollbar",
      )}
    >
      <div className="flex flex-col gap-2xs">
        {agendamentos.map((item) => {
          const tecnicos = getItemTecnicos(item);

          return (
            <AgendaEventCard
              key={item.id}
              tipoServico={item.tipoServico}
              horario={item.horario}
              tecnicos={tecnicos}
              colorVariant={getEventColorVariant(item)}
              onClick={() => onAgendamentoClick?.(item)}
              density="compact"
            />
          );
        })}
      </div>
    </div>
  );
}
