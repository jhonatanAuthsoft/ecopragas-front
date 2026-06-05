import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { createPortal } from "react-dom";
import { H3, InputCaption } from "@/atomic/atm.typography";
import { Card, CardContent, CardHeader } from "@/atomic/mol.card/card.component";
import { ScrollArea } from "@/atomic/mol.scroll-area/scroll-area.component";
import { LeadCard } from "@/atomic/obj.lead-card/lead-card.component";
import type { Lead } from "@/pages/leads/Leads";
import { formatCurrency } from "@/utils/formatters";

const columns: { status: Lead["status"]; title: string; color: string }[] = [
  { status: "novo", title: "Novo", color: "border-l-brand-primary-medium" },
  { status: "em_contato", title: "Em Contato", color: "border-l-brand-secondary-medium" },
  { status: "proposta_enviada", title: "Proposta Enviada", color: "border-l-brand-secondary-dark" },
  { status: "negociacao", title: "Negociação", color: "border-l-feedback-warning-medium" },
  { status: "ganho", title: "Ganho", color: "border-l-feedback-success-medium" },
  { status: "perdido", title: "Perdido", color: "border-l-feedback-error-medium" },
];

interface DraggableLeadProps {
  lead: Lead;
}
const DraggableLead = ({ lead }: DraggableLeadProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: lead.id,
    data: { lead },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-move touch-none ${isDragging ? "opacity-50" : ""}`}
    >
      <LeadCard lead={lead} />
    </div>
  );
};

interface DroppableColumnProps {
  column: (typeof columns)[number];
  children: React.ReactNode;
  totalValue: number;
  count: number;
}

const DroppableColumn = ({ column, children, totalValue, count }: DroppableColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.status,
  });

  return (
    <Card ref={setNodeRef} className={`border-l-4 ${column.color} h-full w-full md:w-[250px]`}>
      <CardHeader className="p-3 pb-xs w-[250px]">
        <div className="flex items-center gap-xs">
          <H3 className="font-bold text-grayscale-dark">{column.title}</H3>
          <InputCaption className="font-bold text-brand-secondary-medium">({count})</InputCaption>
        </div>
        <InputCaption className="font-medium">Total: {formatCurrency(totalValue)}</InputCaption>
        <span className="w-full h-[1px] bg-grayscale-light"></span>
      </CardHeader>
      <CardContent className="p-0 px-3 pb-3 h-[calc(100%-80px)]">
        <ScrollArea className="h-[600px] pr-3">
          <div className="space-y-2 min-h-[100px]">
            {children}
            {count === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                Nenhum lead nesta etapa
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

interface LeadKanbanProps {
  leads: Lead[];
  onUpdateStatus: (leadId: string, newStatus: Lead["status"]) => void;
}

export const LeadKanban = ({ leads, onUpdateStatus }: LeadKanbanProps) => {
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const getLeadsByStatus = (status: Lead["status"]) => {
    return leads.filter((lead) => lead.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveLead(event.active.data.current?.lead);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const lead = active.data.current?.lead as Lead;
      const newStatus = over.id as Lead["status"];

      if (lead && lead.status !== newStatus) {
        onUpdateStatus(active.id as string, newStatus);
      }
    }
    setActiveLead(null);
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-md overflow-x-auto custom-scrollbar pb-xs">
        {columns.map((column) => {
          const columnLeads = getLeadsByStatus(column.status);
          const totalValue = columnLeads.reduce((sum, lead) => sum + lead.value, 0);

          return (
            <DroppableColumn
              key={`column-${column.status}-${column.title}`}
              column={column}
              totalValue={totalValue}
              count={columnLeads.length}
            >
              {columnLeads.map((lead) => (
                <DraggableLead key={lead.id} lead={lead} />
              ))}
            </DroppableColumn>
          );
        })}
      </div>
      {createPortal(
        <DragOverlay>
          {activeLead ? (
            <div className="opacity-90 rotate-3 cursor-grabbing">
              <LeadCard lead={activeLead} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
