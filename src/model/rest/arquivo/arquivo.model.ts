import type { operations } from "../api-types";

export type UploadArquivoInput = File;
export type UploadArquivoResponse = operations["upload"]["responses"][200]["content"]["*/*"];

export type DownloadArquivoParams = operations["download"]["parameters"]["path"];
export type DownloadArquivoResponse = Blob;
