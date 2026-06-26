import type { InfiniteSelectQueryConfig } from "@/domain/infinite-list";
import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";
import { listOrdensServicoDatasource } from "@/rest/ordem-servico";

export const LIST_ORDENS_SERVICO_INFINITE_QUERY_KEY = "list-ordens-servico-infinite";

export const ordensServicoInfiniteSelectConfig: InfiniteSelectQueryConfig<OrdemServico> = {
  queryKey: LIST_ORDENS_SERVICO_INFINITE_QUERY_KEY,
  fetchPage: ({ offset, limit, searchText }) =>
    listOrdensServicoDatasource({ offset, limit, searchText: searchText || undefined }),
  mapToOption: (ordemServico) => ({
    value: ordemServico.id ?? "",
    label: ordemServico.osNumero != null ? `OS-${ordemServico.osNumero}` : "-",
  }),
};
