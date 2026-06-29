import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { useGetOrdemServicoMetricas, useListOrdensServico } from "@/domain/ordem-servico";
import { useDebounce } from "@/hooks/use-debounce";
import { AddOrdemServicoDialog } from "./components/add-ordem-servico-dialog";
import { OrdensServicoMetrics } from "./components/OrdensServicoMetrics";
import { OrdensServicoTable } from "./components/OrdensServicoTable";

const PAGE_SIZE = 5;

const OrdensServico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);
  const [page, setPage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { ordensServico, pagination, listOrdensServicoError, isListOrdensServicoLoading } =
    useListOrdensServico({
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      searchText: debouncedSearch.trim() || undefined,
    });

  const { metricas, metricasError, isMetricasLoading } = useGetOrdemServicoMetricas();

  const currentPage = page + 1;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col self-start gap-xs">
          <H1>Ordens de Serviço</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Gerencie as ordens de serviço e acompanhe a execução
          </Body1>
        </div>

        <div className="flex flex-col gap-md">
          <OrdensServicoMetrics
            metricas={metricas}
            isLoading={isMetricasLoading}
            error={!!metricasError}
          />

          <div className="flex items-center justify-between">
            <SearchInput
              placeholder="Buscar por clientes, Nº O.S."
              value={searchTerm}
              onChange={(value) => {
                setSearchTerm(value);
                setPage(0);
              }}
            />
            <Button
              variant="primary"
              onClick={() => setIsDialogOpen(true)}
              size="lg"
              leftIcon={<Plus className="size-md" />}
            >
              Nova O.S.
            </Button>
          </div>

          <OrdensServicoTable
            ordensServico={ordensServico}
            currentPage={currentPage}
            totalPages={pagination?.totalPages ?? 1}
            isLoading={isListOrdensServicoLoading}
            error={!!listOrdensServicoError}
            onPageChange={(nextPage) => setPage(nextPage - 1)}
          />
        </div>

        <AddOrdemServicoDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddOrdemServico={() => setIsDialogOpen(false)}
          existingOsCount={metricas?.total ?? 0}
        />
      </div>
    </MainLayout>
  );
};

export default OrdensServico;
