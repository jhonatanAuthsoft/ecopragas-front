import type {
  DownloadArquivoParams,
  DownloadArquivoResponse,
  UploadArquivoInput,
  UploadArquivoResponse,
} from "@/model/rest/arquivo";
import { serverRequest } from "@/rest/server-request";

export async function uploadArquivoDatasource(file: UploadArquivoInput) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await serverRequest.post<UploadArquivoResponse>("/arquivos/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function downloadArquivoDatasource(params: DownloadArquivoParams) {
  const { data } = await serverRequest.get<DownloadArquivoResponse>(
    `/arquivos/download/${params.nomeArquivo}`,
    { responseType: "blob" },
  );

  return data;
}
