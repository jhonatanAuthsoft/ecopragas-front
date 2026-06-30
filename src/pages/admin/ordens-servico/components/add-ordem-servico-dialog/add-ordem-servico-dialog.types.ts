import type {
  AreaMonitoramentoInsetos,
  EstacaoMonitoramentoRoedores,
  TipoServicoOrdem,
} from "@/model/rest/ordem-servico";

export type OrdemServicoDialogTab = "dados" | "endereco";

export type TipoServicoForm = TipoServicoOrdem;

export type TipoServicoVariacao = "normal" | "monitoramento_insetos" | "monitoramento_roedores";

export type EstacaoMonitoramentoFormItem = EstacaoMonitoramentoRoedores & {
  id: string;
};

export type AreaMonitoramentoInsetosFormItem = AreaMonitoramentoInsetos & {
  id: string;
};

export type AreaMonitoramentoInsetosDraft = {
  areaMonitorada: string;
  pragasAlvo: string[];
  tratamento: string;
};

export type OrdemServicoFormValues = {
  clienteId: string;
  tipoServico: TipoServicoForm | "";
  valorServico: string;
  data?: Date;
  horario: string;
  observacoes: string;
  estacoesMonitoramento: EstacaoMonitoramentoFormItem[];
  areasMonitoramentoInsetos: AreaMonitoramentoInsetosFormItem[];
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  endereco: string;
  numero: string;
  complemento: string;
};

export type ServicoEndereco = {
  id: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  endereco: string;
  numero: string;
  complemento: string;
  padrao?: boolean;
};

export type ViaCepResponse = {
  logradouro: string;
  bairro: string;
  localidade: string;
  estado: string;
  erro?: boolean;
};
