import type { SelectInputOption } from "@/atomic/atm.select-input";
import type {
  AreaMonitoramentoInsetosDraft,
  MockCliente,
  MockTecnico,
  OrdemServicoFormValues,
  TipoServicoForm,
  TipoServicoVariacao,
} from "./add-ordem-servico-dialog.types";

export const DEFAULT_VALUES: OrdemServicoFormValues = {
  clienteId: "",
  tipoServico: "",
  tecnicoId: "",
  valorServico: "",
  status: "agendada",
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
  "tecnicoId",
  "valorServico",
  "status",
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

export const TIPO_SERVICO_OPTIONS: SelectInputOption[] = [
  { value: "sanitizacao", label: "Sanitizacao" },
  { value: "controle_pragas_vetores", label: "Controle de Pragas e Vetores" },
  { value: "higienizacao", label: "Higienizacao" },
  { value: "monitoramento_insetos", label: "Monitoramento de insetos" },
  { value: "monitoramento_roedores", label: "Monitoramento de roedores" },
];

export const STATUS_OPTIONS: SelectInputOption[] = [
  { value: "agendada", label: "Agendada" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "concluida", label: "Concluida" },
  { value: "cancelada", label: "Cancelada" },
];

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
  pragaAlvo: "",
  tratamento: "",
};

export const MOCK_CLIENTES: MockCliente[] = [
  {
    id: "c1",
    nome: "Restaurante Bom Sabor",
    enderecos: [
      {
        id: "c1-e1",
        cep: "01310-100",
        estado: "SP",
        cidade: "Sao Paulo",
        bairro: "Bela Vista",
        endereco: "Rua das Flores",
        numero: "123",
        complemento: "",
        padrao: true,
      },
      {
        id: "c1-e2",
        cep: "01311-200",
        estado: "SP",
        cidade: "Sao Paulo",
        bairro: "Jardins",
        endereco: "Alameda Santos",
        numero: "45",
        complemento: "Loja 2",
      },
    ],
  },
  {
    id: "c2",
    nome: "Padaria Pao Quente",
    enderecos: [
      {
        id: "c2-e1",
        cep: "04567-000",
        estado: "SP",
        cidade: "Sao Paulo",
        bairro: "Itaim Bibi",
        endereco: "Av. Principal",
        numero: "456",
        complemento: "",
        padrao: true,
      },
    ],
  },
  {
    id: "c3",
    nome: "Supermercado Central",
    enderecos: [
      {
        id: "c3-e1",
        cep: "01001-000",
        estado: "SP",
        cidade: "Sao Paulo",
        bairro: "Se",
        endereco: "Rua do Comercio",
        numero: "789",
        complemento: "",
        padrao: true,
      },
    ],
  },
  {
    id: "c4",
    nome: "Ana Oliveira",
    enderecos: [
      {
        id: "c4-e1",
        cep: "04012-000",
        estado: "SP",
        cidade: "Sao Paulo",
        bairro: "Vila Mariana",
        endereco: "Rua das Palmeiras",
        numero: "321",
        complemento: "Apto 12",
        padrao: true,
      },
    ],
  },
  {
    id: "c5",
    nome: "Hotel Descanso",
    enderecos: [
      {
        id: "c5-e1",
        cep: "11400-000",
        estado: "SP",
        cidade: "Guaruja",
        bairro: "Praia do Tombo",
        endereco: "Av. Turistica",
        numero: "999",
        complemento: "",
        padrao: true,
      },
    ],
  },
];

export const MOCK_TECNICOS: MockTecnico[] = [
  { id: "t1", nome: "Carlos Silva" },
  { id: "t2", nome: "Joao Santos" },
  { id: "t3", nome: "Pedro Costa" },
];

export const getClienteOptions = (): SelectInputOption[] =>
  MOCK_CLIENTES.map((cliente) => ({
    value: cliente.id,
    label: cliente.nome,
  }));

export const getTecnicoOptions = (): SelectInputOption[] =>
  MOCK_TECNICOS.map((tecnico) => ({
    value: tecnico.id,
    label: tecnico.nome,
  }));

export const getTipoServicoVariacao = (tipoServico: TipoServicoForm | ""): TipoServicoVariacao => {
  if (tipoServico === "monitoramento_insetos") {
    return "monitoramento_insetos";
  }
  if (tipoServico === "monitoramento_roedores") {
    return "monitoramento_roedores";
  }
  return "normal";
};
