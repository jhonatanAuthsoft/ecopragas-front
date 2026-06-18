import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import { ROUTES } from "@/constants/routes";
import type { Cliente } from "@/model/rest/cliente";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";

interface ClientesTableProps {
  clientes: Cliente[];
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

const SKELETON_ROWS = Array.from({ length: 5 }, (_, index) => `row-${index}`);
const SKELETON_CELLS = Array.from({ length: 8 }, (_, index) => `cell-${index}`);

export const ClientesTable = ({
  clientes,
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: ClientesTableProps) => {
  const navigate = useNavigate();

  // TODO: LoadingState
  if (isLoading) {
    return (
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
              <TableHead>Ultimo Servico</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SKELETON_ROWS.map((rowKey) => (
              <TableRow key={rowKey}>
                {SKELETON_CELLS.map((cellKey) => (
                  <TableCell key={`${rowKey}-${cellKey}`}>
                    <Skeleton className="h-[20px] w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-foreground">Nenhum cliente encontrado</p>
        <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
      </div>
    );
  }

  return (
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow
              key={cliente.id}
              className="cursor-pointer"
              onClick={() => navigate(ROUTES.ADMIN.CLIENT.DETAILS.replace(":id", cliente.id ?? ""))}
            >
              <TableCell className="text-grayscale-x-dark">{cliente.nomeRazaoSocial}</TableCell>
              <TableCell>{cliente.cnpjCpf ? formatCPFCNPJ(cliente.cnpjCpf) : "-"}</TableCell>
              <TableCell className="break-normal">
                <Badge variant="outline" color={cliente.tipo === "RECORRENTE" ? "blue" : "orange"}>
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

      <PaginationControl
        className="mt-xs"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
