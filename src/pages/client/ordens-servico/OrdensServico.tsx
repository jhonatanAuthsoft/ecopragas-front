import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpRightFromSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Body1, H1 } from "@/atomic/atm.typography";
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
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
import { useGetHistoricoOsPortal, useVisualizarPdfOsPortal } from "@/domain/cliente";
import { formatTipoServico } from "@/utils/formatters";

const OrdensServico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | { start: Date; end: Date } | undefined>(
    undefined,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [dateFilter]);

  const { historicoOsData, isGetHistoricoOsLoading } = useGetHistoricoOsPortal({
    limit,
    offset: (currentPage - 1) * limit,
    periodo: dateFilter
      ? dateFilter instanceof Date
        ? format(dateFilter, "yyyy-MM-dd")
        : dateFilter.start && dateFilter.end
          ? `${format(dateFilter.start, "yyyy-MM-dd")},${format(dateFilter.end, "yyyy-MM-dd")}`
          : undefined
      : undefined,
  });

  const { mutateAsync: fetchPdf } = useVisualizarPdfOsPortal();

  const handleDownloadPdf = async (e: React.MouseEvent, id: string | undefined) => {
    e.stopPropagation();
    if (!id) return;
    try {
      const blob = await fetchPdf(id);

      const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `OS_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar PDF", error);
    }
  };

  const ordens = historicoOsData?.data ?? [];
  const pagination = historicoOsData?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  const filteredOrdens = ordens.filter((os) => {
    if (!searchTerm) return true;
    const matchesSearch =
      String(os.osNumero).includes(searchTerm) ||
      formatTipoServico(os.tipoServico).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (os.tecnicoResponsavel ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${os.rua ?? ""} ${os.numero ?? ""} ${os.bairro ?? ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesSearch;
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
              onChange={(val) => {
                if (val instanceof Date) setDateFilter(val);
                else if (val?.start && val?.end) setDateFilter(val);
                else setDateFilter(undefined);
              }}
              className="min-w-[180px] [&_button]:bg-transparent"
            />
          </div>
        </div>

        {/* Tabela */}
        {isGetHistoricoOsLoading ? (
          <p>Carregando ordens de serviço...</p>
        ) : filteredOrdens.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-foreground">
              Nenhuma ordem de serviço encontrada
            </p>
            <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <div className="flex flex-col gap-lg pb-xl">
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
                    <TableRow key={os.id}>
                      <TableCell className="text-grayscale-x-dark font-medium">
                        {os.osNumero}
                      </TableCell>
                      <TableCell className="text-grayscale-x-dark capitalize">
                        {formatTipoServico(os.tipoServico)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {os.tecnicoResponsavel}
                      </TableCell>
                      <TableCell>
                        {os.dataHoraServico
                          ? format(new Date(os.dataHoraServico), "dd/MM/yyyy", { locale: ptBR })
                          : "--/--/----"}{" "}
                        às{" "}
                        {os.dataHoraServico
                          ? format(new Date(os.dataHoraServico), "HH:mm")
                          : "--:--"}
                      </TableCell>
                      <TableCell
                        className="max-w-[120px] xl:max-w-[200px]"
                        textClassName="truncate"
                      >
                        {`${os.rua ?? ""}, ${os.numero ?? ""} - ${os.bairro ?? ""}`.replace(
                          /^, | - $/g,
                          "",
                        )}
                      </TableCell>
                      <TableCell>
                        <ArrowUpRightFromSquare
                          className="size-md text-brand-primary-medium hover:text-brand-primary-dark transition-colors cursor-pointer"
                          onClick={(e) => handleDownloadPdf(e, os.id)}
                        />
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
                className="self-center"
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default OrdensServico;
