import { useCustomMutation } from "@/domain/custom-mutation";
import type {
  DownloadOrdensServicoPdfParams,
  DownloadOrdensServicoPdfResponse,
} from "@/model/rest/ordem-servico";
import type { UseCaseBaseParams } from "@/model/use-case.model";
import { downloadOrdensServicoPdfDatasource } from "@/rest/ordem-servico";

export function useDownloadOrdensServicoPdf(
  params: UseCaseBaseParams<DownloadOrdensServicoPdfResponse> = {},
) {
  const {
    mutate: downloadOrdensServicoPdf,
    mutateAsync: downloadOrdensServicoPdfAsync,
    data,
    error,
    isLoading,
  } = useCustomMutation<DownloadOrdensServicoPdfResponse, DownloadOrdensServicoPdfParams>({
    mutationFn: downloadOrdensServicoPdfDatasource,
    ...params,
  });

  return {
    downloadOrdensServicoPdf,
    downloadOrdensServicoPdfAsync,
    downloadOrdensServicoPdfData: data,
    downloadOrdensServicoPdfError: error,
    isDownloadOrdensServicoPdfLoading: isLoading,
  };
}
