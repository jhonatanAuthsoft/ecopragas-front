import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { OrdemServico } from "@/pages/admin/ordens-servico/OrdensServico";

interface ControleTableProps {
  controle: OrdemServico["estacoes"][number]["controle"];
}

export function ControleTable({ controle }: ControleTableProps) {
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
          {controle?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.produto}</TableCell>
              <TableCell>{item.quantidade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
