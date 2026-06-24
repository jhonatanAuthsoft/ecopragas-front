import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { createPortal } from "react-dom";
import { LeadCard } from "@/atomic/obj.lead-card/lead-card.component";
import type { Lead } from "@/model/rest/lead";
import { KANBAN_COLUMNS } from "./lead-kanban.data";
import { resolveDropStatus } from "./lead-kanban.utils";
import { LeadKanbanColumn } from "./lead-kanban-column.component";

interface LeadKanbanProps {
  onUpdateStatus: (lead: Lead, newStatus: Lead["status"]) => void;
}

export const LeadKanban = ({ onUpdateStatus }: LeadKanbanProps) => {
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveLead(event.active.data.current?.lead);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const lead = active.data.current?.lead as Lead | undefined;
      const newStatus = resolveDropStatus(over.id, over.data.current?.lead as Lead | undefined);

      if (lead?.id && lead.status && newStatus && lead.status !== newStatus) {
        onUpdateStatus(lead, newStatus);
      }
    }

    setActiveLead(null);
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-md overflow-x-auto custom-scrollbar pb-xs">
        {KANBAN_COLUMNS.map((column) => (
          <LeadKanbanColumn key={`column-${column.status}`} column={column} />
        ))}
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
