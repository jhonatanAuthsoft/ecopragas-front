import type { FieldPath } from "react-hook-form";
import type { SelectInputOption } from "@/atomic/atm.select-input";
import type { ClienteEndereco, ClienteFormValues } from "@/model/rest/cliente";

export const EMPTY_ENDERECO_DRAFT: ClienteEndereco = {
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  rua: "",
  numero: "",
  complemento: "",
  padrao: false,
};

export const DEFAULT_VALUES = {
  nomeRazaoSocial: "",
  cnpjCpf: "",
  tipo: "RECORRENTE",
  email: "",
  telefone: "",
  observacoes: "",
  status: "ATIVO",
  enderecos: [],
  documentos: [],
  enderecoDraft: EMPTY_ENDERECO_DRAFT,
} as ClienteFormValues;

export const DADOS_FIELDS = [
  "nomeRazaoSocial",
  "cnpjCpf",
  "tipo",
  "status",
  "email",
  "telefone",
] as ReadonlyArray<keyof ClienteFormValues>;

export const ENDERECO_REQUIRED_FIELDS: ReadonlyArray<keyof ClienteEndereco> = [
  "cep",
  "estado",
  "cidade",
  "bairro",
  "rua",
  "numero",
];

export const ENDERECO_OPTIONAL_FIELDS: ReadonlyArray<keyof ClienteEndereco> = ["complemento"];

export const ENDERECO_DRAFT_REQUIRED_FIELDS: ReadonlyArray<FieldPath<ClienteFormValues>> = [
  "enderecoDraft.cep",
  "enderecoDraft.estado",
  "enderecoDraft.cidade",
  "enderecoDraft.bairro",
  "enderecoDraft.rua",
  "enderecoDraft.numero",
];

export const ENDERECO_DRAFT_FIELDS: ReadonlyArray<FieldPath<ClienteFormValues>> = [
  ...ENDERECO_DRAFT_REQUIRED_FIELDS,
  "enderecoDraft.complemento",
];

export const TIPO_CLIENTE_OPTIONS: SelectInputOption[] = [
  { value: "RECORRENTE", label: "Fixo" },
  { value: "ESPORADICO", label: "Esporádico" },
];

export const STATUS_OPTIONS: SelectInputOption[] = [
  { value: "ATIVO", label: "Ativo" },
  { value: "INATIVO", label: "Inativo" },
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
