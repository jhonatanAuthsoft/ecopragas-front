import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { LoadingState } from "@/atomic/obj.loading-state";
import { AgendaWeekly, getWeekDays, getWeekStartFromDate } from "@/atomic/org.agenda-weekly";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { useListAgendamentos } from "@/domain/agendamento";
import {
  buildListAgendamentosParams,
  mapAgendamentoToAgendaWeeklyItem,
} from "./agendamentos.utils";
import { AddAgendamentoDialog } from "./components/add-agendamento-dialog";

const Agendamentos = () => {
  const navigate = useNavigate();
  const [weekStart, setWeekStart] = useState(() => getWeekStartFromDate(new Date()));
  const [filtroTecnico, setFiltroTecnico] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const listParams = useMemo(() => buildListAgendamentosParams(weekDays), [weekDays]);

  const {
    agendamentos: agendamentosApi,
    isListAgendamentosLoading,
    listAgendamentosError,
  } = useListAgendamentos(listParams);

  const agendamentos = useMemo(
    () =>
      agendamentosApi
        .map(mapAgendamentoToAgendaWeeklyItem)
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [agendamentosApi],
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <div className="flex flex-col self-start gap-xs">
          <H1>Agendamentos</H1>
          <Body1 className="font-normal text-grayscale-dark">Gerencie a agenda de serviços</Body1>
        </div>

        <LoadingState
          loading={isListAgendamentosLoading}
          error={!!listAgendamentosError}
          data={!!agendamentos}
        >
          <LoadingState.Shimmer>
            <Skeleton className="h-[600px] w-full rounded-xl" />
          </LoadingState.Shimmer>

          <LoadingState.Error>
            <div className="text-center py-12">
              <p className="text-lg font-medium text-foreground">Erro ao carregar agendamentos</p>
              <p className="text-sm text-muted-foreground mt-1">Tente recarregar a página</p>
            </div>
          </LoadingState.Error>

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
        </LoadingState>
      </div>

      <AddAgendamentoDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </MainLayout>
  );
};

export default Agendamentos;
