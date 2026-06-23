import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { AddLeadDialog } from "@/atomic/obj.add-lead-dialog/add-lead-dialog.component";
import { ConvertLeadDialog } from "@/atomic/obj.convert-lead-dialog/convert-lead-dialog.component";
import { CRMMetrics } from "@/atomic/obj.crmmetrics/crmmetrics.component";
import { LeadKanban } from "@/atomic/obj.lead-kanban/lead-kanban.component";
import { LoadingState } from "@/atomic/obj.loading-state";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { useListLeads, useUpdateLeadStatus } from "@/domain/lead";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus, ListLeadsParams } from "@/model/rest/lead";
import { useSidebarStore } from "@/store/sidebar";

export const LIST_LEADS_PARAMS: ListLeadsParams = { limit: 300, offset: 0 };

const KANBAN_SKELETON_COLUMNS = [
  "NOVO",
  "EM_CONTATO",
  "PROPOSTA_ENVIADA",
  "EM_NEGOCIACAO",
  "GANHO",
  "PERDIDO",
];

const Leads = () => {
  const navigate = useNavigate();
  const isMinimized = useSidebarStore((state) => state.isMinimized);
  // TODO: otimizar (ideia: fazer listagens individuais em cada coluna, com paginação infinita, e ao atualizar fazer refetch)
  const { leads, listLeadsError, isListLeadsLoading } = useListLeads(LIST_LEADS_PARAMS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [convertLeadDialogOpen, setConvertLeadDialogOpen] = useState(false);
  const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null);

  const { updateLeadStatus } = useUpdateLeadStatus({
    onSuccess: (response) => {
      toast.success("Status atualizado!");

      if (response.data?.status === "GANHO") {
        setLeadToConvert(response.data);
        setConvertLeadDialogOpen(true);
      }
    },
  });

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus({ id: leadId, body: { status: newStatus } });
  };

  const handleConfirmConvert = () => {
    if (leadToConvert) {
      navigate(ROUTES.ADMIN.CLIENT.BASE, { state: { leadData: leadToConvert } });
    }
    setConvertLeadDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-lg">
        <div className="flex flex-col items-center justify-between gap-xs md:flex-row">
          <div className="flex flex-col self-start gap-xs">
            <H1>CRM - Gestão de Leads</H1>
            <Body1 className="font-normal text-grayscale-dark">
              Gerencie seus leads e acompanhe o funil de vendas
            </Body1>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="lg"
            className="w-full px-md md:w-auto"
            leftIcon={<Plus className="size-md" />}
          >
            Novo Lead
          </Button>
        </div>

        <CRMMetrics />

        <div
          className={cn(
            isMinimized ? "md:max-w-[calc(100dvw-180px)]" : "md:max-w-[calc(100dvw-320px)]",
          )}
        >
          <LoadingState
            loading={isListLeadsLoading}
            error={!!listLeadsError}
            data={!isListLeadsLoading && !listLeadsError}
          >
            <LoadingState.Shimmer>
              <div className="flex gap-md overflow-x-auto pb-xs">
                {KANBAN_SKELETON_COLUMNS.map((status) => (
                  <Skeleton
                    key={`kanban-skeleton-${status}`}
                    className="h-[700px] w-[250px] shrink-0"
                  />
                ))}
              </div>
            </LoadingState.Shimmer>

            <LoadingState.Error>
              <div className="text-center py-lg">
                <p className="text-lg font-medium text-foreground">Erro ao carregar leads</p>
                <p className="text-sm text-muted-foreground mt-1">Tente recarregar a pagina</p>
              </div>
            </LoadingState.Error>

            <LeadKanban leads={leads} onUpdateStatus={handleUpdateLeadStatus} />
          </LoadingState>
        </div>

        <AddLeadDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

        <ConvertLeadDialog
          open={convertLeadDialogOpen}
          onOpenChange={setConvertLeadDialogOpen}
          onConfirm={handleConfirmConvert}
          lead={leadToConvert}
        />
      </div>
    </MainLayout>
  );
};

export default Leads;
