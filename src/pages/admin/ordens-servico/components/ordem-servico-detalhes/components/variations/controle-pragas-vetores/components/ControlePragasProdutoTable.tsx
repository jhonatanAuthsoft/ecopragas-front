import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { OrdemServico } from "@/model/rest/ordem-servico";

interface ControlePragasProdutoTableProps {
  produtos?: OrdemServico["dadosProduto"]["controlePragasVetores"];
}

export function ControlePragasProdutoTable({ produtos }: ControlePragasProdutoTableProps) {
  return (
    <div className="px-lg py-md rounded-medium border border-grayscale-light">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Principio ativo</TableHead>
            <TableHead>Concentração</TableHead>
            <TableHead>Diluente</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead>Equipamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produtos?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-grayscale-x-dark">{item?.principioAtivo}</TableCell>
              <TableCell>{item?.concentracao}</TableCell>
              <TableCell>{item?.diluente}</TableCell>
              <TableCell>{item?.volume}</TableCell>
              <TableCell>{item?.setor}</TableCell>
              <TableCell>{item?.equipamento}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControl className="mt-xs" currentPage={1} totalPages={1} onPageChange={() => {}} />
    </div>
  );
}
