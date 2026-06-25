import { useMutation } from "@tanstack/react-query";
import { visualizarPdfOsPortalDatasource } from "@/rest/cliente/cliente.datasource";

export function useVisualizarPdfOsPortal() {
  return useMutation({
    mutationFn: (id: string) => visualizarPdfOsPortalDatasource(id),
  });
}
