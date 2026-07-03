import { endOfDay, format, startOfDay } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Body2, H1 } from "@/atomic/atm.typography";
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import type { SchedulingCardProps } from "@/atomic/obj.scheduling-card";
import { SchedulingList } from "@/atomic/obj.scheduling-list";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { useDebounce } from "@/hooks/use-debounce";
import { serverRequest } from "@/rest/server-request";
import { formatPhone, formatTipoServico } from "@/utils/formatters";

const getTipoServicoFromSearch = (search: string) => {
  const normalized = search.toLowerCase().trim();
  if (normalized.includes("sanitiza")) return "SANITIZACAO";
  if (normalized.includes("praga") || normalized.includes("vetor"))
    return "CONTROLE_PRAGAS_VETORES";
  if (normalized.includes("higieniza")) return "HIGIENIZACAO";
  if (normalized.includes("inseto")) return "MONITORAMENTO_INSETOS";
  if (normalized.includes("roedor")) return "MONITORAMENTO_ROEDORES";

  // If no known service matches, we don't send it to the API to avoid Enum validation errors
  return "";
};

const mapStatus = (status: string): SchedulingCardProps["status"] => {
  switch (status) {
    case "AGENDADO":
      return "Agendada";
    case "EM_ANDAMENTO":
      return "Em Andamento";
    case "CONCLUIDO":
      return "Concluída";
    case "CANCELADO":
      return "Cancelada";
    default:
      return "Agendada";
  }
};

const tipoServicoOptions = [
  { value: "", label: "Todos os Serviços" },
  { value: "SANITIZACAO", label: "Sanitização" },
  { value: "CONTROLE_PRAGAS_VETORES", label: "Controle de Pragas e Vetores" },
  { value: "HIGIENIZACAO", label: "Higienização" },
  { value: "MONITORAMENTO_INSETOS", label: "Monitoramento de Insetos" },
  { value: "MONITORAMENTO_ROEDORES", label: "Monitoramento de Roedores" },
];

const Agendamentos = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const [schedulings, setSchedulings] = useState<SchedulingCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchSchedulings = useCallback(async () => {
    setIsLoading(true);
    try {
      const offset = (currentPage - 1) * limit;

      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      params.append("offset", offset.toString());

      if (selectedDate) {
        params.append("dataHoraInicio", startOfDay(selectedDate).toISOString());
        params.append("dataHoraFim", endOfDay(selectedDate).toISOString());
      }

      const mappedTipoServico = debouncedSearchTerm
        ? getTipoServicoFromSearch(debouncedSearchTerm)
        : "";
      if (mappedTipoServico) {
        params.append("tipoServico", mappedTipoServico);
      }

      params.append("status", "AGENDADO");
      params.append("status", "EM_ANDAMENTO");

      const response = await serverRequest.get(`/tecnico/agenda?${params.toString()}`);

      if (response.data.success) {
        const data = response.data.data;
        // Assuming response might be paginated or array
        const items = Array.isArray(data) ? data : data.content || data.items || [];

        const formattedData: SchedulingCardProps[] = items.map((item: any) => ({
          id: item.id,
          time: format(new Date(item.dataHoraAgendamento), "HH:mm"),
          title: formatTipoServico(item.tipoServico),
          status: mapStatus(item.status),
          clientName: item.clienteNome,
          phone: item.clienteTelefone ? formatPhone(item.clienteTelefone) : "",
          address: `${item.rua}, ${item.numero} - ${item.bairro}, ${item.cidade} - ${item.estado}`,
        }));

        setSchedulings(formattedData);

        // Setup pagination based on response
        // Default to 1 if the backend doesn't return totalPages
        const total =
          data.totalPages || data.totalElements ? Math.ceil(data.totalElements / limit) : 1;
        setTotalPages(total > 0 ? total : 1);
      }
    } catch (error) {
      console.error("Failed to fetch schedulings:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit, selectedDate, debouncedSearchTerm]);

  useEffect(() => {
    fetchSchedulings();
  }, [fetchSchedulings]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, debouncedSearchTerm]);

  // API handles the tipoServico filter now, but we can keep local filter for clientName if API doesn't do it.
  const filteredSchedulings = schedulings.filter(
    (item) =>
      item.clientName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-xl">
        {/* Header Section */}
        <div className="flex flex-col gap-xs">
          <H1>Agendamentos</H1>
          <Body2 className="text-muted-foreground">Gerencie a agenda de serviços</Body2>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col gap-md">
          <div className="flex flex-col md:flex-row items-end justify-between gap-md">
            <SearchInput
              placeholder="Buscar por serviço..."
              value={searchTerm}
              onChange={setSearchTerm}
              className="w-full md:max-w-[400px]"
            />

            <div className="space-y-2 w-full md:w-auto">
              <CalendarDropdown
                value={selectedDate}
                onChange={setSelectedDate}
                label="Data do agendamento"
                maxDate={undefined}
                allowRange={false}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-md justify-end"></div>
        </div>

        {/* List Section */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Body2 className="text-muted-foreground">Carregando agendamentos...</Body2>
          </div>
        ) : filteredSchedulings.length > 0 ? (
          <div className="flex flex-col gap-md">
            <SchedulingList
              items={filteredSchedulings}
              onItemClick={(id) =>
                navigate(ROUTES.TECHNICIAN_SCHEDULING_DETAILS.replace(":id", id))
              }
            />

            {totalPages > 1 && (
              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-lg"
              />
            )}
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <Body2 className="text-muted-foreground">
              Nenhum agendamento encontrado para estes filtros.
            </Body2>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Agendamentos;
