import type {
  CadastrarClienteInput,
  CadastrarClienteResponse,
  ClienteDashboardResponse,
  DeleteClienteParams,
  EditClienteMutationParams,
  EditClienteResponse,
  GetClienteResponse,
  ListClientesParams,
  ListClientesResponse,
} from "@/model/rest/cliente";
import { serverRequest } from "@/rest/server-request";

export async function cadastrarClienteDatasource(body: CadastrarClienteInput) {
  const { data } = await serverRequest.post<CadastrarClienteResponse>("/clientes", body);
  return data;
}

export async function listClientesDatasource(params: ListClientesParams) {
  const { data } = await serverRequest.get<ListClientesResponse>("/clientes", { params });
  return data;
}

export async function getClienteDatasource(id: string) {
  const { data } = await serverRequest.get<GetClienteResponse>(`/clientes/${id}`);
  return data;
}

export async function getClienteDashboardDatasource() {
  const { data } = await serverRequest.get<ClienteDashboardResponse>("/clientes/dashboard");
  return data;
}

export async function deleteClienteDatasource({ id }: DeleteClienteParams) {
  await serverRequest.delete(`/clientes/${id}`);
}

export async function editClienteDatasource({ id, body }: EditClienteMutationParams) {
  const { data } = await serverRequest.put<EditClienteResponse>(`/clientes/${id}`, body);
  return data;
}
