import type {
  CadastrarTecnicoInput,
  CadastrarTecnicoResponse,
  DeleteTecnicoParams,
  EditTecnicoInput,
  EditTecnicoParams,
  EditTecnicoResponse,
  GetTecnicoParams,
  GetTecnicoResponse,
  ListTecnicosParams,
  ListTecnicosResponse,
} from "@/model/rest/tecnico";
import { serverRequest } from "@/rest/server-request";

export async function cadastrarTecnicoDatasource(body: CadastrarTecnicoInput) {
  const { data } = await serverRequest.post<CadastrarTecnicoResponse>("/tecnicos", body);
  return data;
}

export async function listTecnicosDatasource(params: ListTecnicosParams) {
  const { data } = await serverRequest.get<ListTecnicosResponse>("/tecnicos", { params });
  return data;
}

export async function getTecnicoDatasource(id: GetTecnicoParams["id"]) {
  const { data } = await serverRequest.get<GetTecnicoResponse>(`/tecnicos/${id}`);
  return data;
}

export async function deleteTecnicoDatasource({ id }: DeleteTecnicoParams) {
  await serverRequest.delete(`/tecnicos/${id}`);
}

export async function editTecnicoDatasource(id: EditTecnicoParams["id"], body: EditTecnicoInput) {
  const { data } = await serverRequest.put<EditTecnicoResponse>(`/tecnicos/${id}`, body);
  return data;
}
