import { Building2, Plus, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import api from "@/services/api";
import { AddClienteDialog } from "./components/AddClienteDialog";
import { ClientesTable } from "./components/ClientesTable";

export type Cliente = {
  id: string;
  nome: string;
  cpfCnpj: string;
  tipoCliente: "fixo" | "esporadico";
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  status: "ativo" | "inativo";
  datacadastro: Date;
  ultimoServico?: Date;
  observacoes?: string;
};

const Clientes = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const fetchClientes = async (pageIndex = 0) => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/admin/clientes?page=${pageIndex}&size=20`);

      let content = [];
      let totalPagesVal = 1;
      let totalElementsVal = 0;

      if (Array.isArray(data)) {
        content = data;
        totalElementsVal = data.length;
      } else if (data.content) {
        content = data.content;
        totalPagesVal = data.totalPages;
        totalElementsVal = data.totalElements;
      }

      const mappedClientes: Cliente[] = content.map((item: any) => {
        const [cidade, estado] = item.local ? item.local.split("/") : ["", ""];

        return {
          id: item.id,
          nome: item.nome,
          cpfCnpj: item.cpfCnpj,
          tipoCliente: item.tipoCliente === "RECORRENTE" ? "fixo" : "esporadico",
          email: item.email,
          telefone: item.telefone,
          endereco: "",
          cidade: cidade || "",
          estado: estado || "",
          cep: "",
          status: "ativo",
          datacadastro: new Date(),
          ultimoServico: undefined,
        };
      });

      setClientes(mappedClientes);
      setTotalPages(totalPagesVal);
      setTotalElements(totalElementsVal);
      setPage(pageIndex);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      toast.error("Erro ao carregar clientes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes(0);
  }, []);

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpfCnpj.includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddCliente = async (payload: any) => {
    try {
      setIsLoading(true);
      await api.post("/admin/cadastrar-cliente", payload);
      toast.success("Cliente cadastrado com sucesso!");
      setIsDialogOpen(false);
      fetchClientes(page);
      return true;
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      toast.error("Erro ao cadastrar cliente");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const totalClientes = totalElements || clientes.length;
  const clientesAtivos = clientes.filter((c) => c.status === "ativo").length;
  const clientesFixos = clientes.filter((c) => c.tipoCliente === "fixo").length;
  const clientesEsporadicos = clientes.filter((c) => c.tipoCliente === "esporadico").length;

  const stats = [
    {
      title: "Total de Clientes",
      value: totalClientes,
      icon: Users,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Clientes Ativos",
      value: clientesAtivos,
      icon: UserCheck,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Clientes Fixos",
      value: clientesFixos,
      icon: Building2,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
    {
      title: "Clientes Esporádicos",
      value: clientesEsporadicos,
      icon: Users,
      color: "text-brand-primary-medium",
      bgColor: "bg-brand-cta-light",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col self-start gap-xs">
          <H1>Clientes</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Gerencie sua base de clientes fixos e esporádicos
          </Body1>
        </div>

        <div className="flex flex-col gap-md">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                      </div>
                      <div className={`rounded-full ${stat.bgColor} p-3`}>
                        <Icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col gap-md">
            <div className="flex items-center justify-between">
              <SearchInput />
              <Button onClick={() => setIsDialogOpen(true)} size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Novo Cliente
              </Button>
            </div>
            <CardContent className="p-0">
              <ClientesTable
                clientes={filteredClientes}
                currentPage={page + 1}
                totalPages={totalPages}
                onPageChange={(p) => fetchClientes(p - 1)}
              />
            </CardContent>
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
