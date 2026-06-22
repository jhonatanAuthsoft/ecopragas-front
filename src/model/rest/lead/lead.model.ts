import type { components, operations } from "../api-types";

export type Lead = components["schemas"]["LeadResponseDTO"];
export type LeadDashboard = components["schemas"]["LeadDashboardDTO"];
export type LeadOrigem = Lead["origem"];
export type LeadStatus = Lead["status"];

export type CadastrarLeadRequest =
  operations["lead_cadastrar"]["requestBody"]["content"]["application/json"];
export type CadastrarLeadResponse =
  operations["lead_cadastrar"]["responses"][200]["content"]["application/json"];

export type ListLeadsParams = NonNullable<operations["lead_obter_todos"]["parameters"]["query"]>;
export type ListLeadsResponse = components["schemas"]["StandardResponseListLeadResponseDTO"];

export type GetLeadParams = operations["lead_obter_por_id"]["parameters"]["path"];
export type GetLeadResponse = components["schemas"]["StandardResponseLeadResponseDTO"];

export type DeleteLeadParams = operations["lead_excluir"]["parameters"]["path"];

export type EditLeadParams = operations["lead_editar"]["parameters"]["path"];
export type EditLeadRequest =
  operations["lead_editar"]["requestBody"]["content"]["application/json"];
export type EditLeadResponse =
  operations["lead_editar"]["responses"][200]["content"]["application/json"];

export type UpdateLeadStatusParams = operations["lead_atualizar_status"]["parameters"]["path"];
export type UpdateLeadStatusRequest =
  operations["lead_atualizar_status"]["requestBody"]["content"]["application/json"];
export type UpdateLeadStatusResponse =
  operations["lead_atualizar_status"]["responses"][200]["content"]["application/json"];

export type LeadDashboardResponse = components["schemas"]["StandardResponseLeadDashboardDTO"];
