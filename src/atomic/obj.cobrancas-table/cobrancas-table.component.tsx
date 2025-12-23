import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, Download, Eye, MoreHorizontal, X } from "lucide-react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/atomic/mol.dropdown-menu/dropdown-menu.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  pix_copia_cola?: string;
}

interface CobrancasTableProps {
  cobrancas: Cobranca[];
  onRefresh: () => void;
}

export const CobrancasTable = ({ cobrancas, onRefresh }: CobrancasTableProps) => {
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700">
            Pendente
          </Badge>
        );
      case "pago":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-700">
            Pago
          </Badge>
        );
      case "vencido":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-700">
            Vencido
          </Badge>
        );
      case "cancelado":
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-700">
            Cancelado
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTipoPagamentoBadge = (tipo: string) => {
    switch (tipo) {
      case "pix":
        return <Badge variant="secondary">PIX</Badge>;
      case "boleto":
        return <Badge variant="secondary">Boleto</Badge>;
      case "cartao":
        return <Badge variant="secondary">Cartão</Badge>;
      default:
        return <Badge variant="secondary">{tipo}</Badge>;
    }
  };

  const marcarComoPago = async (id: string) => {
    const { error } = await supabase
      .from("cobrancas")
      .update({
        status: "pago",
        data_pagamento: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao marcar como pago",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Cobrança atualizada",
      description: "Cobrança marcada como paga com sucesso",
    });

    onRefresh();
  };

  const cancelarCobranca = async (id: string) => {
    const { error } = await supabase.from("cobrancas").update({ status: "cancelado" }).eq("id", id);

    if (error) {
      toast({
        title: "Erro ao cancelar cobrança",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Cobrança cancelada",
      description: "Cobrança cancelada com sucesso",
    });

    onRefresh();
  };

  const copiarPixCopiaCola = (pixCopiaCola?: string) => {
    if (!pixCopiaCola) {
      toast({
        title: "PIX não disponível",
        description: "Esta cobrança não possui código PIX",
        variant: "destructive",
      });
      return;
    }

    navigator.clipboard.writeText(pixCopiaCola);
    toast({
      title: "Código PIX copiado",
      description: "O código PIX foi copiado para a área de transferência",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>O.S.</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cobrancas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                Nenhuma cobrança encontrada
              </TableCell>
            </TableRow>
          ) : (
            cobrancas.map((cobranca) => (
              <TableRow key={cobranca.id}>
                <TableCell className="font-medium">{cobranca.ordem_servico_id}</TableCell>
                <TableCell>{cobranca.cliente_nome}</TableCell>
                <TableCell>{getTipoPagamentoBadge(cobranca.tipo_pagamento)}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                    Number(cobranca.valor),
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(cobranca.data_vencimento), "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>{getStatusBadge(cobranca.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {}}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      {cobranca.tipo_pagamento === "pix" && (
                        <DropdownMenuItem
                          onClick={() => copiarPixCopiaCola(cobranca.pix_copia_cola)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Copiar PIX
                        </DropdownMenuItem>
                      )}
                      {cobranca.status === "pendente" && (
                        <DropdownMenuItem onClick={() => marcarComoPago(cobranca.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          Marcar como Pago
                        </DropdownMenuItem>
                      )}
                      {cobranca.status !== "cancelado" && cobranca.status !== "pago" && (
                        <DropdownMenuItem onClick={() => cancelarCobranca(cobranca.id)}>
                          <X className="mr-2 h-4 w-4" />
                          Cancelar
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
