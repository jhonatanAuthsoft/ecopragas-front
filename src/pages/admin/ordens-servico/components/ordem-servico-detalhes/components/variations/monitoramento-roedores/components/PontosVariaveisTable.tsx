import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { EstacaoPontoVariavel } from "@/model/rest/ordem-servico";
import { buildDetailRowKey } from "../../../sections/variation-detail.utils";

interface PontosVariaveisTableProps {
  pontosVariaveis?: EstacaoPontoVariavel[];
}

export function PontosVariaveisTable({ pontosVariaveis }: PontosVariaveisTableProps) {
  if (!pontosVariaveis?.length) {
    return null;
  }

  return (
    <div className="px-lg py-md rounded-medium border border-grayscale-light">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Local</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Quantidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pontosVariaveis.map((item) => (
            <TableRow key={buildDetailRowKey("ponto", item.local, item.produto, item.quantidade)}>
              <TableCell>{item.local}</TableCell>
              <TableCell>{item.produto}</TableCell>
              <TableCell>{item.quantidade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
