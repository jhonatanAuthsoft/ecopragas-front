import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo, useState } from "react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from "@/atomic/mol.table";
import { LoadingState } from "@/atomic/obj.loading-state";
import { useGetDashboardMetricas } from "@/domain/dashboard";
import { useDebounce } from "@/hooks/use-debounce";
import type { ClienteRecente } from "@/model/rest/dashboard";
import { formatCPFCNPJ } from "@/utils/formatters";

// TODO: ver se vale continuar com a paginação ou sem
// const PAGE_SIZE = 5;
const RECENT_CLIENTS_TABLE_COLUMNS = ["Nome", "CPF/CNPJ", "Status", "Tipo", "Último Serviço"];

function getTipoLabel(tipo?: string): string {
  if (tipo === "RECORRENTE") return "Fixo";
  if (tipo === "ESPORADICO") return "Esporadico";
  return tipo ?? "-";
}

function getStatusLabel(status?: string): string {
  if (status === "ATIVO") return "Ativo";
  if (status === "INATIVO") return "Inativo";
  return status ?? "-";
}

function formatUltimoServicoDate(dataUltimoServico?: string): string {
  if (!dataUltimoServico) return "-";
  return format(new Date(dataUltimoServico), "dd/MM/yyyy", { locale: ptBR });
}

function filterClientesRecentes(clientes: ClienteRecente[], searchTerm: string): ClienteRecente[] {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return clientes;

  const searchDocument = term.replace(/\D/g, "");

  return clientes.filter((cliente) => {
    const nome = cliente.nome?.toLowerCase() ?? "";
    const documento = cliente.cpfCnpj?.replace(/\D/g, "") ?? "";

    return nome.includes(term) || (searchDocument.length > 0 && documento.includes(searchDocument));
  });
}

export const RecentClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);
  // const [page, setPage] = useState(0);

  const { metricas, metricasError, isMetricasLoading } = useGetDashboardMetricas();

  const clientesRecentes = metricas?.clientesRecentes ?? [];

  const filteredClientes = useMemo(
    () => filterClientesRecentes(clientesRecentes, debouncedSearch),
    [clientesRecentes, debouncedSearch],
  );

  // const totalPages = Math.max(1, Math.ceil(filteredClientes.length / PAGE_SIZE));
  // const currentPage = Math.min(page + 1, totalPages);
  // const paginatedClientes = filteredClientes.slice(
  //   (currentPage - 1) * PAGE_SIZE,
  //   currentPage * PAGE_SIZE,
  // );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // setPage(0);
  };

  // const handlePageChange = (nextPage: number) => {
  //   setPage(nextPage - 1);
  // };

  return (
    <div className="flex flex-col gap-md">
      <SearchInput placeholder="Buscar clientes" value={searchTerm} onChange={handleSearchChange} />

      <LoadingState
        loading={isMetricasLoading}
        error={!!metricasError}
        data={filteredClientes.length > 0}
      >
        <LoadingState.Shimmer>
          <TableSkeleton columns={RECENT_CLIENTS_TABLE_COLUMNS} />
        </LoadingState.Shimmer>

        <LoadingState.Error>
          <div className="text-center py-12">
            <p className="text-lg font-medium text-foreground">
              Erro ao carregar clientes recentes
            </p>
            <p className="text-sm text-muted-foreground mt-1">Tente recarregar a pagina</p>
          </div>
        </LoadingState.Error>

        <LoadingState.NoData>
          <div className="text-center py-12">
            <p className="text-lg font-medium text-foreground">Nenhum cliente encontrado</p>
            <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
          </div>
        </LoadingState.NoData>

        <div className="rounded-xs border border-border p-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF/CNPJ</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Último Serviço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((cliente, index) => (
                <TableRow key={`${cliente.cpfCnpj ?? ""}-${cliente.nome ?? ""}-${index}`}>
                  <TableCell className="text-grayscale-x-dark">{cliente.nome ?? "-"}</TableCell>
                  <TableCell>{cliente.cpfCnpj ? formatCPFCNPJ(cliente.cpfCnpj) : "-"}</TableCell>
                  <TableCell>{getStatusLabel(cliente.status)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      color={cliente.tipo === "RECORRENTE" ? "blue" : "orange"}
                    >
                      {getTipoLabel(cliente.tipo)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatUltimoServicoDate(cliente.dataUltimoServico)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* {totalPages > 1 && (
            <PaginationControl
              className="mt-xs"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )} */}
        </div>
      </LoadingState>
    </div>
  );
};
