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

interface ReservatoriosTableProps {
  reservatorios?: OrdemServicoMock["reservatorios"];
}

const formatBoolean = (value?: boolean) => {
  if (value === undefined) return "-";
  return value ? "Sim" : "Não";
};

export function ReservatoriosTable({ reservatorios }: ReservatoriosTableProps) {
  return (
    <div className="px-lg py-md rounded-medium border border-grayscale-light">
      <Table className="border-b border-grayscale-light mb-xs">
        <TableHeader>
          <TableRow>
            <TableHead>Reservatório</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Volume (L)</TableHead>
            <TableHead>Desinfecção (g)</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead>Vetores</TableHead>
            <TableHead>Resíduos</TableHead>
            <TableHead>Fendas</TableHead>
            <TableHead>Boia</TableHead>
            <TableHead>Cobertura</TableHead>
            <TableHead>Pintura</TableHead>
            <TableHead>Revestimento interno</TableHead>
            <TableHead>Sistema de ladrão</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservatorios?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell className="min-w-[200px] text-grayscale-x-dark">
                {item?.reservatorio}
              </TableCell>
              <TableCell className="min-w-[200px]">{item?.material}</TableCell>
              <TableCell className="min-w-[200px]">{item?.volume}</TableCell>
              <TableCell className="min-w-[200px]">{item?.desinfeccao}</TableCell>
              <TableCell className="min-w-[200px]">{item?.situacao}</TableCell>
              <TableCell className="min-w-[200px]">{formatBoolean(item?.vetores)}</TableCell>
              <TableCell className="min-w-[200px]">{formatBoolean(item?.residuos)}</TableCell>
              <TableCell className="min-w-[200px]">{formatBoolean(item?.fendas)}</TableCell>
              <TableCell className="min-w-[200px]">{item?.boia}</TableCell>
              <TableCell className="min-w-[200px]">{item?.cobertura}</TableCell>
              <TableCell className="min-w-[200px]">{item?.pintura}</TableCell>
              <TableCell className="min-w-[250px]">{item?.revestimentoInterno}</TableCell>
              <TableCell className="min-w-[225px]">{item?.sistemaDeLadrao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControl className="mt-xs" currentPage={1} totalPages={1} onPageChange={() => {}} />
    </div>
  );
}
