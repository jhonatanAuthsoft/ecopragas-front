import type { components, operations } from "../api-types";

export type OrdemServico = components["schemas"]["OrdemServicoResponseDTO"];
export type OrdemServicoDetalhes = components["schemas"]["OrdemServicoDetalhesDTO"];
export type OrdemServicoMetricas = components["schemas"]["OrdemServicoMetricasDTO"];
export type TipoServicoOrdem = NonNullable<OrdemServico["tipoServico"]>;
export type StatusOrdemServico = NonNullable<OrdemServico["status"]>;

export type DiagnosticoLocal = components["schemas"]["DiagnosticoLocalDTO"];
export type DadosProduto = components["schemas"]["DadosProdutoDTO"];
export type VistoriaItem = components["schemas"]["VistoriaItemDTO"];
export type RegistroServico = components["schemas"]["RegistroServicoDTO"];
export type DescricaoServicoItem = components["schemas"]["DescricaoServicoItemDTO"];
export type HigienizacaoProduto = components["schemas"]["HigienizacaoProdutoDTO"];
export type ReservatorioItem = components["schemas"]["ReservatorioItemDTO"];
export type AreaMonitoramentoInsetos = components["schemas"]["AreaMonitoramentoInsetosDTO"];
export type EstacaoMonitoramentoRoedores = components["schemas"]["EstacaoMonitoramentoRoedoresDTO"];
export type EstacaoControle = components["schemas"]["EstacaoControleDTO"];
export type EstacaoPontoVariavel = components["schemas"]["EstacaoPontoVariavelDTO"];

export type CadastrarOrdemServicoInput =
  operations["ordem_servico_cadastrar"]["requestBody"]["content"]["application/json"];
export type CadastrarOrdemServicoResponse =
  operations["ordem_servico_cadastrar"]["responses"][200]["content"]["application/json"];

export type ListOrdensServicoParams =
  operations["ordem_servico_obter_todos"]["parameters"]["query"];
export type ListOrdensServicoResponse =
  components["schemas"]["StandardResponseListOrdemServicoResponseDTO"];

export type GetOrdemServicoParams = operations["ordem_servico_obter_por_id"]["parameters"]["path"];
export type GetOrdemServicoResponse =
  components["schemas"]["StandardResponseOrdemServicoResponseDTO"];

export type DeleteOrdemServicoParams = operations["ordem_servico_excluir"]["parameters"]["path"];

export type EditOrdemServicoParams = operations["ordem_servico_editar"]["parameters"]["path"];
export type EditOrdemServicoInput =
  operations["ordem_servico_editar"]["requestBody"]["content"]["application/json"];
export type EditOrdemServicoResponse =
  operations["ordem_servico_editar"]["responses"][200]["content"]["application/json"];

export type DownloadOrdensServicoPdfParams =
  operations["ordem_servico_baixar_pdf"]["parameters"]["path"];
export type DownloadOrdensServicoPdfResponse = Blob;

export type GetOrdemServicoMetricasParams =
  operations["ordem_servico_obter_metricas"]["parameters"]["query"];
export type OrdemServicoMetricasResponse =
  components["schemas"]["StandardResponseOrdemServicoMetricasDTO"];
