import type {
  CadastrarLeadRequest,
  CadastrarLeadResponse,
  DeleteLeadParams,
  EditLeadParams,
  EditLeadRequest,
  EditLeadResponse,
  GetLeadParams,
  GetLeadResponse,
  LeadDashboardResponse,
  ListLeadsParams,
  ListLeadsResponse,
  UpdateLeadStatusParams,
  UpdateLeadStatusRequest,
  UpdateLeadStatusResponse,
} from "@/model/rest/lead";
import { serverRequest } from "@/rest/server-request";

export async function cadastrarLeadDatasource(body: CadastrarLeadRequest) {
  const { data } = await serverRequest.post<CadastrarLeadResponse>("/leads", body);
  return data;
}

export async function listLeadsDatasource(params: ListLeadsParams) {
  const { data } = await serverRequest.get<ListLeadsResponse>("/leads", { params });
  return data;
}

export async function getLeadDatasource(id: GetLeadParams["id"]) {
  const { data } = await serverRequest.get<GetLeadResponse>(`/leads/${id}`);
  return data;
}

export async function getLeadDashboardDatasource() {
  const { data } = await serverRequest.get<LeadDashboardResponse>("/leads/dashboard");
  return data;
}

export async function deleteLeadDatasource({ id }: DeleteLeadParams) {
  await serverRequest.delete(`/leads/${id}`);
}

export async function editLeadDatasource(id: EditLeadParams["id"], body: EditLeadRequest) {
  const { data } = await serverRequest.put<EditLeadResponse>(`/leads/${id}`, body);
  return data;
}

export async function updateLeadStatusDatasource(
  id: UpdateLeadStatusParams["id"],
  body: UpdateLeadStatusRequest,
) {
  const { data } = await serverRequest.patch<UpdateLeadStatusResponse>(`/leads/${id}/status`, body);
  return data;
}
