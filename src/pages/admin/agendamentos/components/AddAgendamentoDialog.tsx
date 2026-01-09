import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Repeat } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Label } from "@/atomic/atm.label/label.component";
import { Switch } from "@/atomic/atm.switch/switch.component";
import { Calendar } from "@/atomic/mol.calendar/calendar.component";
import {
  Dialog,
  DialogContent,
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

interface AddAgendamentoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (agendamento: any) => void;
  tecnicos: string[];
  tiposServico: string[];
}

export const AddAgendamentoDialog = ({
  open,
  onOpenChange,
  onAdd,
  tecnicos,
  tiposServico,
}: AddAgendamentoDialogProps) => {
  const [clienteNome, setClienteNome] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [data, setData] = useState<Date>();
  const [horario, setHorario] = useState("");
  const [endereco, setEndereco] = useState("");
  const [isRecorrente, setIsRecorrente] = useState(false);
  const [recorrencia, setRecorrencia] = useState<string>("");

  const handleSubmit = () => {
    if (!clienteNome || !tecnico || !tipoServico || !data || !horario || !endereco) {
      return;
    }

    onAdd({
      clienteNome,
      tecnico,
      tipoServico,
      data,
      horario,
      endereco,
      status: "agendado",
      ...(isRecorrente && recorrencia && { recorrencia }),
    });

    // Reset form
    setClienteNome("");
    setTecnico("");
    setTipoServico("");
    setData(undefined);
    setHorario("");
    setEndereco("");
    setIsRecorrente(false);
    setRecorrencia("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
            <Label htmlFor="tecnico">Técnico</Label>
            <Select value={tecnico} onValueChange={setTecnico}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o técnico" />
              </SelectTrigger>
              <SelectContent>
                {tecnicos.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="servico">Tipo de Serviço</Label>
            <Select value={tipoServico} onValueChange={setTipoServico}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {tiposServico.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !data && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data ? format(data, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data}
                    onSelect={setData}
                    locale={ptBR}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horario">Horário</Label>
              <Input
                id="horario"
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço do serviço"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Repeat className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="recorrente" className="cursor-pointer">
                Agendamento Recorrente
              </Label>
            </div>
            <Switch id="recorrente" checked={isRecorrente} onCheckedChange={setIsRecorrente} />
          </div>

          {isRecorrente && (
            <div className="space-y-2">
              <Label htmlFor="recorrencia">Frequência</Label>
              <Select value={recorrencia} onValueChange={setRecorrencia}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="semestral">Semestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Adicionar Agendamento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
