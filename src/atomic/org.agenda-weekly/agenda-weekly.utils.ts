import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  getHours,
  isSameDay,
  parse,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import type { AgendaEventColorVariant, AgendaWeeklyItem } from "./agenda-weekly.types";

export const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
export const DAY_HOURS = Array.from({ length: 24 }, (_, hour) => hour);
export const DEFAULT_SCROLL_HOUR = 7;
export const MAX_VISIBLE_AVATARS = 3;

const COLOR_POOL: AgendaEventColorVariant[] = ["orange", "purple"];

export function getWeekDays(weekStart: Date): Date[] {
  const start = startOfWeek(weekStart, { weekStartsOn: 0 });
  const end = endOfWeek(weekStart, { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
}

export function formatWeekRange(weekStart: Date): string {
  const days = getWeekDays(weekStart);
  const first = days[0];
  const last = days[days.length - 1];
  return `${format(first, "dd/MM")} - ${format(last, "dd/MM")}`;
}

export function formatMonthYear(weekStart: Date): string {
  const label = format(weekStart, "MMMM 'de' yyyy", { locale: ptBR });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatTimeSlotLabel(hour: number): string {
  return `${hour.toString().padStart(2, "0")}h`;
}

export function parseHorario(horario: string): number {
  const parsed = parse(horario, "HH:mm", new Date());
  return getHours(parsed);
}

export function getItemTecnicos(item: AgendaWeeklyItem): string[] {
  if (item.tecnicos && item.tecnicos.length > 0) {
    return [...new Set(item.tecnicos)];
  }
  return [item.tecnico];
}

function getFirstName(nome: string): string {
  return nome.split(" ")[0] ?? nome;
}

export function isJointService(item: AgendaWeeklyItem): boolean {
  return getItemTecnicos(item).length > 1;
}

export function getTechnicianLabel(tecnicos: string[]): string {
  if (tecnicos.length === 0) return "";
  if (tecnicos.length === 1) return tecnicos[0];

  const firstNames = tecnicos.map(getFirstName);

  if (tecnicos.length === 2) {
    return `${firstNames[0]} e ${firstNames[1]}`;
  }

  if (tecnicos.length === 3) {
    return `${firstNames[0]}, ${firstNames[1]} e ${firstNames[2]}`;
  }

  return `${firstNames[0]}, ${firstNames[1]} e +${tecnicos.length - 2}`;
}

export function getEventColorVariant(item: AgendaWeeklyItem): AgendaEventColorVariant {
  const tecnicos = getItemTecnicos(item);
  if (tecnicos.length > 1) return "green";

  const hash = tecnicos[0].split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLOR_POOL[hash % COLOR_POOL.length];
}

export function getAgendamentosForCell(
  agendamentos: AgendaWeeklyItem[],
  day: Date,
  hour: number,
): AgendaWeeklyItem[] {
  return agendamentos.filter((item) => {
    return isSameDay(item.data, day) && parseHorario(item.horario) === hour;
  });
}

export function getWeekStartFromDate(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 0 });
}

export function createMockWeekAgendamentos(baseDate: Date): AgendaWeeklyItem[] {
  const weekStart = getWeekStartFromDate(baseDate);

  return [
    {
      id: "1",
      tipoServico: "Dedetização",
      horario: "09:00",
      data: addDays(weekStart, 1),
      tecnico: "Carlos Santos",
    },
    {
      id: "2",
      tipoServico: "Limpeza de Caixa D'água",
      horario: "09:00",
      data: addDays(weekStart, 2),
      tecnico: "Pedro Lima",
    },
    {
      id: "3",
      tipoServico: "Limpeza de Caixa D'água",
      horario: "09:00",
      data: addDays(weekStart, 4),
      tecnico: "Carlos Santos",
      tecnicos: ["Carlos Santos", "Pedro Lima", "Ana Costa", "Roberto Alves"],
    },
    {
      id: "4",
      tipoServico: "Limpeza de Caixa D'água",
      horario: "09:30",
      data: addDays(weekStart, 0),
      tecnico: "Pedro Lima",
    },
    {
      id: "4b",
      tipoServico: "Desinsetização",
      horario: "09:00",
      data: addDays(weekStart, 0),
      tecnico: "Ana Costa",
    },
    {
      id: "4c",
      tipoServico: "Descupinização",
      horario: "09:00",
      data: addDays(weekStart, 0),
      tecnico: "Roberto Alves",
    },
    {
      id: "4d",
      tipoServico: "Dedetização",
      horario: "09:00",
      data: addDays(weekStart, 0),
      tecnico: "Carlos Santos",
    },
    {
      id: "4e",
      tipoServico: "Limpeza de Caixa D'água",
      horario: "09:00",
      data: addDays(weekStart, 0),
      tecnico: "Pedro Lima",
    },
    {
      id: "5",
      tipoServico: "Limpeza de Caixa D'água",
      horario: "17:15",
      data: addDays(weekStart, 0),
      tecnico: "Ana Costa",
      tecnicos: ["Ana Costa", "Carlos Santos"],
    },
    {
      id: "5b",
      tipoServico: "Limpeza de Caixa D'água",
      horario: "17:00",
      data: addDays(weekStart, 0),
      tecnico: "Ana Costa",
      tecnicos: ["Ana Costa", "Roberto Alves", "Carlos Santos"],
    },
    {
      id: "5c",
      tipoServico: "Limpeza de Caixa D'água",
      horario: "17:30",
      data: addDays(weekStart, 0),
      tecnico: "Ana Costa",
    },
    {
      id: "6",
      tipoServico: "Desinsetização",
      horario: "10:00",
      data: addDays(weekStart, 3),
      tecnico: "Roberto Alves",
    },
  ];
}
