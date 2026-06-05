import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { AddLeadDialog } from "@/atomic/obj.add-lead-dialog/add-lead-dialog.component";
import { ConvertLeadDialog } from "@/atomic/obj.convert-lead-dialog/convert-lead-dialog.component";
import { CRMMetrics } from "@/atomic/obj.crmmetrics/crmmetrics.component";
import { LeadKanban } from "@/atomic/obj.lead-kanban/lead-kanban.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { MOCK_LEADS } from "./leads.mock";
import type { Lead } from "./leads.types";

export type { Lead } from "./leads.types";

const createLeadId = () => `lead-${crypto.randomUUID()}`;

const Leads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [convertLeadDialogOpen, setConvertLeadDialogOpen] = useState(false);
  const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null);

  const handleAddLead = (lead: Omit<Lead, "id" | "createdAt">) => {
    const newLead: Lead = {
      ...lead,
      id: createLeadId(),
      createdAt: new Date(),
    };

    setLeads((prev) => [newLead, ...prev]);
    toast.success("Lead criado com sucesso!");
    setIsDialogOpen(false);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: Lead["status"]) => {
    const leadToUpdate = leads.find((l) => l.id === leadId);
    if (!leadToUpdate) return;

    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)),
    );
    toast.success("Status atualizado!");

    if (newStatus === "ganho") {
      setLeadToConvert({ ...leadToUpdate, status: newStatus });
      setConvertLeadDialogOpen(true);
    }
  };

  const handleConfirmConvert = () => {
    if (leadToConvert) {
      navigate(ROUTES.CLIENT.BASE, { state: { leadData: leadToConvert } });
    }
    setConvertLeadDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">CRM - Gestão de Leads</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus leads e acompanhe o funil de vendas
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Novo Lead
          </Button>
        </div>

        <CRMMetrics leads={leads} />

        <LeadKanban leads={leads} onUpdateStatus={handleUpdateLeadStatus} />

        <AddLeadDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddLead={handleAddLead}
        />

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
