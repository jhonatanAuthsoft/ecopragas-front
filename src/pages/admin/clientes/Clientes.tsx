import { Building2, Plus, Search, UserCheck, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import { AddClienteDialog } from "./components/AddClienteDialog";
import { ClientesTable } from "./components/ClientesTable";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: "1",
      nome: "Restaurante Bom Sabor",
      cpfCnpj: "12.345.678/0001-90",
      tipoCliente: "fixo",
      email: "contato@bomsabor.com",
      telefone: "(11) 98765-4321",
      endereco: "Rua das Flores, 123",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
      status: "ativo",
      datacadastro: new Date("2024-01-15"),
      ultimoServico: new Date("2025-01-10"),
    },
    {
      id: "2",
      nome: "Padaria Pão Quente",
      cpfCnpj: "98.765.432/0001-10",
      tipoCliente: "fixo",
      email: "padaria@paoquente.com",
      telefone: "(11) 97654-3210",
      endereco: "Av. Principal, 456",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-890",
      status: "ativo",
      datacadastro: new Date("2024-03-20"),
      ultimoServico: new Date("2025-01-08"),
    },
    {
      id: "3",
      nome: "Supermercado Central",
      cpfCnpj: "11.222.333/0001-44",
      tipoCliente: "fixo",
      email: "gerencia@central.com",
      telefone: "(11) 96543-2109",
      endereco: "Rua do Comércio, 789",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01235-123",
      status: "ativo",
      datacadastro: new Date("2023-11-10"),
      ultimoServico: new Date("2025-01-05"),
    },
    {
      id: "4",
      nome: "Ana Oliveira",
      cpfCnpj: "123.456.789-00",
      tipoCliente: "esporadico",
      email: "ana@email.com",
      telefone: "(11) 95432-1098",
      endereco: "Rua das Palmeiras, 321",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01236-456",
      status: "ativo",
      datacadastro: new Date("2024-12-05"),
      ultimoServico: new Date("2024-12-20"),
    },
    {
      id: "5",
      nome: "Hotel Descanso",
      cpfCnpj: "55.666.777/0001-88",
      tipoCliente: "fixo",
      email: "contato@hoteldescanso.com",
      telefone: "(11) 94321-0987",
      endereco: "Av. Turística, 999",
      cidade: "Guarujá",
      estado: "SP",
      cep: "11400-000",
      status: "inativo",
      datacadastro: new Date("2023-06-15"),
      ultimoServico: new Date("2024-11-30"),
    },
  ]);

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpfCnpj.includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddCliente = (cliente: Omit<Cliente, "id" | "datacadastro">) => {
    const newCliente: Cliente = {
      ...cliente,
      id: Date.now().toString(),
      datacadastro: new Date(),
    };
    setClientes([newCliente, ...clientes]);
    setIsDialogOpen(false);
  };

  const totalClientes = clientes.length;
  const clientesAtivos = clientes.filter((c) => c.status === "ativo").length;
  const clientesFixos = clientes.filter((c) => c.tipoCliente === "fixo").length;
  const clientesEsporadicos = clientes.filter((c) => c.tipoCliente === "esporadico").length;

  const stats = [
    {
      title: "Total de Clientes",
      value: totalClientes,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Clientes Ativos",
      value: clientesAtivos,
      icon: UserCheck,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Clientes Fixos",
      value: clientesFixos,
      icon: Building2,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Clientes Esporádicos",
      value: clientesEsporadicos,
      icon: Users,
      color: "text-info",
      bgColor: "bg-info/10",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie sua base de clientes fixos e esporádicos
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Novo Cliente
          </Button>
        </div>

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

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CPF/CNPJ ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ClientesTable clientes={filteredClientes} />
          </CardContent>
        </Card>

        <AddClienteDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddCliente={handleAddCliente}
        />
      </div>
    </MainLayout>
  );
};

export default Clientes;

