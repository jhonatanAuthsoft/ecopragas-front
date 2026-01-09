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
import type { OrdemServico } from "@/pages/admin/ordens-servico/OrdensServico";

interface OrdensServicoTableProps {
  ordensServico: OrdemServico[];
}

const statusConfig = {
  agendada: {
    label: "Agendada",
    className: "bg-info/10 text-info hover:bg-info/20",
  },
  em_andamento: {
    label: "Em Andamento",
    className: "bg-warning/10 text-warning hover:bg-warning/20",
  },
  concluida: {
    label: "Concluída",
    className: "bg-success/10 text-success hover:bg-success/20",
  },
  cancelada: {
    label: "Cancelada",
    className: "bg-muted text-muted-foreground hover:bg-muted/80",
  },
};

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
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nº O.S.</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Tipo de Serviço</TableHead>
            <TableHead>Técnico</TableHead>
            <TableHead>Data/Hora</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
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
                <div className="space-y-0.5">
                  <div className="text-sm">
                    {format(os.dataAgendamento, "dd/MM/yyyy", { locale: ptBR })}
                  </div>
                  <div className="text-xs text-muted-foreground">{os.horaAgendamento}</div>
                </div>
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm">
                {os.endereco}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                R$ {os.valorServico.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell>
                <Badge className={statusConfig[os.status].className}>
                  {statusConfig[os.status].label}
                </Badge>
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
    </div>
  );
};
