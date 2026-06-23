import { useState } from "react";
import { Body2, H1 } from "@/atomic/atm.typography";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { OrdensServicoTable } from "@/pages/admin/ordens-servico/components/OrdensServicoTable";
import type { OrdemServico } from "@/pages/admin/ordens-servico/OrdensServico";

const Servicos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // MOCK: Dados idênticos ao do admin para manter a consistência
  const [ordensServico] = useState<OrdemServico[]>([
    {
      id: "1",
      numeroOS: "OS-2025-001",
      clienteId: "c1",
      clienteNome: "Restaurante Bom Sabor",
      tipoServico: "dedetizacao",
      tecnicoId: "t1",
      tecnicoNome: "Carlos Silva",
      dataAgendamento: new Date("2025-01-15"),
      horaAgendamento: "09:00",
      endereco: "Rua das Flores, 123 - São Paulo/SP",
      status: "concluida",
      dataConclusao: new Date("2025-01-15"),
      valorServico: 450,
    },
    {
      id: "2",
      numeroOS: "OS-2025-002",
      clienteId: "c2",
      clienteNome: "Padaria Pão Quente",
      tipoServico: "limpeza_caixa",
      tecnicoId: "t2",
      tecnicoNome: "João Santos",
      dataAgendamento: new Date("2025-01-16"),
      horaAgendamento: "14:00",
      endereco: "Av. Principal, 456 - São Paulo/SP",
      status: "em_andamento",
      valorServico: 300,
    },
    {
      id: "5",
      numeroOS: "OS-2025-005",
      clienteId: "c5",
      clienteNome: "Hotel Descanso",
      tipoServico: "dedetizacao",
      tecnicoId: "t2",
      tecnicoNome: "João Santos",
      dataAgendamento: new Date("2025-01-14"),
      horaAgendamento: "15:00",
      endereco: "Av. Turística, 999 - Guarujá/SP",
      status: "cancelada",
      valorServico: 800,
    },
  ]);

  const filteredOrdens = ordensServico.filter(
    (os) =>
      os.numeroOS.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            placeholder="Buscar por cliente ou OS..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="w-full md:max-w-[400px]"
          />
        </div>

        {/* Table Section - Reusing Admin Table with Technician View */}
        <OrdensServicoTable ordensServico={filteredOrdens} isTechnicianView />
      </div>
    </MainLayout>
  );
};

export default Servicos;
