import { useCustomMutation } from "@/domain/custom-mutation";
import type { DownloadArquivoParams, DownloadArquivoResponse } from "@/model/rest/arquivo";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { downloadArquivoDatasource } from "@/rest/arquivo";

export function useDownloadArquivo(params: UseCaseBaseParams<DownloadArquivoResponse> = {}) {
  const {
    mutateAsync: downloadArquivo,
    data,
    error,
    isLoading,
  } = useCustomMutation<DownloadArquivoResponse, DownloadArquivoParams>({
    mutationFn: downloadArquivoDatasource,
    ...params,
  });

  return {
    downloadArquivo,
    downloadArquivoData: data,
    downloadArquivoError: error,
    isDownloadArquivoLoading: isLoading,
  };
}
