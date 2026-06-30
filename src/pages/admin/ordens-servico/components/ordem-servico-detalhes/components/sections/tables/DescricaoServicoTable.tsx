import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { DescricaoServicoItem } from "@/model/rest/ordem-servico";
import { buildDetailRowKey } from "../variation-detail.utils";

interface DescricaoServicoTableProps {
  descricaoServico?: DescricaoServicoItem[];
}

export function DescricaoServicoTable({ descricaoServico }: DescricaoServicoTableProps) {
  if (!descricaoServico?.length) {
    return null;
  }

  return (
    <div className="px-lg py-md rounded-medium border border-grayscale-light">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Setor</TableHead>
            <TableHead>Higiene local</TableHead>
            <TableHead>Nível de infestação</TableHead>
            <TableHead>Equipamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {descricaoServico.map((item) => (
            <TableRow
              key={buildDetailRowKey(
                "descricao",
                item.setor,
                item.higieneLocal,
                item.nivelInfestacao,
                item.equipamento,
              )}
            >
              <TableCell className="text-grayscale-x-dark">{item.setor}</TableCell>
              <TableCell>{item.higieneLocal}</TableCell>
              <TableCell>{item.nivelInfestacao}</TableCell>
              <TableCell>{item.equipamento}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControl className="mt-xs" currentPage={1} totalPages={1} onPageChange={() => {}} />
    </div>
  );
}
