import type { FilterDropdownOption } from "@/atomic/mol.filter-dropdown";
import type { PeriodoSemServicoRealizado } from "@/model/rest/cliente";

export const PERIODO_FILTER_ALL = "ALL";

export type PeriodoSemServicoFilter = PeriodoSemServicoRealizado | typeof PERIODO_FILTER_ALL;

export const PERIODO_SEM_SERVICO_OPTIONS: FilterDropdownOption<PeriodoSemServicoFilter>[] = [
  { label: "Todos", value: PERIODO_FILTER_ALL },
  { label: "Hoje", value: "HOJE" },
  { label: "Ontem", value: "ONTEM" },
  { label: "1 semana", value: "UMA_SEMANA" },
  { label: "15 dias", value: "QUINZE_DIAS" },
  { label: "1 mês", value: "UM_MES" },
  { label: "3 meses", value: "TRES_MESES" },
  { label: "6 meses", value: "SEIS_MESES" },
  { label: "Último ano", value: "ULTIMO_ANO" },
];

export function isPeriodoSemServicoFilter(value: string): value is PeriodoSemServicoFilter {
  return PERIODO_SEM_SERVICO_OPTIONS.some((option) => option.value === value);
}
