import type { CadastrarClienteInput, CadastrarClienteResponse } from "@/model/rest/cliente";
import { serverRequest } from "@/rest/server-request";

export async function cadastrarClienteDatasource(body: CadastrarClienteInput) {
  const { data } = await serverRequest.post<CadastrarClienteResponse>("/clientes", body);
  return data;
}
