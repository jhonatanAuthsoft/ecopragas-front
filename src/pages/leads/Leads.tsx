import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { AddLeadDialog } from "@/atomic/obj.add-lead-dialog/add-lead-dialog.component";
import { CRMMetrics } from "@/atomic/obj.crmmetrics/crmmetrics.component";
import { LeadKanban } from "@/atomic/obj.lead-kanban/lead-kanban.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { leadsService, LeadDTO } from "@/services/leads.service";

export type Lead = {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone: string;
  origin: "Google" | "Instagram" | "Indicação" | "Facebook" | "Website" | "Outro";
  value: number;
  status: "novo" | "contato" | "proposta" | "negociacao" | "ganho" | "perdido";
  notes?: string;
  createdAt: Date;
};

const mapDtoToLead = (dto: LeadDTO): Lead => {
  const originMap: Record<string, Lead["origin"]> = {
    "GOOGLE": "Google",
    "INSTAGRAM": "Instagram",
    "FACEBOOK": "Facebook",
    "INDICACAO": "Indicação",
    "WEBSITE": "Website",
    "OUTRO": "Outro"
  };

  const statusMap: Record<string, Lead["status"]> = {
    "NOVO": "novo",
    "CONTATO": "contato",
    "PROPOSTA": "proposta",
    "NEGOCIACAO": "negociacao",
    "GANHO": "ganho",
    "PERDIDO": "perdido"
  };

  return {
    id: dto.id || "",
    name: dto.nome,
    company: dto.empresa,
    email: dto.email,
    phone: dto.telefone,
    origin: originMap[dto.origem] || "Outro",
    value: dto.valorEstimado,
    status: statusMap[dto.status] || "novo",
    notes: dto.observacoes,
    createdAt: dto.dataCriacao ? new Date(dto.dataCriacao) : new Date(),
  };
};

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const response = await leadsService.getAll(0, 100); // Fetching 100 for now to populate kanban
      const mappedLeads = response.content.map(mapDtoToLead);
      setLeads(mappedLeads);
    } catch (error) {
      console.error("Erro ao buscar leads:", error);
      toast.error("Erro ao carregar leads");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = async (lead: Omit<Lead, "id" | "createdAt">) => {
    try {
      const dto: Omit<LeadDTO, "id" | "dataCriacao"> = {
        nome: lead.name,
        empresa: lead.company,
        email: lead.email,
        telefone: lead.phone,
        origem: lead.origin.toUpperCase().replace("ÇÃ", "CA").replace("çã", "ca"), // Simple normalization
        valorEstimado: lead.value,
        status: lead.status.toUpperCase(),
        observacoes: lead.notes,
      };

      await leadsService.create(dto);
      toast.success("Lead criado com sucesso!");
      fetchLeads();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao criar lead:", error);
      toast.error("Erro ao criar lead");
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    const leadToUpdate = leads.find(l => l.id === leadId);
    if (!leadToUpdate) return;

    // Optimistic update
    setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)));

    try {
      const dto: Omit<LeadDTO, "id" | "dataCriacao"> = {
        nome: leadToUpdate.name,
        empresa: leadToUpdate.company,
        email: leadToUpdate.email,
        telefone: leadToUpdate.phone,
        origem: leadToUpdate.origin.toUpperCase().replace("ÇÃ", "CA"),
        valorEstimado: leadToUpdate.value,
        status: newStatus.toUpperCase(),
        observacoes: leadToUpdate.notes,
      };

      await leadsService.update(leadId, dto);
      toast.success("Status atualizado!");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status");
      // Revert optimistic update
      setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: leadToUpdate.status } : lead)));
    }
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
      </div>
    </MainLayout>
  );
};

export default Leads;

