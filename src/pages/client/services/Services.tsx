import { ListFilter } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Body2, H1 } from "@/atomic/atm.typography";
import { FilterDropdown } from "@/atomic/mol.filter-dropdown";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { SchedulingList } from "@/atomic/obj.scheduling-list";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { useGetUltimosServicosPortal } from "@/domain/cliente";
import { useAuthStore } from "@/store/auth";
import { formatTipoServico, TIPO_SERVICO_LABELS } from "@/utils/formatters";

const ITEMS_PER_PAGE = 10;

const mapStatusToCard = (
  statusApi?: string | null,
): "Em Andamento" | "Agendada" | "Concluída" | "Cancelada" => {
  if (!statusApi) return "Concluída"; // fallback para o padrão original
  const s = statusApi.toLowerCase();
  if (s.includes("agendado") || s.includes("agendada")) return "Agendada";
  if (s.includes("andamento") || s.includes("aguardo")) return "Em Andamento";
  if (s.includes("concluido") || s.includes("concluida")) return "Concluída";
  if (s.includes("cancelado") || s.includes("cancelada")) return "Cancelada";
  return "Concluída";
};

const Services = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const matchedTipoServico = useMemo(() => {
    if (!searchTerm) return "Todos";
    const lowerTerm = searchTerm.toLowerCase();
    const match = Object.entries(TIPO_SERVICO_LABELS).find(([, label]) =>
      label.toLowerCase().includes(lowerTerm),
    );
    return match ? match[0] : "INVALID_SEARCH";
  }, [searchTerm]);

  const { ultimosServicos, pagination, isGetUltimosServicosLoading } = useGetUltimosServicosPortal({
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
    status: statusFilter !== "Todos" ? statusFilter : undefined,
    tipoServico:
      matchedTipoServico !== "Todos" && matchedTipoServico !== "INVALID_SEARCH"
        ? matchedTipoServico
        : undefined,
  });

  const rawMappedServices = ultimosServicos.map(
    (servico: (typeof ultimosServicos)[0] & { status?: string }) => {
      let formattedTime = "--/--/----";
      if (servico.dataHoraAgendamento) {
        const date = new Date(servico.dataHoraAgendamento);
        formattedTime =
          date.toLocaleDateString("pt-BR") +
          " às " +
          date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      }

      return {
        id: servico.id ?? "",
        time: formattedTime,
        title: formatTipoServico(servico.tipoServico),
        status: mapStatusToCard(servico.status),
        clientName: user?.nomeCompleto ?? "Cliente",
        phone: "",
        address: `${servico.rua ?? ""}, ${servico.numero ?? ""} - ${servico.bairro ?? ""}`.replace(
          /^, | - $/g,
          "",
        ),
      };
    },
  );

  const mappedServices = matchedTipoServico === "INVALID_SEARCH" ? [] : rawMappedServices;
  const totalPages =
    matchedTipoServico === "INVALID_SEARCH"
      ? 1
      : pagination?.totalPages
        ? Math.max(1, pagination.totalPages)
        : 1;

  const handleStatusFilterChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-xl">
        <div className="flex flex-col gap-xs">
          <H1>Últimos Serviços</H1>
          <Body2 className="text-muted-foreground">Visualize todos os seus agendamentos</Body2>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-between gap-md">
          <SearchInput
            placeholder="Buscar por nome do serviço..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:max-w-[400px] [&_input]:bg-transparent"
          />

          <div className="space-y-2 w-full md:w-auto">
            <FilterDropdown
              icon={<ListFilter className="size-md" />}
              options={[
                { label: "Todos", value: "Todos" },
                { label: "Agendada", value: "AGENDADA" },
                { label: "Em Andamento", value: "EM_ANDAMENTO" },
                { label: "Concluída", value: "CONCLUIDA" },
                { label: "Cancelada", value: "CANCELADA" },
              ]}
              value={statusFilter}
              onChange={handleStatusFilterChange}
              placeholder="Status"
              className="min-w-[175px] [&_button]:bg-transparent"
            />
          </div>
        </div>

        {isGetUltimosServicosLoading ? (
          <p>Carregando serviços...</p>
        ) : mappedServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-foreground">Nenhum serviço encontrado</p>
            <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-lg pb-xl">
            <SchedulingList
              items={mappedServices}
              onItemClick={(id) => {
                const selectedService = ultimosServicos.find((s) => s.id === id);
                navigate(ROUTES.CLIENT_SERVICES_DETAILS.replace(":id", id), {
                  state: { servico: selectedService },
                });
              }}
            />

            {totalPages > 1 && (
              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-xl self-center"
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Services;
