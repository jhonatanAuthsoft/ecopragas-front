export type PortaIscaRaticidaTypes =
  | "isca_consumida"
  | "isca_danificada"
  | "isca_extraviada"
  | "porta_isca_extraviado"
  | "isca_em_conformidade";
export type ArmadilhaAdesivaTypes =
  | "cola_danificada"
  | "porta_adesivo_quebrado"
  | "porta_adesivo_extraviado"
  | "em_conformidade";

/** TODO: Tipo mock da UI ate integracao com a API. */
export type OrdemServico = {
  id: string;
  numeroOS: string;
  cliente: {
    id: string;
    nome: string;
    cpfCnpj: string;
    telefone: string;
  };
  tipoServico:
    | "sanitizacao"
    | "controle_pragas_vetores"
    | "higienizacao"
    | "monitoramento_insetos"
    | "monitoramento_roedores";
  tecnicoId: string;
  tecnicoNome: string;
  dataAgendamento: Date;
  horaAgendamento: string;
  endereco: string;
  status: "agendada" | "em_andamento" | "concluida" | "cancelada";
  observacoes?: string;
  dataConclusao?: Date;
  valorServico: number;
  fotos?: string[];
  fotosAntes?: string[];
  fotosDepois?: string[];
  diagnosticoLocal?: {
    pragasAlvo?: string[];
    areaExterna?: string;
    areaVicinal?: string;
    pontoDeReferencia?: string;
    piscina?: boolean;
    pet?: boolean;
  };
  dadosProduto?: {
    sanitizacao?: {
      principioAtivo?: string;
      produto?: string;
      diluente?: string;
      volume?: string;
      setor?: string;
      equipamento?: string;
    };
    controlePragasVetores?: {
      id?: string;
      principioAtivo?: string;
      concentracao?: string;
      diluente?: string;
      volume?: string;
      setor?: string;
      equipamento?: string;
    }[];
    higienizacao?: {
      tipoEquipamento?: string;
      nivelChuva?: string;
      tempoDuracaoEstimado?: number;
      volume?: number;
      realizarColeta?: boolean;
      fecharRegistro?: boolean;
    };
  };
  vistoria?: {
    id?: string;
    setor?: string;
    situacao?: string;
    medidaCorretiva?: string;
    avaliacao?: string;
  }[];
  descricaoServico?: {
    id?: string;
    setor?: string;
    higieneLocal?: string;
    nivelInfestacao?: string;
    equipamento?: string;
  }[];
  reservatorios?: {
    id?: string;
    reservatorio?: string;
    material?: string;
    volume?: number;
    desinfeccao?: number;
    situacao?: string;
    vetores?: boolean;
    residuos?: boolean;
    fendas?: boolean;
    boia?: string;
    cobertura?: string;
    pintura?: string;
    revestimentoInterno?: string;
    sistemaDeLadrao?: string;
  }[];
  monitoramento?: {
    id?: string;
    areaMonitorada?: string;
    pragaAlvo?: string[];
    tratamento?: string;
    grauInfestacao?: string;
    produtoUtilizado?: string;
    adesiva?: string;
    produto?: string;
    ml?: number;
    refilLuminosa?: boolean;
    quantidade?: number;
    fotos?: string[];
    observacoes?: string;
  }[];
  estacoes?: {
    id?: string;
    nome?: string;
    portaIscaRaticida?: PortaIscaRaticidaTypes[];
    armadilhaAdesiva?: ArmadilhaAdesivaTypes[];
    controle?: {
      id?: string;
      produto?: string;
      quantidade?: number;
    }[];
    pontosVariaveis?: {
      id?: string;
      local?: string;
      produto?: string;
      quantidade?: number;
    }[];
    fotos?: string[];
    observacoes?: string;
  }[];
};
