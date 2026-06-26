import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Body1, H1 } from "@/atomic/atm.typography";
import {
  AgendaWeekly,
  type AgendaWeeklyItem,
  createMockWeekAgendamentos,
  getWeekStartFromDate,
} from "@/atomic/org.agenda-weekly";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import {
  AddAgendamentoDialog,
  type AddAgendamentoSubmitPayload,
} from "./components/add-agendamento-dialog";

type AgendamentoStatus = "agendado" | "em-andamento" | "concluido" | "cancelado";
type AgendamentoRecorrencia = "semanal" | "mensal" | "trimestral" | "semestral" | "anual";

interface Agendamento extends AgendaWeeklyItem {
  clienteNome: string;
  endereco: string;
  status: AgendamentoStatus;
  recorrencia?: AgendamentoRecorrencia;
}

const Agendamentos = () => {
  const navigate = useNavigate();
  const [weekStart, setWeekStart] = useState(() => getWeekStartFromDate(new Date()));
  const [filtroTecnico, setFiltroTecnico] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
    const mockItems = createMockWeekAgendamentos(new Date());

    return mockItems.map((item, index) => ({
      ...item,
      clienteNome: index % 2 === 0 ? "João Silva" : "Maria Oliveira",
      endereco: index % 2 === 0 ? "Rua A, 123" : "Av. B, 456",
      status: index === 1 ? "em-andamento" : "agendado",
      recorrencia: index === 0 ? "mensal" : undefined,
    }));
  });

  const handleAddAgendamento = (data: AddAgendamentoSubmitPayload) => {
    const newAgendamento: Agendamento = {
      id: String(agendamentos.length + 1),
      tipoServico: data.tipoServico,
      horario: data.horario,
      data: data.data,
      tecnico: data.tecnicoNome,
      clienteNome: data.clienteNome,
      endereco: data.endereco,
      status: "agendado",
      recorrencia: data.recorrencia,
    };

    setAgendamentos([...agendamentos, newAgendamento]);
    setIsAddDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <div className="flex flex-col self-start gap-xs">
          <H1>Agendamentos</H1>
          <Body1 className="font-normal text-grayscale-dark">Gerencie a agenda de serviços</Body1>
        </div>

        <AgendaWeekly
          agendamentos={agendamentos}
          weekStart={weekStart}
          onWeekChange={setWeekStart}
          filtroTecnico={filtroTecnico}
          onFiltroTecnicoChange={setFiltroTecnico}
          onNovoClick={() => setIsAddDialogOpen(true)}
          onAgendamentoClick={(item) =>
            navigate(ROUTES.ADMIN.SCHEDULING.DETAILS.replace(":id", item.id ?? ""))
          }
        />
      </div>

      <AddAgendamentoDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddAgendamento}
      />
    </MainLayout>
  );
};

export default Agendamentos;
