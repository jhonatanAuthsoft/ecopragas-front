import { Card, CardContent, CardHeader, CardTitle } from "@/atomic/mol.card/card.component";
import { ScrollArea } from "@/atomic/mol.scroll-area/scroll-area.component";
import type { Lead } from "@/pages/Leads";
import { LeadCard } from "@/atomic/obj.lead-card/lead-card.component";

interface LeadKanbanProps {
  leads: Lead[];
  onUpdateStatus: (leadId: string, newStatus: Lead["status"]) => void;
}

const columns: { status: Lead["status"]; title: string; color: string }[] = [
  { status: "novo", title: "Novo", color: "border-l-brand-primary-medium" },
  { status: "contato", title: "Em Contato", color: "border-l-brand-secondary-medium" },
  { status: "proposta", title: "Proposta Enviada", color: "border-l-brand-secondary-dark" },
  { status: "negociacao", title: "Negociação", color: "border-l-feedback-warning-medium" },
  { status: "ganho", title: "Ganho", color: "border-l-feedback-success-medium" },
  { status: "perdido", title: "Perdido", color: "border-l-feedback-error-medium" },
];

export const LeadKanban = ({ leads, onUpdateStatus }: LeadKanbanProps) => {
  const getLeadsByStatus = (status: Lead["status"]) => {
    return leads.filter((lead) => lead.status === status);
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("leadId", leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: Lead["status"]) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("leadId");
    if (leadId) {
      onUpdateStatus(leadId, newStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {columns.map((column) => {
        const columnLeads = getLeadsByStatus(column.status);
        const totalValue = columnLeads.reduce((sum, lead) => sum + lead.value, 0);

        return (
          <Card
            key={column.status}
            className={`border-l-4 ${column.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">{column.title}</CardTitle>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{columnLeads.length} leads</span>
                <span className="font-medium">R$ {totalValue.toLocaleString("pt-BR")}</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 px-3 pb-3">
              <ScrollArea className="h-[600px] pr-3">
                <div className="space-y-2">
                  {columnLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      className="cursor-move"
                    >
                      <LeadCard lead={lead} />
                    </div>
                  ))}
                  {columnLeads.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      Nenhum lead nesta etapa
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
