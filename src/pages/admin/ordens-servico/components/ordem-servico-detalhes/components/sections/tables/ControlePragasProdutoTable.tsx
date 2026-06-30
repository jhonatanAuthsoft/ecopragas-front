import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { DadosProduto } from "@/model/rest/ordem-servico";
import { buildDetailRowKey } from "../variation-detail.utils";

interface ControlePragasProdutoTableProps {
  produtos?: DadosProduto[];
}

export function ControlePragasProdutoTable({ produtos }: ControlePragasProdutoTableProps) {
  if (!produtos?.length) {
    return null;
  }

  return (
    <div className="px-lg py-md rounded-medium border border-grayscale-light overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Princípio ativo</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Concentração</TableHead>
            <TableHead>Diluente</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead>Equipamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produtos.map((item) => (
            <TableRow
              key={buildDetailRowKey(
                "produto",
                item.principioAtivo,
                item.produto,
                item.setor,
                item.equipamento,
              )}
            >
              <TableCell className="text-grayscale-x-dark">{item.principioAtivo}</TableCell>
              <TableCell>{item.produto}</TableCell>
              <TableCell>{item.concentracao}</TableCell>
              <TableCell>{item.diluente}</TableCell>
              <TableCell>{item.volume}</TableCell>
              <TableCell>{item.setor}</TableCell>
              <TableCell>{item.equipamento}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControl className="mt-xs" currentPage={1} totalPages={1} onPageChange={() => {}} />
    </div>
  );
}
