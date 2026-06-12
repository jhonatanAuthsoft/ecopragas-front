import type { OrdemServico } from "@/model/rest/ordem-servico";

export type OrdemServicoDialogTab = "dados" | "endereco";

export type TipoServicoForm = OrdemServico["tipoServico"];

export type TipoServicoVariacao = "normal" | "monitoramento_insetos" | "monitoramento_roedores";

export type EstacaoMonitoramento = {
  id: string;
  nome: string;
};

export type AreaMonitoramentoInsetos = {
  id: string;
  nome: string;
  pragaAlvo: string;
  tratamento: string;
};

export type AreaMonitoramentoInsetosDraft = Omit<AreaMonitoramentoInsetos, "id">;

export type OrdemServicoFormValues = {
  clienteId: string;
  tipoServico: TipoServicoForm | "";
  tecnicoId: string;
  valorServico: string;
  status: OrdemServico["status"] | "";
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

export type MockCliente = {
  id: string;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  enderecos: ServicoEndereco[];
};

export type MockTecnico = {
  id: string;
  nome: string;
};

export type ViaCepResponse = {
  logradouro: string;
  bairro: string;
  localidade: string;
  estado: string;
  erro?: boolean;
};
