import type {
  AtualizarChecklistAgendamentoInput,
  AtualizarChecklistAgendamentoParams,
  AtualizarChecklistAgendamentoResponse,
  CadastrarAgendamentoInput,
  CadastrarAgendamentoResponse,
  DeleteAgendamentoParams,
  EditAgendamentoInput,
  EditAgendamentoParams,
  EditAgendamentoResponse,
  GetAgendamentoResponse,
  ListAgendamentosParams,
  ListAgendamentosResponse,
} from "@/model/rest/agendamento";
import { serverRequest } from "@/rest/server-request";

export async function cadastrarAgendamentoDatasource(body: CadastrarAgendamentoInput) {
  const { data } = await serverRequest.post<CadastrarAgendamentoResponse>("/agendamentos", body);
  return data;
}

export async function listAgendamentosDatasource(params: ListAgendamentosParams = {}) {
  const { data } = await serverRequest.get<ListAgendamentosResponse>("/agendamentos", { params });
  return data;
}

export async function getAgendamentoDatasource(id: string) {
  const { data } = await serverRequest.get<GetAgendamentoResponse>(`/agendamentos/${id}`);
  return data;
}

export async function editAgendamentoDatasource(
  params: EditAgendamentoParams,
  body: EditAgendamentoInput,
) {
  const { data } = await serverRequest.put<EditAgendamentoResponse>(
    `/agendamentos/${params.id}`,
    body,
  );
  return data;
}

export async function deleteAgendamentoDatasource(params: DeleteAgendamentoParams) {
  await serverRequest.delete(`/agendamentos/${params.id}`);
}

export async function atualizarAgendamentoChecklistDatasource(
  params: AtualizarChecklistAgendamentoParams,
  body: AtualizarChecklistAgendamentoInput,
) {
  const { data } = await serverRequest.put<AtualizarChecklistAgendamentoResponse>(
    `/agendamentos/${params.id}/checklist`,
    body,
  );
  return data;
}
