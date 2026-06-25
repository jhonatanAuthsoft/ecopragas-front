import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { AddLeadDialog } from "@/atomic/obj.add-lead-dialog/add-lead-dialog.component";
import { ConvertLeadDialog } from "@/atomic/obj.convert-lead-dialog/convert-lead-dialog.component";
import { CRMMetrics } from "@/atomic/obj.crmmetrics/crmmetrics.component";
import { LeadKanban } from "@/atomic/obj.lead-kanban/lead-kanban.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { useUpdateLeadStatus } from "@/domain/lead";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/model/rest/lead";
import { useSidebarStore } from "@/store/sidebar";

const Leads = () => {
  const navigate = useNavigate();
  const isMinimized = useSidebarStore((state) => state.isMinimized);
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

  const handleUpdateLeadStatus = (lead: Lead, newStatus: LeadStatus) => {
    if (!lead.id) return;

    updateLeadStatus({ id: lead.id, body: { status: newStatus }, lead });
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
          <LeadKanban onUpdateStatus={handleUpdateLeadStatus} />
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
