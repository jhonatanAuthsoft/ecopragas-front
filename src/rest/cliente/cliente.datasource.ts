import type {
  CadastrarClienteInput,
  CadastrarClienteResponse,
  ClienteDashboardResponse,
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

export async function getClienteDashboardDatasource() {
  const { data } = await serverRequest.get<ClienteDashboardResponse>("/clientes/dashboard");
  return data;
}
