import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import {
  AgendamentoDetalhesCard,
  type AgendamentoDetalhesView,
  getAgendamentoDetalhesById,
} from "./components/agendamento-detalhes";
import { ReagendarAgendamentoDialog } from "./components/ReagendarAgendamentoDialog";

export default function AgendamentoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agendamento, setAgendamento] = useState<AgendamentoDetalhesView>(() =>
    getAgendamentoDetalhesById(id ?? "1"),
  );
  const [isReagendarDialogOpen, setIsReagendarDialogOpen] = useState(false);

  useEffect(() => {
    setAgendamento(getAgendamentoDetalhesById(id ?? "1"));
  }, [id]);

  const handleDelete = () => {
    toast.info("Em desenvolvimento...");
    navigate(ROUTES.ADMIN.SCHEDULING.BASE);
  };

  const handleReagendar = () => {
    toast.info("Em desenvolvimento...");
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <div className="flex flex-col self-start gap-xs">
          <Button
            className="w-fit"
            variant="link"
            size="lg"
            onClick={() => navigate(ROUTES.ADMIN.SCHEDULING.BASE)}
            leftIcon={<ChevronLeft className="size-md" />}
          >
            Voltar para Agendamentos
          </Button>

          <H1>Detalhes do Agendamento</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Visualize informações sobre o agendamento
          </Body1>
        </div>

        <AgendamentoDetalhesCard
          agendamento={agendamento}
          onDelete={handleDelete}
          onReagendar={() => setIsReagendarDialogOpen(true)}
        />

        <ReagendarAgendamentoDialog
          open={isReagendarDialogOpen}
          onOpenChange={setIsReagendarDialogOpen}
          agendamento={agendamento}
          onConfirm={handleReagendar}
        />
      </div>
    </MainLayout>
  );
}
