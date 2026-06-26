import { Search } from "lucide-react";
import { useRef } from "react";
import type { SelectInputOption } from "@/atomic/atm.select-input";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { cn } from "@/lib/utils";

interface InfiniteSelectContentProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  options: SelectInputOption[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  emptyMessage?: string;
  renderOption: (option: SelectInputOption) => React.ReactNode;
}

export const InfiniteSelectContent = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar",
  options,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
  emptyMessage = "Nenhum resultado encontrado",
  renderOption,
}: InfiniteSelectContentProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useInfiniteScroll({
    rootRef: scrollRef,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore,
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-sm border-b border-grayscale-light px-sm py-xs">
        <Search className="size-md shrink-0 text-grayscale-medium" />
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="h-[36px] w-full bg-transparent text-xs outline-none placeholder:text-grayscale-medium"
          autoComplete="off"
        />
      </div>

      <div
        ref={scrollRef}
        className="max-h-60 overflow-y-auto overscroll-contain custom-scrollbar p-xs"
        onWheel={(event) => event.stopPropagation()}
      >
        {isLoading ? (
          <div className="space-y-xs p-xs">
            {Array.from({ length: 4 }, (_, index) => {
              const key = `infinite-select-skeleton-${index}`;
              return <Skeleton key={key} className="h-[32px] w-full" />;
            })}
          </div>
        ) : options.length === 0 ? (
          <p className="px-sm py-md text-center text-xs text-grayscale-medium">{emptyMessage}</p>
        ) : (
          <ul className="flex flex-col gap-2xs">{options.map((option) => renderOption(option))}</ul>
        )}

        <div ref={sentinelRef} className="h-[1px]" />
        {isFetchingNextPage && (
          <div className="p-xs">
            <Skeleton className="h-[32px] w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export const infiniteSelectOptionClassName = (isSelected: boolean) =>
  cn(
    "flex w-full cursor-pointer items-center gap-sm rounded-sm px-sm py-xs text-left text-xs outline-none",
    "hover:bg-feedback-success-light focus:bg-feedback-success-light",
    isSelected && "text-brand-primary-dark bg-feedback-success-light",
  );
