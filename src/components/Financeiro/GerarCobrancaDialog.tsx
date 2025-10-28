import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, CreditCard, Smartphone, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

interface GerarCobrancaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGerar: (cobranca: any) => void;
}

export const GerarCobrancaDialog = ({ open, onOpenChange, onGerar }: GerarCobrancaDialogProps) => {
  const [ordemServicoId, setOrdemServicoId] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const [valor, setValor] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState<"boleto" | "pix" | "cartao">("pix");
  const [dataVencimento, setDataVencimento] = useState<Date>();

  const handleSubmit = () => {
    if (!ordemServicoId || !clienteNome || !valor || !dataVencimento) {
      return;
    }

    onGerar({
      ordem_servico_id: ordemServicoId,
      cliente_nome: clienteNome,
      valor: parseFloat(valor),
      tipo_pagamento: tipoPagamento,
      status: "pendente",
      data_vencimento: format(dataVencimento, "yyyy-MM-dd"),
    });

    // Reset form
    setOrdemServicoId("");
    setClienteNome("");
    setValor("");
    setTipoPagamento("pix");
    setDataVencimento(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Gerar Nova Cobrança</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="os">Ordem de Serviço</Label>
            <Input
              id="os"
              value={ordemServicoId}
              onChange={(e) => setOrdemServicoId(e.target.value)}
              placeholder="Número da O.S."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente</Label>
            <Input
              id="cliente"
              value={clienteNome}
              onChange={(e) => setClienteNome(e.target.value)}
              placeholder="Nome do cliente"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor">Valor (R$)</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Pagamento</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={tipoPagamento === "pix" ? "default" : "outline"}
                onClick={() => setTipoPagamento("pix")}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <Smartphone className="h-5 w-5" />
                <span className="text-xs">PIX</span>
              </Button>
              <Button
                type="button"
                variant={tipoPagamento === "boleto" ? "default" : "outline"}
                onClick={() => setTipoPagamento("boleto")}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <Receipt className="h-5 w-5" />
                <span className="text-xs">Boleto</span>
              </Button>
              <Button
                type="button"
                variant={tipoPagamento === "cartao" ? "default" : "outline"}
                onClick={() => setTipoPagamento("cartao")}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">Cartão</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Data de Vencimento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataVencimento && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataVencimento ? format(dataVencimento, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataVencimento}
                  onSelect={setDataVencimento}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Gerar Cobrança
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
