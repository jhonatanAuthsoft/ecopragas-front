import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { MagnifierIcon } from "@/assets/icons/magnifier";
import { Button } from "@/atomic/atm.button/button.component";
import { TextInput } from "@/atomic/atm.text-input";
import { Body2, H2 } from "@/atomic/atm.typography";
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
import { ScrollArea } from "@/atomic/mol.scroll-area/scroll-area.component";
import { cn } from "@/lib/utils";
import { AgendaWeekCell } from "./agenda-week-cell.component";
import type { AgendaWeeklyProps } from "./agenda-weekly.types";
import {
  DAY_HOURS,
  DAY_NAMES,
  DEFAULT_SCROLL_HOUR,
  formatMonthYear,
  formatTimeSlotLabel,
  getAgendamentosForCell,
  getWeekDays,
  getWeekStartFromDate,
} from "./agenda-weekly.utils";

const GRID_COLUMNS = "64px repeat(7, minmax(0, 1fr))";

export function AgendaWeekly({
  agendamentos,
  weekStart,
  onWeekChange,
  filtroTecnico,
  onFiltroTecnicoChange,
  onNovoClick,
  onAgendamentoClick,
  className,
}: AgendaWeeklyProps) {
  const scrollTargetRowRef = useRef<HTMLDivElement>(null);

  const weekDays = getWeekDays(weekStart);
  const weekRange = { start: weekDays[0], end: weekDays[weekDays.length - 1] };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      scrollTargetRowRef.current?.scrollIntoView({ block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, [weekStart]);

  const handleDateChange = (value: Date | { start: Date | null; end: Date | null } | null) => {
    if (value instanceof Date) {
      onWeekChange(getWeekStartFromDate(value));
      return;
    }

    if (value?.start) {
      onWeekChange(getWeekStartFromDate(value.start));
    }
  };

  return (
    <div
      className={cn(
        "flex border border-grayscale-light rounded-xl overflow-hidden bg-grayscale-white",
        className,
      )}
    >
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-sm px-md py-md border-b border-grayscale-light">
          <H2 className="text-grayscale-medium font-bold shrink-0">{formatMonthYear(weekStart)}</H2>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-sm">
            <CalendarDropdown
              value={weekRange}
              onChange={handleDateChange}
              label="Selecione a semana"
              selectionMode="week"
              className="whitespace-nowrap"
            />

            <TextInput
              size="sm"
              placeholder="Filtrar por técnico..."
              value={filtroTecnico}
              onChange={onFiltroTecnicoChange}
              iconLeft={<MagnifierIcon title="Filtrar" />}
              className="min-w-[220px]"
              wrapperClassName="flex items-center"
            />

            <Button
              size="lg"
              onClick={onNovoClick}
              leftIcon={<Plus className="size-md" />}
              className="shrink-0"
            >
              Novo
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[756px]">
          <div className="min-w-[800px]">
            <div
              className="grid sticky top-0 z-10 bg-grayscale-white"
              style={{ gridTemplateColumns: GRID_COLUMNS }}
            >
              <div className="bg-grayscale-x-light border-b border-grayscale-light" />

              {weekDays.map((day, index) => (
                <div
                  key={day.toISOString()}
                  className="bg-grayscale-x-light border-b border-r border-grayscale-light px-2xs py-sm flex flex-col items-center gap-2xs text-center"
                >
                  <Body2 className="text-grayscale-dark leading-tight">{DAY_NAMES[index]}</Body2>
                  <span className="text-md font-bold text-grayscale-x-dark leading-snug">
                    {day.getDate().toString().padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>

            {DAY_HOURS.map((hour) => (
              <div
                key={hour}
                ref={hour === DEFAULT_SCROLL_HOUR ? scrollTargetRowRef : undefined}
                className="grid scroll-mt-[52px]"
                style={{ gridTemplateColumns: GRID_COLUMNS }}
              >
                <div className="bg-grayscale-x-light border-b border-grayscale-light px-2xs py-sm flex items-center justify-center">
                  <Body2 className="text-grayscale-dark text-center leading-tight">
                    {formatTimeSlotLabel(hour)}
                  </Body2>
                </div>

                {weekDays.map((day) => (
                  <AgendaWeekCell
                    key={`${day.toISOString()}-${hour}`}
                    agendamentos={getAgendamentosForCell(agendamentos, day, hour)}
                    onAgendamentoClick={onAgendamentoClick}
                  />
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
