import type { SelectInputOption } from "@/atomic/atm.select-input";
import type { AddAgendamentoFormValues } from "./add-agendamento-dialog.types";

export const DEFAULT_VALUES: AddAgendamentoFormValues = {
  clienteId: "",
  ordemServicoId: "",
  tecnicoId: "",
  recorrencia: "",
  data: undefined,
  horario: "",
};

export const RECORRENCIA_OPTIONS: SelectInputOption[] = [
  { value: "NENHUMA", label: "Nenhuma" },
  { value: "SEMANAL", label: "Semanal" },
  { value: "MENSAL", label: "Mensal" },
  { value: "TRIMESTRAL", label: "Trimestral" },
  { value: "SEMESTRAL", label: "Semestral" },
  { value: "ANUAL", label: "Anual" },
];
