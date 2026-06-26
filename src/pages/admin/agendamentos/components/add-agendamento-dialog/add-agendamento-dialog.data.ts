import type { SelectInputOption } from "@/atomic/atm.select-input";
import type { CadastrarAgendamentoFormValues } from "@/model/rest/agendamento";

export const DEFAULT_VALUES: CadastrarAgendamentoFormValues = {
  clienteId: "",
  ordemServicoId: "",
  tecnicoIds: [],
  recorrencia: "NENHUMA",
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
