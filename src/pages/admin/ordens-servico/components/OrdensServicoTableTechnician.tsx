import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit, Eye, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/atomic/mol.dropdown-menu/dropdown-menu.component";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import { ROUTES } from "@/constants/routes";
import type { OrdemServicoMock } from "@/model/rest/ordem-servico/ordem-servico.mock.model";

interface OrdensServicoTableTechnicianProps {
  ordensServico: OrdemServicoMock[];
}

const tipoServicoLabels: Record<OrdemServicoMock["tipoServico"], string> = {
  dedetizacao: "Dedetização",
  limpeza_caixa: "Limpeza de Caixa D'água",
  sanitizacao: "Sanitização",
  desratizacao: "Desratização",
  outro: "Outro",
};

export const OrdensServicoTableTechnician = ({
  ordensServico,
}: OrdensServicoTableTechnicianProps) => {
  const navigate = useNavigate();

  if (ordensServico.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-foreground">Nenhuma ordem de serviço encontrada</p>
        <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border p-md">
      {/* View Desktop: Tabela Padrão */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº O.S.</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Endereço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordensServico.map((os) => (
              <TableRow
                key={os.id}
                className="cursor-pointer"
                onClick={() => navigate(ROUTES.TECHNICIAN_SCHEDULING_DETAILS.replace(":id", os.id))}
              >
                <TableCell className="font-medium">{os.numeroOS}</TableCell>
                <TableCell>{os.cliente.nome}</TableCell>
                <TableCell>{tipoServicoLabels[os.tipoServico]}</TableCell>
                <TableCell>{format(os.dataAgendamento, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                <TableCell>{os.horaAgendamento}</TableCell>
                <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm">
                  {os.endereco}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Mobile: Cards Empilhados */}
      <div className="flex flex-col gap-md md:hidden">
        {ordensServico.map((os) => (
          <div
            key={os.id}
            className="p-md border border-grayscale-light rounded-small bg-background flex flex-col gap-2 cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => navigate(ROUTES.TECHNICIAN_SCHEDULING_DETAILS.replace(":id", os.id))}
          >
            <div className="flex justify-between items-start">
              <span className="font-bold text-brand-secondary-medium">{os.numeroOS}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xxs text-grayscale-medium uppercase font-bold">Cliente</span>
              <span className="text-sm font-bold text-grayscale-x-dark">{os.cliente.nome}</span>
            </div>

            <div className="grid grid-cols-2 gap-md mt-1">
              <div className="flex flex-col">
                <span className="text-xxs text-grayscale-medium uppercase font-bold">Serviço</span>
                <span className="text-sm">{tipoServicoLabels[os.tipoServico]}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xxs text-grayscale-medium uppercase font-bold">
                  Data/Hora
                </span>
                <span className="text-sm">
                  {format(os.dataAgendamento, "dd/MM", { locale: ptBR })} - {os.horaAgendamento}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xxs text-grayscale-medium uppercase font-bold">Endereço</span>
              <span className="text-sm text-grayscale-dark line-clamp-2">{os.endereco}</span>
            </div>
          </div>
        ))}
      </div>

      <PaginationControl className="mt-xs" currentPage={1} totalPages={3} />
    </div>
  );
};
