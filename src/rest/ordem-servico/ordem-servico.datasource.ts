import type {
  CadastrarOrdemServicoInput,
  CadastrarOrdemServicoResponse,
  DeleteOrdemServicoParams,
  DownloadOrdensServicoPdfParams,
  DownloadOrdensServicoPdfResponse,
  EditOrdemServicoInput,
  EditOrdemServicoParams,
  EditOrdemServicoResponse,
  GetOrdemServicoResponse,
  ListOrdensServicoParams,
  ListOrdensServicoResponse,
} from "@/model/rest/ordem-servico";
import { serverRequest } from "@/rest/server-request";

export async function cadastrarOrdemServicoDatasource(body: CadastrarOrdemServicoInput) {
  const { data } = await serverRequest.post<CadastrarOrdemServicoResponse>("/ordens-servico", body);
  return data;
}

export async function listOrdensServicoDatasource(params: ListOrdensServicoParams) {
  const { data } = await serverRequest.get<ListOrdensServicoResponse>("/ordens-servico", {
    params,
  });
  return data;
}

export async function getOrdemServicoDatasource(id: string) {
  const { data } = await serverRequest.get<GetOrdemServicoResponse>(`/ordens-servico/${id}`);
  return data;
}

export async function deleteOrdemServicoDatasource({ id }: DeleteOrdemServicoParams) {
  await serverRequest.delete(`/ordens-servico/${id}`);
}

export async function editOrdemServicoDatasource(
  params: EditOrdemServicoParams,
  body: EditOrdemServicoInput,
) {
  const { data } = await serverRequest.put<EditOrdemServicoResponse>(
    `/ordens-servico/${params.id}`,
    body,
  );
  return data;
}

export async function downloadOrdensServicoPdfDatasource({ id }: DownloadOrdensServicoPdfParams) {
  const { data } = await serverRequest.get<DownloadOrdensServicoPdfResponse>(
    `/ordens-servico/${id}/pdf`,
  );
  return data;
}
