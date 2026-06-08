import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import type { OrdemServico } from "@/pages/admin/ordens-servico/OrdensServico";
import { formatCurrency } from "@/utils/formatters";

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
  const navigate = useNavigate();

  if (ordensServico.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-foreground">Nenhuma ordem de serviço encontrada</p>
        <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
      </div>
    );
  }

  return (
    <div className="rounded-xs border border-border p-lg">
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
            <TableRow
              key={os.id}
              className="cursor-pointer"
              onClick={() => navigate(ROUTES.SERVICE_ORDER.DETAILS.replace(":id", os.id))}
            >
              <TableCell className="text-grayscale-x-dark">{os.numeroOS}</TableCell>
              <TableCell>{os.clienteNome}</TableCell>
              <TableCell>{tipoServicoLabels[os.tipoServico]}</TableCell>
              <TableCell className="text-muted-foreground">{os.tecnicoNome}</TableCell>
              <TableCell>{format(os.dataAgendamento, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
              <TableCell>{os.horaAgendamento}</TableCell>
              <TableCell className="max-w-[200px]" textClassName="truncate">
                {os.endereco}
              </TableCell>
              <TableCell className="text-brand-secondary-medium">
                <b>{formatCurrency(os.valorServico)}</b>
              </TableCell>
              <TableCell>
                <ChevronRight className="size-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControl className="mt-xs" currentPage={1} totalPages={3} />
    </div>
  );
};
