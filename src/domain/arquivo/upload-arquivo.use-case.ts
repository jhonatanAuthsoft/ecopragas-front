import { useCustomMutation } from "@/domain/custom-mutation";
import type {
  UploadArquivoInput,
  UploadArquivoResponse,
  UploadManyArquivosInput,
  UploadManyArquivosResponse,
} from "@/model/rest/arquivo";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { uploadArquivoDatasource, uploadManyArquivosDatasource } from "@/rest/arquivo";

export function useUploadArquivo(params: UseCaseBaseParams<UploadArquivoResponse> = {}) {
  const {
    mutate: uploadArquivo,
    mutateAsync: uploadArquivoAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<UploadArquivoResponse, UploadArquivoInput>({
    mutationFn: uploadArquivoDatasource,
    ...params,
  });

  return {
    uploadArquivo,
    uploadArquivoAsync,
    uploadArquivoData: data,
    uploadArquivoError: error,
    isUploadArquivoLoading: isLoading,
  };
}

export function useUploadManyArquivos(params: UseCaseBaseParams<UploadManyArquivosResponse> = {}) {
  const {
    mutateAsync: uploadManyArquivosAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<UploadManyArquivosResponse, UploadManyArquivosInput>({
    mutationFn: uploadManyArquivosDatasource,
    ...params,
  });

  return {
    uploadManyArquivosAsync,
    uploadManyArquivosData: data,
    uploadManyArquivosError: error,
    isUploadManyArquivosLoading: isLoading,
  };
}
