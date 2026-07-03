import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { formatTecnicosLabel } from "./ordem-servico-detalhes/ordem-servico-detalhes.utils";

const ORDENS_SERVICO_TABLE_COLUMNS = [
  "N O.S.",
  "Cliente",
  "Serviço",
  "Técnico",
  "Data",
  "Horário",
  "Endereço",
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
  disableClick?: boolean;
  hideValor?: boolean;
}

export const OrdensServicoTable = ({
  ordensServico,
  currentPage,
  totalPages,
  isLoading,
  error,
  onPageChange,
  disableClick,
  hideValor,
}: OrdensServicoTableProps) => {
  const navigate = useNavigate();
  const resolvedTotalPages = totalPages ?? 1;
  const isMobile = useIsMobile();

  return (
    <LoadingState loading={isLoading} error={error} data={ordensServico.length > 0}>
      <LoadingState.Shimmer>
        <TableSkeleton columns={hideValor ? ORDENS_SERVICO_TABLE_COLUMNS.filter(c => c !== "Valor") : ORDENS_SERVICO_TABLE_COLUMNS} />
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

      <div className={cn("rounded-xs", !isMobile && "border border-border p-lg")}>
                {isMobile ? (
        <div className="flex flex-col gap-4">
          {ordensServico.map((os) => {
            const { date, time } = parseDateTime(os.dataHoraAgendamento);
            return (
              <div
                key={os.id}
                className={cn(
                  "flex flex-col gap-2 rounded-md border border-border p-4 bg-background shadow-sm",
                  !disableClick && "cursor-pointer active:bg-grayscale-x-light"
                )}
                onClick={() =>
                  !disableClick && navigate(ROUTES.ADMIN.SERVICE_ORDER.DETAILS.replace(":id", os.id ?? ""))
                }
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-foreground text-base">{formatTipoServico(os.tipoServico)}</span>
                  {!hideValor && <span className="text-brand-secondary-medium font-bold text-base">{formatCurrency(os.valor)}</span>}
                </div>
                
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span className="text-muted-foreground">{date ? format(date, "dd/MM/yyyy") : "-"} às {time || "-"}</span>
                </div>
                
                {!disableClick && (
                   <div className="mt-2 flex justify-center w-full pt-3 border-t border-border/50">
                      <span className="text-xs text-brand-secondary-medium font-medium flex items-center">
                         Ver Detalhes <ChevronRight className="size-4 ml-1" />
                      </span>
                   </div>
                )}
              </div>
            );
          })}
        </div>
) : (
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
              {!hideValor && <TableHead>Valor</TableHead>}
              {!disableClick && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordensServico.map((os) => {
              const { date, time } = parseDateTime(os.dataHoraAgendamento);

              return (
                <TableRow
                  key={os.id}
                  className={disableClick ? "" : "cursor-pointer"}
                  onClick={() =>
                    !disableClick && navigate(ROUTES.ADMIN.SERVICE_ORDER.DETAILS.replace(":id", os.id ?? ""))
                  }
                >
                  <TableCell className="text-grayscale-x-dark">
                    {formatOsNumero(os.osNumero)}
                  </TableCell>
                  <TableCell>{os.clienteNome ?? "-"}</TableCell>
                  <TableCell>{formatTipoServico(os.tipoServico)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatTecnicosLabel(os.tecnicos)}
                  </TableCell>
                  <TableCell>{date ? format(date, "dd/MM/yyyy") : "-"}</TableCell>
                  <TableCell>{time || "-"}</TableCell>
                  <TableCell className="max-w-[100px] xl:max-w-[200px]" textClassName="truncate">
                    {formatEnderecoFromOrdemServico(os)}
                  </TableCell>
                  {!hideValor && (
                    <TableCell className="text-brand-secondary-medium">
                      <b>{formatCurrency(os.valor)}</b>
                    </TableCell>
                  )}
                  {!disableClick && (
                    <TableCell>
                      <ChevronRight className="size-md" />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
)}

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
