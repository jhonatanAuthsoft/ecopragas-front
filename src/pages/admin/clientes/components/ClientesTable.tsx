import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
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
import { ROUTES } from "@/constants/routes";
import type { Cliente } from "@/model/rest/cliente";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";

interface ClientesTableProps {
  clientes: Cliente[];
  currentPage: number;
  totalPages?: number;
  isLoading?: boolean;
  error?: boolean;
  onPageChange: (page: number) => void;
}

const CLIENTES_TABLE_COLUMNS = [
  "Nome",
  "CPF/CNPJ",
  "Tipo",
  "Telefone",
  "E-mail",
  "Local",
  "Ultimo Servico",
  null,
];

export const ClientesTable = ({
  clientes,
  currentPage,
  totalPages,
  isLoading,
  error,
  onPageChange,
}: ClientesTableProps) => {
  const navigate = useNavigate();
  const resolvedTotalPages = totalPages ?? 1;

  return (
    <LoadingState loading={isLoading} error={error} data={clientes.length > 0}>
      <LoadingState.Shimmer>
        <TableSkeleton columns={CLIENTES_TABLE_COLUMNS} />
      </LoadingState.Shimmer>

      <LoadingState.Error>
        <div className="text-center py-12">
          <p className="text-lg font-medium text-foreground">Erro ao carregar clientes</p>
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
              <TableHead>Tipo</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Último Serviço</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow
                key={cliente.id}
                className="cursor-pointer"
                onClick={() =>
                  navigate(ROUTES.ADMIN.CLIENT.DETAILS.replace(":id", cliente.id ?? ""))
                }
              >
                <TableCell className="text-grayscale-x-dark">{cliente.nomeRazaoSocial}</TableCell>
                <TableCell>{cliente.cnpjCpf ? formatCPFCNPJ(cliente.cnpjCpf) : "-"}</TableCell>
                <TableCell className="break-normal">
                  <Badge
                    variant="outline"
                    color={cliente.tipo === "RECORRENTE" ? "blue" : "orange"}
                  >
                    {cliente.tipo === "RECORRENTE" ? "Fixo" : "Esporadico"}
                  </Badge>
                </TableCell>
                <TableCell>{cliente.telefone ? formatPhone(cliente.telefone) : "-"}</TableCell>
                <TableCell>{cliente.email ?? "-"}</TableCell>
                <TableCell>
                  {cliente.cidade ?? cliente.enderecos?.[0]?.cidade ?? "-"}/
                  {cliente.estado ?? cliente.enderecos?.[0]?.estado ?? "-"}
                </TableCell>
                <TableCell>
                  {cliente.dataUltimoServico
                    ? format(new Date(cliente.dataUltimoServico), "dd/MM/yyyy", { locale: ptBR })
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <ChevronRight className="size-[20px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {resolvedTotalPages > 1 && (
          <PaginationControl
            className="mt-xs"
            currentPage={currentPage}
            totalPages={resolvedTotalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </LoadingState>
  );
};
