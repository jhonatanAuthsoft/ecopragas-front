import type { components, operations } from "../api-types";

export type OrdemServico = components["schemas"]["OrdemServicoResponseDTO"];
export type OrdemServicoMetricas = components["schemas"]["OrdemServicoMetricasDTO"];

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
export type DownloadOrdensServicoPdfResponse =
  operations["ordem_servico_baixar_pdf"]["responses"][200]["content"]["application/json"];

export type GetOrdemServicoMetricasParams =
  operations["ordem_servico_obter_metricas"]["parameters"]["query"];
export type OrdemServicoMetricasResponse =
  components["schemas"]["StandardResponseOrdemServicoMetricasDTO"];
