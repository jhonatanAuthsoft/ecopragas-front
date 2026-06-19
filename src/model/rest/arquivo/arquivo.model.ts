import type { operations } from "../api-types";

export type ArquivoMetadata = {
  nome?: string;
  tipo?: string;
  url?: string;
};

export type UploadArquivoInput = File;
export type UploadArquivoResponse =
  operations["upload_upload"]["responses"][200]["content"]["application/json"];

export type UploadManyArquivosInput = File[];
export type UploadManyArquivosResponse = ArquivoMetadata[];

export type DownloadArquivoParams = operations["upload_download"]["parameters"]["path"];
export type DownloadArquivoResponse = Blob;
