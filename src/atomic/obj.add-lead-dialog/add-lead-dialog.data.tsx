import type { AddLeadFormValues } from "./add-lead-dialog.component";

export const DEFAULT_VALUES: AddLeadFormValues = {
  name: "",
  company: "",
  phone: "",
  origin: "",
  value: "",
  status: "",
  notes: "",
};

export const ORIGIN_OPTIONS = [
  { value: "google", label: "Google" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "indicacao", label: "Indicação" },
  { value: "website", label: "Website" },
  { value: "outro", label: "Outro" },
];

export const STATUS_OPTIONS = [
  { value: "novo", label: "Novo" },
  { value: "em_contato", label: "Em Contato" },
  { value: "proposta_enviada", label: "Proposta Enviada" },
  { value: "negociacao", label: "Negociação" },
];
