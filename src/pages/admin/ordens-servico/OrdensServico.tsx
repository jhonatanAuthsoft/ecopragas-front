import { Plus } from "lucide-react";
import { useState } from "react";
import { CheckCircleIcon } from "@/assets/icons/check-circle";
import { ClipboardDocumentListIcon } from "@/assets/icons/clipboard-document-list";
import { ClockIcon } from "@/assets/icons/clock";
import { ExclamationCircleIcon } from "@/assets/icons/exclamation-circle";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1, H2 } from "@/atomic/atm.typography";
import {
  Card,
  CardContent,
  CardSubtitle,
  CardTitleSecondary,
} from "@/atomic/mol.card/card.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { useListOrdensServico } from "@/domain/ordem-servico";
import { useDebounce } from "@/hooks/use-debounce";
import { AddOrdemServicoDialog } from "./components/add-ordem-servico-dialog";
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

  const currentPage = page + 1;
  const totalElements = pagination?.totalElements ?? 0;

  const stats: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    subtitle?: string;
  }[] = [
    {
      title: "Total de O.S.",
      value: totalElements,
      icon: ClipboardDocumentListIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
      subtitle: "com base na data atual",
    },
    {
      title: "Agendadas",
      value: "-",
      icon: ClockIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Em Andamento",
      value: "-",
      icon: ExclamationCircleIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Concluídas",
      value: "-",
      icon: CheckCircleIcon,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
  ];

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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardContent>
                    <CardTitleSecondary>{stat.title}</CardTitleSecondary>
                    <H2>{stat.value}</H2>
                    {stat.subtitle && (
                      <CardSubtitle className="text-grayscale-dark">{stat.subtitle}</CardSubtitle>
                    )}
                  </CardContent>

                  <div className={`rounded-full ${stat.bgColor} p-sm`}>
                    <Icon className={`size-lg ${stat.color}`} />
                  </div>
                </Card>
              );
            })}
          </div>

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
          existingOsCount={totalElements}
        />
      </div>
    </MainLayout>
  );
};

export default OrdensServico;
