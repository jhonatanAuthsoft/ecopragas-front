import type { InfiniteSelectQueryConfig } from "@/domain/infinite-list";
import type { Cliente } from "@/model/rest/cliente";
import { listClientesDatasource } from "@/rest/cliente";

export const LIST_CLIENTES_INFINITE_QUERY_KEY = "list-clientes-infinite";

export const clientesInfiniteSelectConfig: InfiniteSelectQueryConfig<Cliente> = {
  queryKey: LIST_CLIENTES_INFINITE_QUERY_KEY,
  fetchPage: ({ offset, limit, searchText }) =>
    listClientesDatasource({ offset, limit, searchText: searchText || undefined }),
  mapToOption: (cliente) => ({
    value: cliente.id ?? "",
    label: cliente.nomeRazaoSocial ?? "-",
  }),
};
