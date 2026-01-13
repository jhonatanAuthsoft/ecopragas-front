import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit, Eye, MoreVertical } from "lucide-react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/atomic/mol.dropdown-menu/dropdown-menu.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/atomic/mol.pagination/pagination.component";
import type { Cliente } from "@/pages/admin/clientes/Clientes";

interface ClientesTableProps {
  clientes: Cliente[];
}

export const ClientesTable = ({ clientes }: ClientesTableProps) => {
  if (clientes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-foreground">Nenhum cliente encontrado</p>
        <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border p-md">
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
            <TableRow key={cliente.id}>
              <TableCell className="font-medium">{cliente.nome}</TableCell>
              <TableCell className="text-muted-foreground">{cliente.cpfCnpj}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    cliente.tipoCliente === "fixo"
                      ? "bg-brand-secondary-light/20 text-brand-secondary-medium hover:bg-brand-secondary-light/20 border border-brand-secondary-medium"
                      : "bg-feedback-warning-light text-feedback-warning-dark border border-brand-accessory-orange"
                  }
                >
                  {cliente.tipoCliente === "fixo" ? "Fixo" : "Esporádico"}
                </Badge>
              </TableCell>
              <TableCell>{cliente.telefone}</TableCell>
              <TableCell className="text-muted-foreground">{cliente.email}</TableCell>
              <TableCell>
                {cliente.cidade}/{cliente.estado}
              </TableCell>
              <TableCell>
                {cliente.ultimoServico ? (
                  <span className="text-sm text-muted-foreground">
                    {format(cliente.ultimoServico, "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground italic">Nunca</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" disabled />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive className="bg-brand-primary-medium text-white hover:bg-brand-primary-dark hover:text-white">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
