import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpRightFromSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Body1, H1 } from "@/atomic/atm.typography";
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
import { SearchInput } from "@/atomic/mol.search/search.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import type { OrdemServico } from "@/model/rest/ordem-servico";
import { TIPO_SERVICO_LABELS } from "@/pages/admin/ordens-servico/components/ordem-servico-detalhes/ordem-servico-detalhes.labels";
import { OS_MOCKS } from "@/pages/admin/ordens-servico/ordens-servico.mock";

const OrdensServico = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  // TODO: substituir por dados da API quando disponível
  const ordensServico: OrdemServico[] = OS_MOCKS;

  const filteredOrdens = ordensServico.filter((os) => {
    const matchesSearch =
      os.numeroOS.toLowerCase().includes(searchTerm.toLowerCase()) ||
      TIPO_SERVICO_LABELS[os.tipoServico].toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.tecnicoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.endereco.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !dateFilter
      ? true
      : format(os.dataAgendamento, "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd");

    return matchesSearch && matchesDate;
  });

  return (
    <MainLayout>
      <div className="flex flex-col gap-xl">
        {/* Header */}
        <div className="flex flex-col self-start gap-xs">
          <H1>Ordens de Serviço</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Acompanhe todas as suas ordens de serviço
          </Body1>
        </div>

        {/* Busca e Filtros */}
        <div className="flex flex-col gap-md">
          <div className="flex flex-col md:flex-row items-end justify-between gap-md">
            <SearchInput
              placeholder="Buscar por Nº O.S., serviço ou técnico..."
              value={searchTerm}
              onChange={setSearchTerm}
              className="w-full md:max-w-[400px] [&_input]:bg-transparent"
            />
            <CalendarDropdown
              label="Período"
              value={dateFilter}
              onChange={(val) => setDateFilter(val instanceof Date ? val : undefined)}
              className="min-w-[180px] [&_button]:bg-transparent"
            />
          </div>
        </div>

        {/* Tabela */}
        {filteredOrdens.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-foreground">
              Nenhuma ordem de serviço encontrada
            </p>
            <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <div className="rounded-xs border border-border p-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº O.S.</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrdens.map((os) => (
                  <TableRow
                    key={os.id}
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(ROUTES.CLIENT_SERVICE_ORDER_DETAILS.replace(":id", os.id))
                    }
                  >
                    <TableCell className="text-grayscale-x-dark font-medium">
                      {os.numeroOS}
                    </TableCell>
                    <TableCell>{TIPO_SERVICO_LABELS[os.tipoServico]}</TableCell>
                    <TableCell className="text-muted-foreground">{os.tecnicoNome}</TableCell>
                    <TableCell>
                      {format(os.dataAgendamento, "dd/MM/yyyy", {
                        locale: ptBR,
                      })}{" "}
                      às {os.horaAgendamento}
                    </TableCell>
                    <TableCell className="max-w-[120px] xl:max-w-[200px]" textClassName="truncate">
                      {os.endereco}
                    </TableCell>
                    <TableCell>
                      <ArrowUpRightFromSquare className="size-md text-brand-primary-medium" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default OrdensServico;
