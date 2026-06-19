import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { useGetClienteDashboard, useListClientes } from "@/domain/cliente";
import { useDebounce } from "@/hooks/use-debounce";
import { AddClienteDialog, type InitialClienteData } from "./components/add-cliente-dialog";
import { ClientesMetrics } from "./components/ClientesMetrics";
import { ClientesTable } from "./components/ClientesTable";

const PAGE_SIZE = 5;

const Clientes = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<InitialClienteData | null>(null);
  const [page, setPage] = useState(0);

  const { clientes, pagination, listClientesError, isListClientesLoading, refetchClientes } =
    useListClientes({
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      searchText: debouncedSearch.trim() || undefined,
    });

  const { dashboard, dashboardError, isDashboardLoading, refetchDashboard } =
    useGetClienteDashboard();

  useEffect(() => {
    if (location.state?.leadData) {
      const lead = location.state.leadData;
      setInitialData({
        nomeRazaoSocial: lead.name,
        email: lead.email || "",
        telefone: lead.phone,
        observacoes: lead.notes || "",
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
            <div className="flex items-center justify-between">
              <SearchInput
                placeholder="Buscar clientes, ordens de servico..."
                value={searchTerm}
                onChange={(value) => {
                  setSearchTerm(value);
                  setPage(0);
                }}
              />
              <Button
                onClick={() => setIsDialogOpen(true)}
                size="lg"
                leftIcon={<Plus className="size-md" />}
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
