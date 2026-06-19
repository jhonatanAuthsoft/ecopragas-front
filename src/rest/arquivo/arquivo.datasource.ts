import type {
  DownloadArquivoParams,
  DownloadArquivoResponse,
  UploadArquivoInput,
  UploadArquivoResponse,
  UploadManyArquivosInput,
  UploadManyArquivosResponse,
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

export async function uploadManyArquivosDatasource(
  files: UploadManyArquivosInput,
): Promise<UploadManyArquivosResponse> {
  return Promise.all(
    files.map(async (file) => {
      const response = await uploadArquivoDatasource(file);
      const url = response.data;

      if (!url) {
        throw new Error("URL do arquivo não retornada");
      }

      return {
        nome: file.name,
        tipo: file.type,
        url,
      };
    }),
  );
}

export async function downloadArquivoDatasource(params: DownloadArquivoParams) {
  const { data } = await serverRequest.get<DownloadArquivoResponse>(
    `/arquivos/download/${params.nomeArquivo}`,
    { responseType: "blob" },
  );

  return data;
}
