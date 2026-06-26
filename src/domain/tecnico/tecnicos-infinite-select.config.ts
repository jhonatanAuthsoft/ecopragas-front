import type { InfiniteSelectQueryConfig } from "@/domain/infinite-list";
import type { Tecnico } from "@/model/rest/tecnico";
import { listTecnicosDatasource } from "@/rest/tecnico";

export const LIST_TECNICOS_INFINITE_QUERY_KEY = "list-tecnicos-infinite";

export const tecnicosInfiniteSelectConfig: InfiniteSelectQueryConfig<Tecnico> = {
  queryKey: LIST_TECNICOS_INFINITE_QUERY_KEY,
  fetchPage: ({ offset, limit, searchText }) =>
    listTecnicosDatasource({ offset, limit, searchText: searchText || undefined }),
  mapToOption: (tecnico) => ({
    value: tecnico.id ?? "",
    label: tecnico.nome ?? "-",
  }),
};
