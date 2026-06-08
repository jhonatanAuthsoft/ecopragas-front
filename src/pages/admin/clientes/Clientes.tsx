import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { MOCK_CLIENTES } from "./clientes.mock";
import { AddClienteDialog } from "./components/AddClienteDialog";
import { ClientesMetrics } from "./components/ClientesMetrics";
import { ClientesTable } from "./components/ClientesTable";
import type { Cliente } from "./types";

const PAGE_SIZE = 5;

type InitialClienteData = {
  nome: string;
  email: string;
  telefone: string;
  observacoes: string;
};

type AddClientePayload = {
  dados: {
    nome: string;
    email: string;
    cpfCnpj: string;
    telefone: string;
    tipoCliente: string;
    observacoes?: string;
    status: string;
    enderecos?: Array<{
      logradouro?: string;
      cidade?: string;
      estado?: string;
      cep?: string;
      principal?: boolean;
    }>;
  };
};

const createClienteId = () => `cliente-${crypto.randomUUID()}`;

const Clientes = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>(MOCK_CLIENTES);
  const [initialData, setInitialData] = useState<InitialClienteData | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (location.state?.leadData) {
      const lead = location.state.leadData;
      setInitialData({
        nome: lead.name,
        email: lead.email || "",
        telefone: lead.phone,
        observacoes: lead.notes || "",
      });
      setIsDialogOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpfCnpj.includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalElements = filteredClientes.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));
  const paginatedClientes = filteredClientes.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleAddCliente = async (payload: AddClientePayload) => {
    const { dados } = payload;
    const enderecoPrincipal = dados.enderecos?.find((e) => e.principal) ?? dados.enderecos?.[0];

    const newCliente: Cliente = {
      id: createClienteId(),
      nome: dados.nome,
      cpfCnpj: dados.cpfCnpj,
      tipoCliente:
        dados.tipoCliente === "FIXO" || dados.tipoCliente === "RECORRENTE" ? "fixo" : "esporadico",
      email: dados.email,
      telefone: dados.telefone,
      endereco: enderecoPrincipal?.logradouro ?? "",
      cidade: enderecoPrincipal?.cidade ?? "",
      estado: enderecoPrincipal?.estado ?? "",
      cep: enderecoPrincipal?.cep ?? "",
      status: dados.status?.toLowerCase() === "inativo" ? "inativo" : "ativo",
      datacadastro: new Date(),
      observacoes: dados.observacoes,
    };

    setClientes((prev) => [newCliente, ...prev]);
    toast.success("Cliente cadastrado com sucesso!");
    setIsDialogOpen(false);
    return true;
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
          <ClientesMetrics clientes={clientes} totalElements={clientes.length} />

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
              clientes={paginatedClientes}
              currentPage={page + 1}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p - 1)}
            />
          </div>
        </div>

        <AddClienteDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddCliente={handleAddCliente}
          initialData={initialData}
        />
      </div>
    </MainLayout>
  );
};

export default Clientes;
