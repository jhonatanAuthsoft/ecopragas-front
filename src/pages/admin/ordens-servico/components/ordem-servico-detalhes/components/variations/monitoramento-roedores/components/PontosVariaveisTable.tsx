import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { OrdemServico } from "@/pages/admin/ordens-servico/OrdensServico";

interface PontosVariaveisTableProps {
  pontosVariaveis: OrdemServico["estacoes"][number]["pontosVariaveis"];
}

export function PontosVariaveisTable({ pontosVariaveis }: PontosVariaveisTableProps) {
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
          {pontosVariaveis?.map((item) => (
            <TableRow key={item.id}>
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
