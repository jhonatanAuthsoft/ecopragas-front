import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Label } from "@/atomic/atm.label/label.component";
import { Textarea } from "@/atomic/atm.textarea/textarea.component";
import { Calendar } from "@/atomic/mol.calendar/calendar.component";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/atomic/mol.dialog/dialog.component";
import { Popover, PopoverContent, PopoverTrigger } from "@/atomic/mol.popover/popover.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/atomic/mol.select/select.component";
import { cn } from "@/lib/utils";
import type { OrdemServico } from "@/pages/OrdensServico";

interface AddOrdemServicoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddOrdemServico: (os: Omit<OrdemServico, "id" | "numeroOS">) => void;
}

export const AddOrdemServicoDialog = ({
  open,
  onOpenChange,
  onAddOrdemServico,
}: AddOrdemServicoDialogProps) => {
  const [formData, setFormData] = useState({
    clienteId: "",
    clienteNome: "",
    tipoServico: "dedetizacao" as OrdemServico["tipoServico"],
    tecnicoId: "",
    tecnicoNome: "",
    dataAgendamento: new Date(),
    horaAgendamento: "09:00",
    endereco: "",
    status: "agendada" as OrdemServico["status"],
    observacoes: "",
    valorServico: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddOrdemServico({
      clienteId: formData.clienteId,
      clienteNome: formData.clienteNome,
      tipoServico: formData.tipoServico,
      tecnicoId: formData.tecnicoId,
      tecnicoNome: formData.tecnicoNome,
      dataAgendamento: formData.dataAgendamento,
      horaAgendamento: formData.horaAgendamento,
      endereco: formData.endereco,
      status: formData.status,
      observacoes: formData.observacoes || undefined,
      valorServico: parseFloat(formData.valorServico) || 0,
    });

    // Reset form
    setFormData({
      clienteId: "",
      clienteNome: "",
      tipoServico: "dedetizacao",
      tecnicoId: "",
      tecnicoNome: "",
      dataAgendamento: new Date(),
      horaAgendamento: "09:00",
      endereco: "",
      status: "agendada",
      observacoes: "",
      valorServico: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Ordem de Serviço</DialogTitle>
          <DialogDescription>
            Preencha os dados da ordem de serviço. Os campos marcados com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clienteNome">Cliente *</Label>
              <Input
                id="clienteNome"
                value={formData.clienteNome}
                onChange={(e) => setFormData({ ...formData, clienteNome: e.target.value })}
                required
                placeholder="Selecione ou digite o nome do cliente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoServico">Tipo de Serviço *</Label>
              <Select
                value={formData.tipoServico}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    tipoServico: value as OrdemServico["tipoServico"],
                  })
                }
              >
                <SelectTrigger id="tipoServico">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dedetizacao">Dedetização</SelectItem>
                  <SelectItem value="limpeza_caixa">Limpeza de Caixa D'água</SelectItem>
                  <SelectItem value="sanitizacao">Sanitização</SelectItem>
                  <SelectItem value="desratizacao">Desratização</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tecnicoNome">Técnico Responsável *</Label>
              <Input
                id="tecnicoNome"
                value={formData.tecnicoNome}
                onChange={(e) => setFormData({ ...formData, tecnicoNome: e.target.value })}
                required
                placeholder="Selecione ou digite o nome do técnico"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorServico">Valor do Serviço (R$) *</Label>
              <Input
                id="valorServico"
                type="number"
                step="0.01"
                min="0"
                value={formData.valorServico}
                onChange={(e) => setFormData({ ...formData, valorServico: e.target.value })}
                required
                placeholder="450.00"
              />
            </div>

            <div className="space-y-2">
              <Label>Data do Agendamento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dataAgendamento && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataAgendamento ? (
                      format(formData.dataAgendamento, "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dataAgendamento}
                    onSelect={(date) => date && setFormData({ ...formData, dataAgendamento: date })}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horaAgendamento">Hora do Agendamento *</Label>
              <Input
                id="horaAgendamento"
                type="time"
                value={formData.horaAgendamento}
                onChange={(e) => setFormData({ ...formData, horaAgendamento: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="endereco">Endereço do Serviço *</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                required
                placeholder="Rua das Flores, 123 - São Paulo/SP"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as OrdemServico["status"],
                  })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agendada">Agendada</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Informações adicionais sobre o serviço..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Ordem de Serviço</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
