import { Cliente } from "@/pages/Clientes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ClientesTableProps {
  clientes: Cliente[];
}

export const ClientesTable = ({ clientes }: ClientesTableProps) => {
  if (clientes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-foreground">
          Nenhum cliente encontrado
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Tente ajustar os filtros de busca
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Cidade/Estado</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Último Serviço</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell className="font-medium">{cliente.nome}</TableCell>
              <TableCell className="text-muted-foreground">
                {cliente.cpfCnpj}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    cliente.tipoCliente === "fixo"
                      ? "bg-secondary/10 text-secondary border-secondary/20"
                      : "bg-info/10 text-info border-info/20"
                  }
                >
                  {cliente.tipoCliente === "fixo" ? "Fixo" : "Esporádico"}
                </Badge>
              </TableCell>
              <TableCell>{cliente.telefone}</TableCell>
              <TableCell className="text-muted-foreground">
                {cliente.email}
              </TableCell>
              <TableCell>
                {cliente.cidade}/{cliente.estado}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    cliente.status === "ativo"
                      ? "bg-success/10 text-success hover:bg-success/20"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }
                >
                  {cliente.status === "ativo" ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
              <TableCell>
                {cliente.ultimoServico ? (
                  <span className="text-sm text-muted-foreground">
                    {format(cliente.ultimoServico, "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground italic">
                    Nunca
                  </span>
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
    </div>
  );
};
