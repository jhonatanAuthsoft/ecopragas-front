import { AlertCircle, CheckCircle2, Clock, DollarSign, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/atomic/mol.card/card.component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import { CobrancasTable } from "@/atomic/obj.cobrancas-table/cobrancas-table.component";
import { GerarCobrancaDialog } from "@/atomic/obj.gerar-cobranca-dialog/gerar-cobranca-dialog.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { useToast } from "@/hooks/use-toast";

// TODO: adicionar todas as tipagens na pasta de model (vai ser adicionado)
export interface Cobranca {
  id: string;
  ordem_servico_id: string;
  cliente_nome: string;
  valor: number;
  tipo_pagamento: "boleto" | "pix" | "cartao";
  status: "pendente" | "pago" | "vencido" | "cancelado";
  data_emissao: string;
  data_vencimento: string;
  data_pagamento?: string;
  codigo_barras?: string;
  pix_qrcode?: string;
  pix_copia_cola?: string;
  transaction_id?: string;
}

// TODO: possivelmente excluir, por inutilização
const Financeiro = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cobrancas, setCobrancas] = useState<Cobranca[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");
  const { toast } = useToast();

  const handleGerarCobranca = (
    cobranca: Omit<Cobranca, "id" | "data_emissao" | "created_at" | "updated_at">,
  ) => {
    const novaCobranca: Cobranca = {
      ...cobranca,
      id: crypto.randomUUID(),
      data_emissao: new Date().toISOString(),
    };

    setCobrancas((prev) => [novaCobranca, ...prev]);

    toast({
      title: "Cobrança gerada com sucesso",
      description: `Cobrança de ${cobranca.tipo_pagamento.toUpperCase()} criada para ${cobranca.cliente_nome}`,
    });

    setIsDialogOpen(false);
  };

  const handleMarcarPago = (id: string) => {
    setCobrancas((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "pago" as const, data_pagamento: new Date().toISOString() }
          : c,
      ),
    );

    toast({
      title: "Cobranca atualizada",
      description: "Cobranca marcada como paga com sucesso",
    });
  };

  const handleCancelar = (id: string) => {
    setCobrancas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "cancelado" as const } : c)),
    );

    toast({
      title: "Cobranca cancelada",
      description: "Cobranca cancelada com sucesso",
    });
  };

  const filteredCobrancas = cobrancas.filter((cobranca) => {
    const matchSearch =
      cobranca.cliente_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cobranca.ordem_servico_id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "todas") return matchSearch;
    return matchSearch && cobranca.status === activeTab;
  });

  const totalPendente = cobrancas
    .filter((c) => c.status === "pendente")
    .reduce((sum, c) => sum + Number(c.valor), 0);

  const totalPago = cobrancas
    .filter((c) => c.status === "pago")
    .reduce((sum, c) => sum + Number(c.valor), 0);

  const totalVencido = cobrancas
    .filter((c) => c.status === "vencido")
    .reduce((sum, c) => sum + Number(c.valor), 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-between gap-xs md:flex-row">
          <div className="flex flex-col self-start gap-xs">
            <H1>Financeiro</H1>
            <Body1 className="font-normal text-grayscale-dark">
              Gerencie cobranças e pagamentos
            </Body1>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Gerar Cobrança
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
              <Clock className="h-4 w-4 text-feedback-warning-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                  totalPendente,
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {cobrancas.filter((c) => c.status === "pendente").length} cobrança(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-feedback-success-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                  totalPago,
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {cobrancas.filter((c) => c.status === "pago").length} cobrança(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vencido</CardTitle>
              <AlertCircle className="h-4 w-4 text-feedback-error-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                  totalVencido,
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {cobrancas.filter((c) => c.status === "vencido").length} cobrança(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Geral</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                  totalPendente + totalPago + totalVencido,
                )}
              </div>
              <p className="text-xs text-muted-foreground">{cobrancas.length} cobrança(s)</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Cobranças</CardTitle>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente ou O.S..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="pendente">Pendentes</TabsTrigger>
                <TabsTrigger value="pago">Pagas</TabsTrigger>
                <TabsTrigger value="vencido">Vencidas</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                <CobrancasTable
                  cobrancas={filteredCobrancas}
                  onMarcarPago={handleMarcarPago}
                  onCancelar={handleCancelar}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <GerarCobrancaDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onGerar={handleGerarCobranca}
      />
    </MainLayout>
  );
};

export default Financeiro;
