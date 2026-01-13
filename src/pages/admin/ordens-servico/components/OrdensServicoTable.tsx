import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit, Eye, MoreVertical } from "lucide-react";
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
import type { OrdemServico } from "@/pages/admin/ordens-servico/OrdensServico";

interface OrdensServicoTableProps {
  ordensServico: OrdemServico[];
}

const tipoServicoLabels: Record<OrdemServico["tipoServico"], string> = {
  dedetizacao: "Dedetização",
  limpeza_caixa: "Limpeza de Caixa D'água",
  sanitizacao: "Sanitização",
  desratizacao: "Desratização",
  outro: "Outro",
};

export const OrdensServicoTable = ({ ordensServico }: OrdensServicoTableProps) => {
  if (ordensServico.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-foreground">Nenhuma ordem de serviço encontrada</p>
        <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border p-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nº O.S.</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Técnico</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordensServico.map((os) => (
            <TableRow key={os.id}>
              <TableCell className="font-medium">{os.numeroOS}</TableCell>
              <TableCell>{os.clienteNome}</TableCell>
              <TableCell>{tipoServicoLabels[os.tipoServico]}</TableCell>
              <TableCell className="text-muted-foreground">{os.tecnicoNome}</TableCell>
              <TableCell>
                {format(os.dataAgendamento, "dd/MM/yyyy", { locale: ptBR })}
              </TableCell>
              <TableCell>
                {os.horaAgendamento}
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm">
                {os.endereco}
              </TableCell>
              <TableCell className="font-semibold text-brand-secondary-medium">
                R$ {os.valorServico.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => (window.location.href = `/ordens-servico/${os.numeroOS}`)}
                    >
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
