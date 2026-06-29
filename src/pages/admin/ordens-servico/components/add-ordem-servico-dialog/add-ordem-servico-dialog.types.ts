import type { OrdemServico } from "@/model/rest/ordem-servico";

export type OrdemServicoDialogTab = "dados" | "endereco";

export type TipoServicoForm = NonNullable<OrdemServico["tipoServico"]>;
export type StatusOrdemServicoForm = OrdemServico["status"];

export type TipoServicoVariacao = "normal" | "monitoramento_insetos" | "monitoramento_roedores";

export type EstacaoMonitoramento = {
  id: string;
  nome: string;
};

export type AreaMonitoramentoInsetos = {
  id: string;
  nome: string;
  pragaAlvo: string[];
  tratamento: string;
};

export type AreaMonitoramentoInsetosDraft = Omit<AreaMonitoramentoInsetos, "id">;

// TODO: organizar nos models
export type OrdemServicoFormValues = {
  clienteId: string;
  tipoServico: TipoServicoForm | "";
  valorServico: string;
  status: StatusOrdemServicoForm | "";
  data?: Date;
  horario: string;
  observacoes: string;
  estacoesMonitoramento: EstacaoMonitoramento[];
  areasMonitoramentoInsetos: AreaMonitoramentoInsetos[];
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
