import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit, Eye, MoreVertical } from "lucide-react";
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
import type { OrdemServico } from "@/pages/admin/ordens-servico/OrdensServico";

interface OrdensServicoTableProps {
  ordensServico: OrdemServico[];
  isTechnicianView?: boolean;
}

const tipoServicoLabels: Record<OrdemServico["tipoServico"], string> = {
  dedetizacao: "Dedetização",
  limpeza_caixa: "Limpeza de Caixa D'água",
  sanitizacao: "Sanitização",
  desratizacao: "Desratização",
  outro: "Outro",
};

export const OrdensServicoTable = ({ ordensServico, isTechnicianView }: OrdensServicoTableProps) => {
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
              {!isTechnicianView && <TableHead>Técnico</TableHead>}
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Endereço</TableHead>
              {!isTechnicianView && <TableHead>Valor</TableHead>}
              {!isTechnicianView && <TableHead></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordensServico.map((os) => (
              <TableRow key={os.id}>
                <TableCell className="font-medium">{os.numeroOS}</TableCell>
                <TableCell>{os.clienteNome}</TableCell>
                <TableCell>{tipoServicoLabels[os.tipoServico]}</TableCell>
                {!isTechnicianView && <TableCell className="text-muted-foreground">{os.tecnicoNome}</TableCell>}
                <TableCell>{format(os.dataAgendamento, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                <TableCell>{os.horaAgendamento}</TableCell>
                <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm">
                  {os.endereco}
                </TableCell>
                {!isTechnicianView && (
                  <TableCell className="font-semibold text-brand-secondary-medium">
                    R$ {os.valorServico.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                )}
                {!isTechnicianView && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => (window.location.href = `/ordens-servico/${os.numeroOS}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Mobile: Cards Empilhados */}
      <div className="flex flex-col gap-md md:hidden">
        {ordensServico.map((os) => (
          <div key={os.id} className="p-md border border-grayscale-light rounded-small bg-background flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-bold text-brand-secondary-medium">{os.numeroOS}</span>
              {!isTechnicianView && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => (window.location.href = `/ordens-servico/${os.numeroOS}`)}>
                      <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-xxs text-grayscale-medium uppercase font-bold">Cliente</span>
              <span className="text-sm font-bold text-grayscale-x-dark">{os.clienteNome}</span>
            </div>

            <div className="grid grid-cols-2 gap-md mt-1">
              <div className="flex flex-col">
                <span className="text-xxs text-grayscale-medium uppercase font-bold">Serviço</span>
                <span className="text-sm">{tipoServicoLabels[os.tipoServico]}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xxs text-grayscale-medium uppercase font-bold">Data/Hora</span>
                <span className="text-sm">{format(os.dataAgendamento, "dd/MM", { locale: ptBR })} - {os.horaAgendamento}</span>
              </div>
            </div>

            {!isTechnicianView && (
              <div className="flex flex-col">
                <span className="text-xxs text-grayscale-medium uppercase font-bold">Técnico</span>
                <span className="text-sm">{os.tecnicoNome}</span>
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-xxs text-grayscale-medium uppercase font-bold">Endereço</span>
              <span className="text-sm text-grayscale-dark line-clamp-2">{os.endereco}</span>
            </div>

            {!isTechnicianView && (
              <div className="mt-2 pt-2 border-t border-grayscale-light flex justify-between items-center">
                <span className="text-xxs text-grayscale-medium uppercase font-bold">Valor</span>
                <span className="text-md font-bold text-brand-secondary-medium">
                  R$ {os.valorServico.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <PaginationControl className="mt-4" currentPage={1} totalPages={3} />
    </div>
  );
};
