import { PencilSquareIcon } from "@/assets/icons/pencil-square";
import { TrashIcon } from "@/assets/icons/trash";
import { Avatar, AvatarFallback, AvatarImage } from "@/atomic/atm.avatar/avatar.component";
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
import type { Tecnico } from "@/model/rest/tecnico";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";

interface TecnicosTableProps {
  tecnicos: Tecnico[];
  currentPage: number;
  totalPages?: number;
  isLoading?: boolean;
  error?: boolean;
  onPageChange: (page: number) => void;
  onEdit: (tecnico: Tecnico) => void;
  onDelete: (tecnico: Tecnico) => void;
}

const TECNICOS_TABLE_COLUMNS = ["Tecnico", "CPF", "Contato", "E-mail", null];

export const TecnicosTable = ({
  tecnicos,
  currentPage,
  totalPages,
  isLoading,
  error,
  onPageChange,
  onEdit,
  onDelete,
}: TecnicosTableProps) => {
  const resolvedTotalPages = totalPages ?? 1;

  return (
    <LoadingState loading={isLoading} error={error} data={tecnicos.length > 0}>
      <LoadingState.Shimmer>
        <TableSkeleton columns={TECNICOS_TABLE_COLUMNS} />
      </LoadingState.Shimmer>

      <LoadingState.Error>
        <div className="text-center py-12">
          <p className="text-lg font-medium text-foreground">Erro ao carregar técnicos</p>
          <p className="text-sm text-muted-foreground mt-1">Tente recarregar a página</p>
        </div>
      </LoadingState.Error>

      <LoadingState.NoData>
        <div className="text-center py-12">
          <p className="text-lg font-medium text-foreground">Nenhum técnico encontrado</p>
          <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
        </div>
      </LoadingState.NoData>

      <div className="flex flex-col gap-xs rounded-md border border-border p-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Técnico</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tecnicos.map((tecnico) => (
              <TableRow key={tecnico.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={tecnico.fotoUrl} alt={tecnico.nome} />
                      <AvatarFallback>{tecnico.nome?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{tecnico.nome}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatCPFCNPJ(tecnico.cpf ?? "")}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {tecnico.contato ? formatPhone(tecnico.contato) : "-"}
                </TableCell>
                <TableCell className="text-muted-foreground">{tecnico.email}</TableCell>
                <TableCell className="max-w-[70px] text-right">
                  <div className="flex justify-end gap-md">
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => onEdit(tecnico)}
                    >
                      <PencilSquareIcon
                        title="Editar"
                        className="text-grayscale-dark hover:text-grayscale-x-dark"
                      />
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => onDelete(tecnico)}
                    >
                      <TrashIcon
                        title="Excluir"
                        className="text-feedback-error-medium hover:text-feedback-error-dark"
                      />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {resolvedTotalPages > 1 && (
          <PaginationControl
            currentPage={currentPage}
            totalPages={resolvedTotalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </LoadingState>
  );
};
