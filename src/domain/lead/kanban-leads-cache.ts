import type { InfiniteData, QueryClient, QueryKey } from "@tanstack/react-query";
import type { Lead, LeadStatus, ListLeadsResponse } from "@/model/rest/lead";
import { GET_LEAD_DASHBOARD_QUERY_KEY } from "./get-lead-dashboard.use-case";
import { LIST_LEADS_INFINITE_QUERY_KEY } from "./list-leads-infinite.use-case";

export type KanbanSnapshot = [QueryKey, InfiniteData<ListLeadsResponse> | undefined][];

const columnKey = (status: LeadStatus) => [LIST_LEADS_INFINITE_QUERY_KEY, status];

const patchColumnFirstPage = (
  queryClient: QueryClient,
  status: LeadStatus,
  nextLeads: Lead[],
  totalDelta = 0,
) => {
  queryClient.setQueryData<InfiniteData<ListLeadsResponse>>(columnKey(status), (current) => {
    const firstPage = current?.pages[0];

    if (firstPage) {
      const totalElements = firstPage.pagination
        ? Math.max(0, (firstPage.pagination.totalElements ?? 0) + totalDelta)
        : undefined;

      return {
        ...current,
        pages: [
          {
            ...firstPage,
            data: nextLeads,
            pagination: firstPage.pagination
              ? { ...firstPage.pagination, totalElements }
              : firstPage.pagination,
          },
          ...current.pages.slice(1),
        ],
      };
    }

    if (nextLeads.length === 0) return current;

    return {
      pages: [{ data: nextLeads, pagination: { totalElements: nextLeads.length } }],
      pageParams: [0],
    };
  });
};

export const refreshLeadDashboard = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: [GET_LEAD_DASHBOARD_QUERY_KEY] });
};

export const refreshLeadColumn = (queryClient: QueryClient, status: LeadStatus) => {
  queryClient.invalidateQueries({ queryKey: columnKey(status) });
};

export const snapshotKanban = (queryClient: QueryClient): KanbanSnapshot =>
  queryClient.getQueriesData<InfiniteData<ListLeadsResponse>>({
    queryKey: [LIST_LEADS_INFINITE_QUERY_KEY],
  });

export const restoreKanban = (queryClient: QueryClient, snapshot: KanbanSnapshot | undefined) => {
  snapshot?.forEach(([queryKey, data]) => {
    queryClient.setQueryData(queryKey, data);
  });
};

export const findLeadInKanban = (queryClient: QueryClient, leadId: string): Lead | undefined => {
  for (const [, data] of snapshotKanban(queryClient)) {
    for (const page of data?.pages ?? []) {
      const lead = (page.data ?? []).find((item) => item.id === leadId);
      if (lead) return lead;
    }
  }

  return undefined;
};

export const moveLeadBetweenColumns = (
  queryClient: QueryClient,
  lead: Lead,
  newStatus: LeadStatus,
) => {
  if (!lead.id || !lead.status || lead.status === newStatus) return;

  const fromLeads =
    queryClient.getQueryData<InfiniteData<ListLeadsResponse>>(columnKey(lead.status))?.pages[0]
      ?.data ?? [];

  patchColumnFirstPage(
    queryClient,
    lead.status,
    fromLeads.filter((item) => item.id !== lead.id),
    -1,
  );

  const toLeads =
    queryClient.getQueryData<InfiniteData<ListLeadsResponse>>(columnKey(newStatus))?.pages[0]
      ?.data ?? [];

  const updatedLead = { ...lead, status: newStatus };
  const alreadyInTarget = toLeads.some((item) => item.id === lead.id);
  const nextToLeads = alreadyInTarget
    ? toLeads.map((item) => (item.id === lead.id ? updatedLead : item))
    : [updatedLead, ...toLeads];

  patchColumnFirstPage(queryClient, newStatus, nextToLeads, alreadyInTarget ? 0 : 1);
};
