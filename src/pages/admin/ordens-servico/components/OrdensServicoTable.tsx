import { format } from "date-fns";
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
  TableSkeleton,
} from "@/atomic/mol.table";
import { LoadingState } from "@/atomic/obj.loading-state";
import { ROUTES } from "@/constants/routes";
import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";
import { parseDateTime } from "@/utils/date-time";
import { formatCurrency, formatTipoServico } from "@/utils/formatters";
import { formatEnderecoFromOrdemServico, formatOsNumero } from "@/utils/ordem-servico";

const ORDENS_SERVICO_TABLE_COLUMNS = [
  "N O.S.",
  "Cliente",
  "Servico",
  "Tecnico",
  "Data",
  "Horario",
  "Endereco",
  "Valor",
  null,
];

interface OrdensServicoTableProps {
  ordensServico: OrdemServico[];
  currentPage: number;
  totalPages?: number;
  isLoading?: boolean;
  error?: boolean;
  onPageChange: (page: number) => void;
}

export const OrdensServicoTable = ({
  ordensServico,
  currentPage,
  totalPages,
  isLoading,
  error,
  onPageChange,
}: OrdensServicoTableProps) => {
  const navigate = useNavigate();
  const resolvedTotalPages = totalPages ?? 1;

  return (
    <LoadingState loading={isLoading} error={error} data={ordensServico.length > 0}>
      <LoadingState.Shimmer>
        <TableSkeleton columns={ORDENS_SERVICO_TABLE_COLUMNS} />
      </LoadingState.Shimmer>

      <LoadingState.Error>
        <div className="text-center py-12">
          <p className="text-lg font-medium text-foreground">Erro ao carregar ordens de serviço</p>
          <p className="text-sm text-muted-foreground mt-1">Tente recarregar a página</p>
        </div>
      </LoadingState.Error>

      <LoadingState.NoData>
        <div className="text-center py-12">
          <p className="text-lg font-medium text-foreground">Nenhuma ordem de serviço encontrada</p>
          <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
        </div>
      </LoadingState.NoData>

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
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordensServico.map((os) => {
              const { date, time } = parseDateTime(os.dataHoraServico);

              return (
                <TableRow
                  key={os.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(ROUTES.ADMIN.SERVICE_ORDER.DETAILS.replace(":id", os.id ?? ""))
                  }
                >
                  <TableCell className="text-grayscale-x-dark">
                    {formatOsNumero(os.osNumero)}
                  </TableCell>
                  <TableCell>{os.clienteNome ?? "-"}</TableCell>
                  <TableCell>{formatTipoServico(os.tipoServico)}</TableCell>
                  {/* TODO: adicionar técnico */}
                  <TableCell className="text-muted-foreground">-</TableCell>
                  <TableCell>{date ? format(date, "dd/MM/yyyy") : "-"}</TableCell>
                  <TableCell>{time || "-"}</TableCell>
                  <TableCell className="max-w-[100px] xl:max-w-[200px]" textClassName="truncate">
                    {formatEnderecoFromOrdemServico(os)}
                  </TableCell>
                  <TableCell className="text-brand-secondary-medium">
                    <b>{formatCurrency(os.valor)}</b>
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="size-md" />
                  </TableCell>
                </TableRow>
              );
            })}
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
