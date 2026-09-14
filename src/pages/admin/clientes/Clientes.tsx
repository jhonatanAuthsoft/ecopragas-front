import { ListFilter, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { FilterDropdown } from "@/atomic/mol.filter-dropdown";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { useGetClienteDashboard, useListClientes } from "@/domain/cliente";
import { useDebounce } from "@/hooks/use-debounce";
import {
  isPeriodoSemServicoFilter,
  PERIODO_FILTER_ALL,
  PERIODO_SEM_SERVICO_OPTIONS,
  type PeriodoSemServicoFilter,
} from "./clientes.data";
import { AddClienteDialog, type InitialClienteData } from "./components/add-cliente-dialog";
import { ClientesMetrics } from "./components/ClientesMetrics";
import { ClientesTable } from "./components/ClientesTable";

const PAGE_SIZE = 5;

const Clientes = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);
  const [periodoFilter, setPeriodoFilter] = useState<PeriodoSemServicoFilter>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<InitialClienteData | null>(null);
  const [page, setPage] = useState(0);

  const periodoSemServicoRealizado =
    periodoFilter === PERIODO_FILTER_ALL ? undefined : periodoFilter;

  const { clientes, pagination, listClientesError, isListClientesLoading, refetchClientes } =
    useListClientes({
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      searchText: debouncedSearch.trim() || undefined,
      periodoSemServicoRealizado,
    });

  const { dashboard, dashboardError, isDashboardLoading, refetchDashboard } =
    useGetClienteDashboard();

  useEffect(() => {
    if (location.state?.leadData) {
      const lead = location.state.leadData;
      setInitialData({
        nomeRazaoSocial: lead.nome ?? "",
        email: lead.email ?? "",
        telefone: lead.telefone ?? "",
        observacoes: lead.observacoes ?? "",
      });
      setIsDialogOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const currentPage = page + 1;

  const handleClienteCreated = () => {
    setPage(0);
    refetchClientes();
    refetchDashboard();
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <div className="flex flex-col self-start gap-xs">
          <H1>Clientes</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Gerencie sua base de clientes fixos e esporádicos
          </Body1>
        </div>

        <div className="flex flex-col gap-md">
          <ClientesMetrics
            dashboard={dashboard}
            isLoading={isDashboardLoading}
            error={!!dashboardError}
          />

          <div className="flex flex-col gap-md">
            <div className="flex flex-col md:flex-row items-end justify-between gap-md">
              <div className="flex flex-row items-end gap-sm w-full md:flex-1 min-w-0">
                <SearchInput
                  className="min-w-0 flex-1 md:max-w-[400px]"
                  wrapperClassName="md:max-w-[400px]"
                  placeholder="Buscar clientes, ordens de serviço..."
                  value={searchTerm}
                  onChange={(value) => {
                    setSearchTerm(value);
                    setPage(0);
                  }}
                />
                <FilterDropdown
                  icon={<ListFilter className="size-md" />}
                  options={PERIODO_SEM_SERVICO_OPTIONS}
                  value={periodoFilter}
                  onChange={(value) => {
                    if (!isPeriodoSemServicoFilter(value)) return;
                    setPeriodoFilter(value);
                    setPage(0);
                  }}
                  placeholder="Período sem serviço realizado"
                  className="min-w-[240px]"
                  triggerClassName="h-[55px] shadow-none"
                />
              </div>

              <Button
                onClick={() => setIsDialogOpen(true)}
                size="lg"
                leftIcon={<Plus className="size-md" />}
                className="w-full md:w-auto shrink-0"
              >
                Novo Cliente
              </Button>
            </div>

            <ClientesTable
              clientes={clientes}
              currentPage={currentPage}
              totalPages={pagination?.totalPages ?? 1}
              isLoading={isListClientesLoading}
              error={!!listClientesError}
              onPageChange={(nextPage) => setPage(nextPage - 1)}
            />
          </div>
        </div>

        <AddClienteDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onClienteCreated={handleClienteCreated}
          initialData={initialData}
        />
      </div>
    </MainLayout>
  );
};

export default Clientes;
