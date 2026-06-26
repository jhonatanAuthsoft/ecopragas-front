export type AgendaEventColorVariant = "orange" | "purple" | "green";

export interface AgendaWeeklyItem {
  id: string;
  tipoServico: string;
  horario: string;
  data: Date;
  tecnico: string;
  tecnicos?: string[];
}

export interface AgendaWeeklyProps {
  className?: string;
  agendamentos: AgendaWeeklyItem[];
  weekStart: Date;
  onWeekChange: (weekStart: Date) => void;
  filtroTecnico: string;
  onFiltroTecnicoChange: (value: string) => void;
  onNovoClick: () => void;
  onAgendamentoClick?: (agendamento: AgendaWeeklyItem) => void;
}

export interface AgendaEventCardProps {
  className?: string;
  onClick?: () => void;
  tipoServico: string;
  horario: string;
  tecnicos: string[];
  colorVariant: AgendaEventColorVariant;
  density?: "default" | "compact";
}
