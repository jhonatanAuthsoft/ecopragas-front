import type { CadastrarLeadRequest } from "@/model/rest/lead";
import type { SelectInputOption } from "../atm.select-input";

export const DEFAULT_VALUES: Omit<CadastrarLeadRequest, "origem" | "status"> = {
  nome: "",
  empresa: "",
  email: "",
  telefone: "",
  valorEstimado: undefined,
  observacoes: "",
};

export const ORIGIN_OPTIONS: SelectInputOption[] = [
  { value: "GOOGLE", label: "Google" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "INDICACAO", label: "Indicação" },
  { value: "WEBSITE", label: "Website" },
  { value: "OUTRO", label: "Outro" },
];

export const STATUS_OPTIONS: SelectInputOption[] = [
  { value: "NOVO", label: "Novo" },
  { value: "EM_CONTATO", label: "Em Contato" },
  { value: "PROPOSTA_ENVIADA", label: "Proposta Enviada" },
  { value: "EM_NEGOCIACAO", label: "Negociação" },
];
