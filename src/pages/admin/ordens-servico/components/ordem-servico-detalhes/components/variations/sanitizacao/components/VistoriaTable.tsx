import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { OrdemServicoMock } from "@/model/rest/ordem-servico/ordem-servico.mock.model";

interface VistoriaTableProps {
  vistoria?: OrdemServicoMock["vistoria"];
}

export function VistoriaTable({ vistoria }: VistoriaTableProps) {
  return (
    <div className="px-lg py-md rounded-medium border border-grayscale-light">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Setor</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead>Medida corretiva</TableHead>
            <TableHead>Avaliação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vistoria?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell className="text-grayscale-x-dark">{item?.setor}</TableCell>
              <TableCell>{item?.situacao}</TableCell>
              <TableCell>{item?.medidaCorretiva}</TableCell>
              <TableCell>{item?.avaliacao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControl className="mt-xs" currentPage={1} totalPages={1} onPageChange={() => {}} />
    </div>
  );
}
