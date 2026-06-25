import type { LeadStatus } from "@/model/rest/lead";

export interface LeadKanbanColumnConfig {
  status: LeadStatus;
  title: string;
  color: string;
}

export const KANBAN_COLUMNS: LeadKanbanColumnConfig[] = [
  { status: "NOVO", title: "Novo", color: "border-l-brand-primary-medium" },
  { status: "EM_CONTATO", title: "Em Contato", color: "border-l-brand-secondary-medium" },
  { status: "PROPOSTA_ENVIADA", title: "Proposta Enviada", color: "border-l-brand-secondary-dark" },
  { status: "EM_NEGOCIACAO", title: "Negociação", color: "border-l-feedback-warning-medium" },
  { status: "GANHO", title: "Ganho", color: "border-l-feedback-success-medium" },
  { status: "PERDIDO", title: "Perdido", color: "border-l-feedback-error-medium" },
];

export const KANBAN_COLUMN_STATUSES = KANBAN_COLUMNS.map((column) => column.status);
export const COLUMN_SKELETON_KEYS = ["first", "second", "third"];
export const COLUMN_SCROLL_HEIGHT = "h-[600px]";
