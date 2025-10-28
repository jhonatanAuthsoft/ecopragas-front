import { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { CRMMetrics } from "@/components/CRM/CRMMetrics";
import { LeadKanban } from "@/components/CRM/LeadKanban";
import { AddLeadDialog } from "@/components/CRM/AddLeadDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export type Lead = {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  origin: "Google" | "Instagram" | "Indicação" | "Facebook" | "Website" | "Outro";
  value: number;
  status: "novo" | "contato" | "proposta" | "negociacao" | "ganho" | "perdido";
  notes?: string;
  createdAt: Date;
};

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "João Silva",
      company: "Restaurante Bom Sabor",
      email: "joao@bomsabor.com",
      phone: "(11) 98765-4321",
      origin: "Google",
      value: 1500,
      status: "novo",
      createdAt: new Date("2025-01-10"),
    },
    {
      id: "2",
      name: "Maria Santos",
      company: "Padaria Pão Quente",
      email: "maria@paoquente.com",
      phone: "(11) 97654-3210",
      origin: "Instagram",
      value: 2500,
      status: "contato",
      createdAt: new Date("2025-01-09"),
    },
    {
      id: "3",
      name: "Pedro Costa",
      company: "Supermercado Central",
      email: "pedro@central.com",
      phone: "(11) 96543-2109",
      origin: "Indicação",
      value: 5000,
      status: "proposta",
      createdAt: new Date("2025-01-08"),
    },
    {
      id: "4",
      name: "Ana Oliveira",
      email: "ana@email.com",
      phone: "(11) 95432-1098",
      origin: "Facebook",
      value: 1200,
      status: "negociacao",
      createdAt: new Date("2025-01-07"),
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddLead = (lead: Omit<Lead, "id" | "createdAt">) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setLeads([newLead, ...leads]);
    setIsDialogOpen(false);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: Lead["status"]) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
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
