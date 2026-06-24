import { useDraggable } from "@dnd-kit/core";
import { LeadCard } from "@/atomic/obj.lead-card/lead-card.component";
import type { Lead } from "@/model/rest/lead";

interface DraggableLeadProps {
  lead: Lead;
}

export const DraggableLead = ({ lead }: DraggableLeadProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: lead.id ?? "",
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
