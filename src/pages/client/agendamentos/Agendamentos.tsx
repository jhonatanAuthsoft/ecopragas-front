import { ChevronRight, ListFilter } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Body1, Body2, H1 } from "@/atomic/atm.typography";
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
import { FilterDropdown } from "@/atomic/mol.filter-dropdown";
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

type AgendamentoStatus = "todas" | "agendada" | "em_andamento" | "concluida" | "cancelada";

interface Agendamento {
  id: string;
  servico: string;
  data: string;
  horario: string;
  status: AgendamentoStatus;
  tecnico: string;
}

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

const getStatusBadgeClass = (status: AgendamentoStatus) => {
  switch (status) {
    case "agendada":
      return "bg-grayscale-light text-grayscale-dark border-grayscale-medium";
    case "em_andamento":
      return "bg-feedback-warning-light text-feedback-warning-dark border-brand-accessory-orange";
    case "concluida":
      return "bg-feedback-success-light text-feedback-success-dark border-feedback-success-medium";
    case "cancelada":
      return "bg-feedback-error-light text-feedback-error-dark border-feedback-error-medium";
  }
};

// TODO: substituir por dados da API quando disponível
const MOCK_AGENDAMENTOS: Agendamento[] = [
  {
    id: "1",
    servico: "Controle de Pragas e Vetores",
    data: "15/01/2026",
    horario: "08:00",
    status: "concluida",
    tecnico: "Carlos Silva",
  },
  {
    id: "2",
    servico: "Limpeza de caixa d'água",
    data: "22/01/2026",
    horario: "10:30",
    status: "em_andamento",
    tecnico: "Ana Oliveira",
  },
  {
    id: "3",
    servico: "Desinsetização",
    data: "05/02/2026",
    horario: "14:00",
    status: "agendada",
    tecnico: "Roberto Lima",
  },
  {
    id: "4",
    servico: "Higienização",
    data: "10/02/2026",
    horario: "16:00",
    status: "agendada",
    tecnico: "Carlos Silva",
  },
  {
    id: "5",
    servico: "Monitoramento de Insetos",
    data: "18/02/2026",
    horario: "09:00",
    status: "agendada",
    tecnico: "Ana Oliveira",
  },
  {
    id: "6",
    servico: "Monitoramento de Roedores",
    data: "25/02/2026",
    horario: "11:00",
    status: "cancelada",
    tecnico: "Roberto Lima",
  },
];

const Agendamentos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<AgendamentoStatus>("todas");

  const filteredAgendamentos = MOCK_AGENDAMENTOS.filter((item) => {
    const matchesSearch =
      item.servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tecnico.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !selectedDate
      ? true
      : item.data ===
        selectedDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

    const matchesStatus = statusFilter === "todas" || item.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="flex flex-col gap-xl">
        {/* Header */}
        <div className="flex flex-col self-start gap-xs">
          <H1>Agendamentos</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Acompanhe todos os seus agendamentos
          </Body1>
        </div>

        {/* Busca e Filtros */}
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

        {/* Tabela */}
        {filteredAgendamentos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-foreground">Nenhum agendamento encontrado</p>
            <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
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
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(ROUTES.CLIENT_SCHEDULING_DETAILS.replace(":id", agendamento.id))
                    }
                  >
                    <TableCell>{agendamento.servico}</TableCell>
                    <TableCell>{agendamento.data}</TableCell>
                    <TableCell>{agendamento.horario}</TableCell>
                    <TableCell>
                      <Badge className={`font-medium ${getStatusBadgeClass(agendamento.status)}`}>
                        {STATUS_LABELS[agendamento.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{agendamento.tecnico}</TableCell>
                    <TableCell>
                      <ChevronRight className="size-md" />
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

export default Agendamentos;
