import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronRight, ListFilter } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Body1, Body2, H1 } from "@/atomic/atm.typography";
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
import { FilterDropdown } from "@/atomic/mol.filter-dropdown";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
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
import { useGetAgendamentosPortal } from "@/domain/cliente";
import { formatTipoServico, getStatusBadgeClass } from "@/utils/formatters";

type AgendamentoStatus = "todas" | "agendada" | "em_andamento" | "concluida" | "cancelada";

const STATUS_LABELS: Record<AgendamentoStatus, string> = {
  todas: "Todas",
  agendada: "Agendada",
  em_andamento: "Em Andamento",
  concluida: "Concluída",
  cancelada: "Cancelada",
};

const STATUS_OPTIONS = (Object.entries(STATUS_LABELS) as [AgendamentoStatus, string][]).map(
  ([value, label]) => ({ value, label }),
);

const mapStatusDaApi = (statusApi: string): AgendamentoStatus => {
  if (!statusApi) return "agendada";
  const s = statusApi.toLowerCase();
  if (s.includes("agendado") || s.includes("agendada")) return "agendada";
  if (s.includes("andamento") || s.includes("aguardo")) return "em_andamento";
  if (s.includes("concluido") || s.includes("concluida")) return "concluida";
  if (s.includes("cancelado") || s.includes("cancelada")) return "cancelada";
  return "agendada";
};

const Agendamentos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<AgendamentoStatus>("todas");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchFilters = useMemo(() => {
    if (!debouncedSearchTerm) return {};
    
    const trimmed = debouncedSearchTerm.trim();
    const normalized = trimmed.toLowerCase();
    const serviceMap: Record<string, string> = {
      dedetizacao: "DEDETIZACAO",
      "dedetização": "DEDETIZACAO",
      "limpeza": "LIMPEZA_CAIXA_AGUA",
      "caixa": "LIMPEZA_CAIXA_AGUA",
      sanitizacao: "SANITIZACAO",
      "sanitização": "SANITIZACAO",
      desratizacao: "DESRATIZACAO",
      "desratização": "DESRATIZACAO",
      outros: "OUTROS",
    };

    for (const [key, value] of Object.entries(serviceMap)) {
      if (normalized.includes(key)) {
        return { servico: value };
      }
    }

    return { tecnico: trimmed };
  }, [debouncedSearchTerm]);

  const apiStatus = useMemo(() => {
    switch (statusFilter) {
      case "agendada": return "AGENDADO";
      case "em_andamento": return "EM_ANDAMENTO";
      case "concluida": return "CONCLUIDO";
      case "cancelada": return "CANCELADO";
      default: return undefined;
    }
  }, [statusFilter]);

  const { agendamentosData, isGetAgendamentosLoading } = useGetAgendamentosPortal({
    limit,
    offset: (currentPage - 1) * limit,
    servico: searchFilters.servico,
    tecnico: searchFilters.tecnico,
    status: apiStatus,
    dataHoraInicio: selectedDate ? new Date(selectedDate.setHours(0, 0, 0, 0)).toISOString() : undefined,
    dataHoraFim: selectedDate ? new Date(selectedDate.setHours(23, 59, 59, 999)).toISOString() : undefined,
  });

  const pagination = agendamentosData?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  const todosAgendamentos = useMemo(() => {
    if (!agendamentosData?.data) return [];

    return agendamentosData.data.map((item) => {
      const dataObj = item.dataHoraServico ? new Date(item.dataHoraServico) : null;
      return {
        id: item.id,
        servico: formatTipoServico(item.tipoServico),
        data: dataObj ? format(dataObj, "dd/MM/yyyy", { locale: ptBR }) : "--/--/----",
        horario: dataObj ? format(dataObj, "HH:mm") : "--:--",
        status: mapStatusDaApi(item.status ?? ""),
        tecnico: item.tecnicoResponsavel ?? "Não definido",
        dataOriginal: dataObj,
        rawApiData: item,
      };
    });
  }, [agendamentosData]);

  const filteredAgendamentos = todosAgendamentos;

  return (
    <MainLayout>
      <div className="flex flex-col gap-xl">
        <div className="flex flex-col self-start gap-xs">
          <H1>Agendamentos</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Acompanhe todos os seus agendamentos
          </Body1>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-between gap-md">
          <SearchInput
            placeholder="Buscar por serviço ou técnico..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="w-full md:max-w-[400px] [&_input]:bg-transparent"
          />
          <div className="flex items-end gap-md w-full md:w-auto">
            <FilterDropdown
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(val) => setStatusFilter(val as AgendamentoStatus)}
              placeholder="Status"
              icon={<ListFilter className="size-md" />}
              className="min-w-[175px] [&_button]:bg-transparent"
            />
            <CalendarDropdown
              label="Período"
              value={selectedDate}
              onChange={(val) => setSelectedDate(val instanceof Date ? val : undefined)}
              className="min-w-[180px] [&_button]:bg-transparent"
            />
          </div>
        </div>

        {isGetAgendamentosLoading ? (
          <p>Carregando agendamentos...</p>
        ) : filteredAgendamentos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-foreground">Nenhum agendamento encontrado</p>
            <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <>
            <div className="rounded-xs border border-border p-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgendamentos.map((agendamento) => (
                    <TableRow
                      key={agendamento.id}
                      className="cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() =>
                        navigate(
                          ROUTES.CLIENT_SCHEDULING_DETAILS.replace(":id", agendamento.id ?? ""),
                          { state: { agendamento: agendamento.rawApiData } },
                        )
                      }
                    >
                      <TableCell className="capitalize">{agendamento.servico}</TableCell>
                      <TableCell>{agendamento.data}</TableCell>
                      <TableCell>{agendamento.horario}</TableCell>
                      <TableCell>
                        <Badge className={`font-medium ${getStatusBadgeClass(agendamento.status)}`}>
                          {STATUS_LABELS[agendamento.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{agendamento.tecnico}</TableCell>
                      <TableCell>
                        <ChevronRight className="size-md text-brand-primary-medium" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {totalPages > 1 && (
              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="self-center mt-4"
              />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Agendamentos;
