import type { SelectInputOption } from "@/atomic/atm.select-input";
import type { ClienteFormValues } from "./add-cliente-dialog.types";

export const DEFAULT_VALUES: ClienteFormValues = {
  nome: "",
  cpfCnpj: "",
  tipoCliente: "",
  email: "",
  telefone: "",
  endereco: "",
  bairro: "",
  numero: "",
  complemento: "",
  cidade: "",
  estado: "",
  cep: "",
  status: "",
  observacoes: "",
  salvarEnderecoPadrao: false,
};

export const DADOS_FIELDS = [
  "nome",
  "cpfCnpj",
  "tipoCliente",
  "status",
  "email",
  "telefone",
] as const satisfies ReadonlyArray<keyof ClienteFormValues>;

// TODO: ver se vale continuar com o numero e complemento como obrigatórios
export const ENDERECO_FIELDS = [
  "cep",
  "estado",
  "cidade",
  "bairro",
  "endereco",
  "numero",
  "complemento",
] as const satisfies ReadonlyArray<keyof ClienteFormValues>;

export const TIPO_CLIENTE_OPTIONS: SelectInputOption[] = [
  { value: "fixo", label: "Fixo" },
  { value: "recorrente", label: "Recorrente" },
];

export const STATUS_OPTIONS: SelectInputOption[] = [
  { value: "ativo", label: "Ativo" },
  { value: "inativo", label: "Inativo" },
];

export const ESTADO_OPTIONS: SelectInputOption[] = [
  { value: "SP", label: "Sao Paulo" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "MG", label: "Minas Gerais" },
  { value: "BA", label: "Bahia" },
  { value: "RS", label: "Rio Grande do Sul" },
];

export const VALID_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"] as const;

export const TAB_TRIGGER_CLASS =
  "rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary-medium data-[state=active]:text-brand-primary-medium pb-2 bg-transparent data-[state=active]:bg-transparent shadow-none";
