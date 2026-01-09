import { eachDayOfInterval, endOfMonth, format, isSameDay, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Plus, User, Wrench } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Calendar } from "@/atomic/mol.calendar/calendar.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/atomic/mol.card/card.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/atomic/mol.select/select.component";
import { AddAgendamentoDialog } from "./components/AddAgendamentoDialog";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";

interface Agendamento {
  id: string;
  clienteNome: string;
  tecnico: string;
  tipoServico: string;
  data: Date;
  horario: string;
  endereco: string;
  status: "agendado" | "em-andamento" | "concluido" | "cancelado";
  recorrencia?: "semanal" | "mensal" | "trimestral" | "semestral" | "anual";
}

const Agendamentos = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filtroTecnico, setFiltroTecnico] = useState<string>("todos");
  const [filtroServico, setFiltroServico] = useState<string>("todos");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"calendario" | "lista">("calendario");

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    {
      id: "1",
      clienteNome: "João Silva",
      tecnico: "Carlos Santos",
      tipoServico: "Dedetização",
      data: new Date(),
      horario: "09:00",
      endereco: "Rua A, 123",
      status: "agendado",
      recorrencia: "mensal",
    },
    {
      id: "2",
      clienteNome: "Maria Oliveira",
      tecnico: "Pedro Lima",
      tipoServico: "Limpeza de Caixa D'água",
      data: new Date(),
      horario: "14:00",
      endereco: "Av. B, 456",
      status: "em-andamento",
    },
  ]);

  const tecnicos = ["todos", "Carlos Santos", "Pedro Lima", "Ana Costa", "Roberto Alves"];
  const tiposServico = [
    "todos",
    "Dedetização",
    "Limpeza de Caixa D'água",
    "Desinsetização",
    "Descupinização",
  ];

  const handleAddAgendamento = (agendamento: Omit<Agendamento, "id">) => {
    const newAgendamento = {
      ...agendamento,
      id: String(agendamentos.length + 1),
    };
    setAgendamentos([...agendamentos, newAgendamento]);
    setIsAddDialogOpen(false);
  };

  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    const matchTecnico = filtroTecnico === "todos" || agendamento.tecnico === filtroTecnico;
    const matchServico = filtroServico === "todos" || agendamento.tipoServico === filtroServico;
    return matchTecnico && matchServico;
  });

  const agendamentosDoDia = agendamentosFiltrados.filter((agendamento) =>
    isSameDay(agendamento.data, selectedDate),
  );

  const getDayAgendamentos = (day: Date) => {
    return agendamentosFiltrados.filter((agendamento) => isSameDay(agendamento.data, day));
  };

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendado":
        return "bg-brand-secondary-medium text-white hover:bg-brand-secondary-dark";
      case "em-andamento":
        return "bg-feedback-warning-medium text-white hover:bg-feedback-warning-dark";
      case "concluido":
        return "bg-feedback-success-medium text-white hover:bg-feedback-success-dark";
      case "cancelado":
        return "bg-feedback-error-medium text-white hover:bg-feedback-error-dark";
      default:
        return "bg-grayscale-medium text-white hover:bg-grayscale-dark";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "agendado":
        return "Agendado";
      case "em-andamento":
        return "Em Andamento";
      case "concluido":
        return "Concluído";
      case "cancelado":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
            <p className="text-muted-foreground">Gerencie a agenda de serviços</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Select value={filtroTecnico} onValueChange={setFiltroTecnico}>
            <SelectTrigger>
              <User className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por técnico" />
            </SelectTrigger>
            <SelectContent>
              {tecnicos.map((tecnico) => (
                <SelectItem key={tecnico} value={tecnico}>
                  {tecnico === "todos" ? "Todos os Técnicos" : tecnico}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <SelectTrigger>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="calendario">Visualização Calendário</SelectItem>
              <SelectItem value="lista">Visualização Lista</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calendário de Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                locale={ptBR}
                className="rounded-md border"
                modifiers={{
                  hasAgendamento: (date) => getDayAgendamentos(date).length > 0,
                }}
                modifiersClassNames={{
                  hasAgendamento: "bg-brand-primary-light/20 font-bold text-brand-primary-dark",
                }}
              />

              {viewMode === "lista" && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">
                    Todos os Agendamentos ({agendamentosFiltrados.length})
                  </h3>
                  {agendamentosFiltrados.map((agendamento) => (
                    <Card key={agendamento.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{agendamento.clienteNome}</h4>
                              <Badge variant="outline">{agendamento.tipoServico}</Badge>
                              {agendamento.recorrencia && (
                                <Badge variant="secondary" className="text-xs">
                                  Recorrente: {agendamento.recorrencia}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format(agendamento.data, "dd/MM/yyyy", { locale: ptBR })} às{" "}
                              {agendamento.horario}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Técnico: {agendamento.tecnico}
                            </p>
                            <p className="text-sm text-muted-foreground">{agendamento.endereco}</p>
                          </div>
                          <Badge className={getStatusColor(agendamento.status)}>
                            {getStatusLabel(agendamento.status)}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Agendamentos de {format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {agendamentosDoDia.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum agendamento para este dia.</p>
              ) : (
                <div className="space-y-4">
                  {agendamentosDoDia.map((agendamento) => (
                    <Card key={agendamento.id}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{agendamento.clienteNome}</h4>
                                {agendamento.recorrencia && (
                                  <Badge variant="secondary" className="text-xs">
                                    {agendamento.recorrencia}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{agendamento.horario}</p>
                            </div>
                            <Badge className={getStatusColor(agendamento.status)}>
                              {getStatusLabel(agendamento.status)}
                            </Badge>
                          </div>
                          <Badge variant="outline">{agendamento.tipoServico}</Badge>
                          <p className="text-sm">
                            <span className="font-medium">Técnico:</span> {agendamento.tecnico}
                          </p>
                          <p className="text-sm text-muted-foreground">{agendamento.endereco}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <AddAgendamentoDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddAgendamento}
        tecnicos={tecnicos.filter((t) => t !== "todos")}
        tiposServico={tiposServico.filter((s) => s !== "todos")}
      />
    </MainLayout>
  );
};

export default Agendamentos;

