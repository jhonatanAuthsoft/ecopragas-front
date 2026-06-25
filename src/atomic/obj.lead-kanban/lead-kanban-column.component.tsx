import { useDroppable } from "@dnd-kit/core";
import { useRef } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { H3, InputCaption } from "@/atomic/atm.typography";
import { Card, CardContent, CardHeader } from "@/atomic/mol.card/card.component";
import { LoadingState } from "@/atomic/obj.loading-state";
import { useListLeadsInfinite } from "@/domain/lead";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { Lead } from "@/model/rest/lead";
import { formatCurrency } from "@/utils/formatters";
import {
  COLUMN_SCROLL_HEIGHT,
  COLUMN_SKELETON_KEYS,
  type LeadKanbanColumnConfig,
} from "./lead-kanban.data";
import { DraggableLead } from "./lead-kanban-draggable-lead.component";

interface LeadKanbanColumnProps {
  column: LeadKanbanColumnConfig;
}

export const LeadKanbanColumn = ({ column }: LeadKanbanColumnProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    leads,
    totalCount,
    isListLeadsLoading,
    listLeadsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetchLeads,
  } = useListLeadsInfinite(column.status);

  const sentinelRef = useInfiniteScroll({
    rootRef: scrollRef,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const totalValue = leads.reduce((sum, lead) => sum + (lead.valorEstimado ?? 0), 0);
  const { setNodeRef } = useDroppable({ id: column.status });

  return (
    <Card
      ref={setNodeRef}
      className={`p-0! block border-l-4 ${column.color} h-full w-full md:w-[250px]`}
    >
      <CardHeader className="p-3 pb-xs w-[250px]">
        <div className="flex items-center gap-xs">
          <H3 className="font-bold text-grayscale-dark">{column.title}</H3>
          <InputCaption className="font-bold text-brand-secondary-medium">
            ({totalCount})
          </InputCaption>
        </div>
        <InputCaption className="font-medium">Total: {formatCurrency(totalValue)}</InputCaption>
        <span className="w-full h-[1px] bg-grayscale-light" />
      </CardHeader>
      <CardContent className="p-0 pl-3 pb-3 h-[calc(100%-80px)]">
        <div
          ref={scrollRef}
          className={`${COLUMN_SCROLL_HEIGHT} overflow-y-auto pr-3 custom-scrollbar space-y-2 min-h-[100px]`}
        >
          <ColumnLeadsList
            columnStatus={column.status}
            leads={leads}
            isLoading={isListLeadsLoading}
            error={!!listLeadsError}
            isFetchingNextPage={isFetchingNextPage}
            sentinelRef={sentinelRef}
            onRetry={refetchLeads}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface ColumnLeadsListProps {
  columnStatus: Lead["status"];
  leads: Lead[];
  isLoading: boolean;
  error: boolean;
  isFetchingNextPage: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  onRetry: () => void;
}

const ColumnLeadsList = ({
  columnStatus,
  leads,
  isLoading,
  error,
  isFetchingNextPage,
  sentinelRef,
  onRetry,
}: ColumnLeadsListProps) => (
  <LoadingState
    loading={isLoading}
    error={error}
    data={leads.length > 0}
    enableActivityIndicator={false}
  >
    <LoadingState.Shimmer>
      {COLUMN_SKELETON_KEYS.map((skeletonKey) => (
        <Skeleton key={`${columnStatus}-skeleton-${skeletonKey}`} className="h-[120px] w-full" />
      ))}
    </LoadingState.Shimmer>

    <LoadingState.Error>
      <div className="text-center py-8">
        <p className="text-sm text-grayscale-dark">Erro ao carregar leads</p>
        <Button onClick={onRetry} variant="tertiary">
          Tentar novamente
        </Button>
      </div>
    </LoadingState.Error>

    <LoadingState.NoData>
      <div className="text-center py-8 text-sm text-grayscale-dark">Nenhum lead nesta etapa</div>
    </LoadingState.NoData>

    {leads.map((lead) => (lead.id ? <DraggableLead key={lead.id} lead={lead} /> : null))}
    <div ref={sentinelRef} className="h-[1px]" />
    {isFetchingNextPage && <Skeleton className="h-[120px] w-full" />}
  </LoadingState>
);
