import type { SelectInputOption } from "@/atomic/atm.select-input";
import { TIPO_SERVICO_LABELS } from "@/utils/formatters";
import type {
  AreaMonitoramentoInsetosDraft,
  OrdemServicoFormValues,
  TipoServicoForm,
  TipoServicoVariacao,
} from "./add-ordem-servico-dialog.types";

export const DEFAULT_VALUES: OrdemServicoFormValues = {
  clienteId: "",
  tipoServico: "",
  valorServico: "",
  data: undefined,
  horario: undefined,
  observacoes: "",
  estacoesMonitoramento: [],
  areasMonitoramentoInsetos: [],
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  endereco: "",
  numero: "",
  complemento: "",
};

export const DADOS_FIELDS = [
  "clienteId",
  "tipoServico",
  "valorServico",
] as const satisfies ReadonlyArray<keyof OrdemServicoFormValues>;

export const NOVO_ENDERECO_ID = "novo-endereco";

export const ENDERECO_FIELDS = [
  "cep",
  "estado",
  "cidade",
  "bairro",
  "endereco",
  "numero",
  "complemento",
] as const satisfies ReadonlyArray<keyof OrdemServicoFormValues>;

export const TAB_TRIGGER_CLASS =
  "rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary-medium data-[state=active]:text-brand-primary-medium pb-2 bg-transparent data-[state=active]:bg-transparent shadow-none";

export const TIPO_SERVICO_OPTIONS: SelectInputOption[] = (
  Object.entries(TIPO_SERVICO_LABELS) as [TipoServicoForm, string][]
).map(([value, label]) => ({ value, label }));

export const PRAGA_ALVO_OPTIONS: SelectInputOption[] = [
  { value: "barata_germanica", label: "Barata Germânica" },
  { value: "periplaneta_americana", label: "Periplaneta Americana" },
  { value: "mosca_domestica", label: "Mosca Doméstica" },
  { value: "mosca_varejeira", label: "Mosca Varejeira" },
  { value: "mosca_palomilla", label: "Mosca Palomilla" },
  { value: "formiga_cortadeira", label: "Formiga Cortadeira" },
  { value: "formiga_urbana", label: "Formiga Urbana" },
  { value: "aranha", label: "Aranha" },
  { value: "escorpioes", label: "Escorpiões" },
  { value: "cupim", label: "Cupim" },
  { value: "traca", label: "Traça" },
  { value: "insetos_voadores", label: "Insetos voadores" },
];

export const TRATAMENTO_OPTIONS: SelectInputOption[] = [
  { value: "pulverizacao", label: "Pulverização" },
  { value: "termonebulizacao", label: "Termonebulização" },
  { value: "polvilhamento", label: "Polvilhamento" },
  { value: "armadilha_luminosa", label: "Armadilha Luminosa" },
  { value: "ecotrap", label: "EcoTraP" },
  { value: "papa_mosca", label: "Papa Mosca" },
];

export const EMPTY_AREA_MONITORAMENTO_INSETOS_DRAFT: AreaMonitoramentoInsetosDraft = {
  nome: "",
  pragaAlvo: [],
  tratamento: "",
};

export const getTipoServicoVariacao = (tipoServico: TipoServicoForm | ""): TipoServicoVariacao => {
  if (tipoServico === "MONITORAMENTO_INSETOS") {
    return "monitoramento_insetos";
  }
  if (tipoServico === "MONITORAMENTO_ROEDORES") {
    return "monitoramento_roedores";
  }
  return "normal";
};
