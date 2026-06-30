import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { ReservatorioItem } from "@/model/rest/ordem-servico";
import { buildDetailRowKey, formatBoolean } from "../variation-detail.utils";

interface ReservatoriosTableProps {
  reservatorios?: ReservatorioItem[];
}

export function ReservatoriosTable({ reservatorios }: ReservatoriosTableProps) {
  if (!reservatorios?.length) {
    return null;
  }

  return (
    <div className="px-lg py-md rounded-medium border border-grayscale-light overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reservatório</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Volume (L)</TableHead>
            <TableHead>Desinfecção</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead>Vetores</TableHead>
            <TableHead>Resíduos</TableHead>
            <TableHead>Fendas</TableHead>
            <TableHead>Boia</TableHead>
            <TableHead>Cobertura</TableHead>
            <TableHead>Pintura</TableHead>
            <TableHead>Revestimento interno</TableHead>
            <TableHead>Sistema ladrão</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservatorios.map((item) => (
            <TableRow
              key={buildDetailRowKey("reservatorio", item.reservatorio, item.material, item.volume)}
            >
              <TableCell className="min-w-[160px] text-grayscale-x-dark">
                {item.reservatorio}
              </TableCell>
              <TableCell className="min-w-[120px]">{item.material}</TableCell>
              <TableCell>{item.volume}</TableCell>
              <TableCell>{item.desinfeccao}</TableCell>
              <TableCell>{item.situacao}</TableCell>
              <TableCell>{formatBoolean(item.vetores)}</TableCell>
              <TableCell>{formatBoolean(item.residuos)}</TableCell>
              <TableCell>{formatBoolean(item.fendas)}</TableCell>
              <TableCell>{item.boia}</TableCell>
              <TableCell>{item.cobertura}</TableCell>
              <TableCell>{item.pintura}</TableCell>
              <TableCell className="min-w-[160px]">{item.revestimentoInterno}</TableCell>
              <TableCell>{formatBoolean(item.sistemaLadrao)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControl className="mt-xs" currentPage={1} totalPages={1} onPageChange={() => {}} />
    </div>
  );
}
