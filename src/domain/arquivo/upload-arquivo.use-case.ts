import { useCustomMutation } from "@/domain/custom-mutation";
import type { UploadArquivoInput, UploadArquivoResponse } from "@/model/rest/arquivo";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { uploadArquivoDatasource } from "@/rest/arquivo";

export function useUploadArquivo(params: UseCaseBaseParams<UploadArquivoResponse> = {}) {
  const {
    mutateAsync: uploadArquivo,
    data,
    error,
    isLoading,
  } = useCustomMutation<UploadArquivoResponse, UploadArquivoInput>({
    mutationFn: uploadArquivoDatasource,
    ...params,
  });

  return {
    uploadArquivo,
    uploadArquivoData: data,
    uploadArquivoError: error,
    isUploadArquivoLoading: isLoading,
  };
}
