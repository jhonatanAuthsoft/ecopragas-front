import type { Lead, LeadStatus } from "@/model/rest/lead";
import { KANBAN_COLUMN_STATUSES } from "./lead-kanban.data";

export const resolveDropStatus = (
  overId: string | number,
  overLead?: Lead,
): LeadStatus | undefined => {
  if (KANBAN_COLUMN_STATUSES.includes(overId as LeadStatus)) {
    return overId as LeadStatus;
  }

  return overLead?.status;
};
