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
} from "@/atomic/mol.table/table.component";
import { ROUTES } from "@/constants/routes";
import type { Cliente } from "@/model/rest/cliente";

interface ClientesTableProps {
  clientes: Cliente[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ClientesTable = ({
  clientes,
  currentPage,
  totalPages,
  onPageChange,
}: ClientesTableProps) => {
  const navigate = useNavigate();

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
              onClick={() => navigate(ROUTES.CLIENT.DETAILS.replace(":id", cliente.id ?? ""))}
            >
              <TableCell className="text-grayscale-x-dark">{cliente.nomeRazaoSocial}</TableCell>
              <TableCell>{cliente.cnpjCpf}</TableCell>
              <TableCell className="break-normal">
                <Badge variant="outline" color={cliente.tipo === "RECORRENTE" ? "blue" : "orange"}>
                  {cliente.tipo === "RECORRENTE" ? "Fixo" : "Esporadico"}
                </Badge>
              </TableCell>
              <TableCell>{cliente.telefone}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>
                {(cliente.cidade ?? cliente.enderecos?.[0]?.cidade) ?? "-"}/
                {(cliente.estado ?? cliente.enderecos?.[0]?.estado) ?? "-"}
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
