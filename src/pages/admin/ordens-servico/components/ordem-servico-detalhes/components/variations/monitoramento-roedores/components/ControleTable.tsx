import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { EstacaoControle } from "@/model/rest/ordem-servico";
import { buildDetailRowKey } from "../../../sections/variation-detail.utils";

interface ControleTableProps {
  controle?: EstacaoControle[];
}

export function ControleTable({ controle }: ControleTableProps) {
  if (!controle?.length) {
    return null;
  }

  return (
    <div className="px-lg py-md rounded-medium border border-grayscale-light">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Quantidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {controle.map((item) => (
            <TableRow key={buildDetailRowKey("controle", item.produto, item.quantidade)}>
              <TableCell>{item.produto}</TableCell>
              <TableCell>{item.quantidade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
