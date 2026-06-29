import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { LoadingState } from "@/atomic/obj.loading-state";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { useDeleteAgendamento, useGetAgendamento } from "@/domain/agendamento";
import { AgendamentoDetalhesCard } from "./components/agendamento-detalhes";
import { ReagendarAgendamentoDialog } from "./components/reagendar-agendamento-dialog";

export default function AgendamentoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isReagendarDialogOpen, setIsReagendarDialogOpen] = useState(false);

  const { agendamento, getAgendamentoError, isGetAgendamentoLoading } = useGetAgendamento({
    id: id ?? "",
  });

  const { deleteAgendamento, isDeleteAgendamentoLoading } = useDeleteAgendamento({
    onSuccess: () => {
      toast.success("Agendamento excluído com sucesso!");
      navigate(ROUTES.ADMIN.SCHEDULING.BASE);
    },
  });

  const handleDelete = () => {
    if (!agendamento?.id) return;
    deleteAgendamento({ id: agendamento.id });
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

        <LoadingState
          loading={isGetAgendamentoLoading}
          error={!!getAgendamentoError}
          data={!!agendamento}
          renderOnlyWhenData
        >
          <LoadingState.Shimmer>
            <Skeleton className="h-[400px] w-full rounded-medium" />
          </LoadingState.Shimmer>

          <LoadingState.Error>
            <div className="text-center py-12">
              <p className="text-lg font-medium text-foreground">Erro ao carregar agendamento</p>
              <p className="text-sm text-muted-foreground mt-1">Tente recarregar a página</p>
            </div>
          </LoadingState.Error>

          <AgendamentoDetalhesCard
            agendamento={agendamento}
            onDelete={handleDelete}
            onReagendar={() => setIsReagendarDialogOpen(true)}
            isDeleteLoading={isDeleteAgendamentoLoading}
          />

          <ReagendarAgendamentoDialog
            open={isReagendarDialogOpen}
            onOpenChange={setIsReagendarDialogOpen}
            agendamento={agendamento}
          />
        </LoadingState>
      </div>
    </MainLayout>
  );
}
