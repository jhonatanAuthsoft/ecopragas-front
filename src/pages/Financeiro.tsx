import { useState, useEffect } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, DollarSign, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GerarCobrancaDialog } from "@/components/Financeiro/GerarCobrancaDialog";
import { CobrancasTable } from "@/components/Financeiro/CobrancasTable";

interface Cobranca {
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

const Financeiro = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cobrancas, setCobrancas] = useState<Cobranca[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");
  const { toast } = useToast();

  useEffect(() => {
    carregarCobrancas();
  }, []);

  const carregarCobrancas = async () => {
    const { data, error } = await supabase
      .from("cobrancas")
      .select("*")
      .order("data_emissao", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar cobranças",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setCobrancas(data || []);
  };

  const handleGerarCobranca = async (cobranca: Omit<Cobranca, "id" | "data_emissao" | "created_at" | "updated_at">) => {
    const { error } = await supabase.from("cobrancas").insert([cobranca]);

    if (error) {
      toast({
        title: "Erro ao gerar cobrança",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Cobrança gerada com sucesso",
      description: `Cobrança de ${cobranca.tipo_pagamento.toUpperCase()} criada para ${cobranca.cliente_nome}`,
    });

    carregarCobrancas();
    setIsDialogOpen(false);
  };

  const filteredCobrancas = cobrancas.filter((cobranca) => {
    const matchSearch = cobranca.cliente_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cobranca.ordem_servico_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "todas") return matchSearch;
    return matchSearch && cobranca.status === activeTab;
  });

  const totalPendente = cobrancas
    .filter(c => c.status === "pendente")
    .reduce((sum, c) => sum + Number(c.valor), 0);

  const totalPago = cobrancas
    .filter(c => c.status === "pago")
    .reduce((sum, c) => sum + Number(c.valor), 0);

  const totalVencido = cobrancas
    .filter(c => c.status === "vencido")
    .reduce((sum, c) => sum + Number(c.valor), 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
            <p className="text-muted-foreground">Gerencie cobranças e pagamentos</p>
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
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPendente)}
              </div>
              <p className="text-xs text-muted-foreground">
                {cobrancas.filter(c => c.status === "pendente").length} cobrança(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPago)}
              </div>
              <p className="text-xs text-muted-foreground">
                {cobrancas.filter(c => c.status === "pago").length} cobrança(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vencido</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVencido)}
              </div>
              <p className="text-xs text-muted-foreground">
                {cobrancas.filter(c => c.status === "vencido").length} cobrança(s)
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
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  totalPendente + totalPago + totalVencido
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {cobrancas.length} cobrança(s)
              </p>
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
                  onRefresh={carregarCobrancas}
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
