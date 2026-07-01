import { useState, useEffect, useCallback } from "react";
import { Body2, H1 } from "@/atomic/atm.typography";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";
import { OrdensServicoTable } from "@/pages/admin/ordens-servico/components/OrdensServicoTable";
import { serverRequest } from "@/rest/server-request";
import { useDebounce } from "@/hooks/use-debounce";


const getTipoServicoFromSearch = (search: string) => {
  const normalized = search.toLowerCase().trim();
  if (normalized.includes("sanitiza")) return "SANITIZACAO";
  if (normalized.includes("praga") || normalized.includes("vetor")) return "CONTROLE_PRAGAS_VETORES";
  if (normalized.includes("higieniza")) return "HIGIENIZACAO";
  if (normalized.includes("inseto")) return "MONITORAMENTO_INSETOS";
  if (normalized.includes("roedor")) return "MONITORAMENTO_ROEDORES";
  
  return "";
};

const Servicos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchServicos = useCallback(async () => {
    setIsLoading(true);
    try {
      const offset = (currentPage - 1) * limit;
      
      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      params.append("offset", offset.toString());
      params.append("status", "CONCLUIDO");
      
      const mappedTipoServico = debouncedSearchTerm ? getTipoServicoFromSearch(debouncedSearchTerm) : "";
      if (mappedTipoServico) {
        params.append("tipoServico", mappedTipoServico);
      }
      
      const response = await serverRequest.get(`/tecnico/agenda?${params.toString()}`);

      if (response.data.success) {
        const data = response.data.data;
        const items = Array.isArray(data) ? data : (data.content || data.items || []);
        
        // Pass the raw items because OrdensServicoTable expects the exact API format
        setOrdensServico(items as OrdemServico[]);
        
        const total = data.totalPages || data.totalElements ? Math.ceil(data.totalElements / limit) : 1;
        setTotalPages(total > 0 ? total : 1);
      }
    } catch (error) {
      console.error("Failed to fetch servicos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit, debouncedSearchTerm]);

  useEffect(() => {
    fetchServicos();
  }, [fetchServicos]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const filteredOrdens = ordensServico.filter((os) => {
    if (!debouncedSearchTerm) return true;
    const tipo = (os.tipoServico || "").replace(/_/g, " ");
    return tipo.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
  });

  return (
    <MainLayout>
      <div className="flex flex-col gap-xl">
        {/* Header Section */}
        <div className="flex flex-col gap-xs">
          <H1>Serviços</H1>
          <Body2 className="text-muted-foreground">Serviços executados por você</Body2>
        </div>

        {/* Filters Section */}
        <div className="flex justify-start">
          <SearchInput
            placeholder="Buscar por serviço..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="w-full md:max-w-[400px]"
          />
        </div>

        {/* Table Section */}
        <OrdensServicoTable 
          ordensServico={filteredOrdens} 
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          disableClick={true}
        />
      </div>
    </MainLayout>
  );
};

export default Servicos;
