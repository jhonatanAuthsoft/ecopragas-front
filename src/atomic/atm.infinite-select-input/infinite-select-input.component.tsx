import { ChevronDown } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";
import type { SelectInputOption } from "@/atomic/atm.select-input";
import { Popover, PopoverContent, PopoverTrigger } from "@/atomic/mol.popover/popover.component";
import { Separator } from "@/atomic/obj.separator";
import { type InfiniteSelectQueryConfig, useInfiniteListQuery } from "@/domain/infinite-list";
import { cn } from "@/lib/utils";
import {
  InfiniteSelectContent,
  infiniteSelectOptionClassName,
} from "./infinite-select-content.component";

export interface InfiniteSelectInputProps<TItem> {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  queryConfig: InfiniteSelectQueryConfig<TItem>;
  value?: string;
  onChange?: (value: string) => void;
  onOptionSelect?: (option: SelectInputOption) => void;
  onItemSelect?: (item: TItem) => void;
  onBlur?: () => void;
  invalid?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  triggerClassName?: string;
}

export const InfiniteSelectInput = forwardRef(
  <TItem,>(
    {
      label,
      placeholder,
      searchPlaceholder,
      emptyMessage,
      queryConfig,
      value,
      onChange,
      onOptionSelect,
      onItemSelect,
      onBlur,
      invalid,
      disabled,
      id,
      className,
      triggerClassName,
    }: InfiniteSelectInputProps<TItem>,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedLabels, setSelectedLabels] = useState<Record<string, string>>({});

    const { items, options, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
      useInfiniteListQuery(queryConfig, searchText);

    const displayText = useMemo(() => {
      if (!value) {
        return placeholder;
      }

      const cachedLabel = selectedLabels[value];
      if (cachedLabel) {
        return cachedLabel;
      }

      return options.find((option) => option.value === value)?.label ?? placeholder;
    }, [value, placeholder, selectedLabels, options]);

    const handleSelect = (option: SelectInputOption) => {
      setSelectedLabels((current) => ({ ...current, [option.value]: option.label }));
      onChange?.(option.value);
      onOptionSelect?.(option);

      const selectedItem = items.find(
        (item) => queryConfig.mapToOption(item).value === option.value,
      );
      if (selectedItem) {
        onItemSelect?.(selectedItem);
      }

      setOpen(false);
      setSearchText("");
    };

    const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);

      if (!nextOpen) {
        setSearchText("");
      }
    };

    return (
      <div className={cn("space-y-2 w-full", className)}>
        {label && (
          <>
            <div className="flex items-center justify-between gap-xs">
              <label htmlFor={id} className="w-full">
                <p className="text-xs font-normal">{label}</p>
              </label>
            </div>
            <Separator size="xs" />
          </>
        )}
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <button
              ref={ref}
              id={id}
              type="button"
              disabled={disabled}
              onBlur={onBlur}
              className={cn(
                "flex h-[55px] w-full items-center justify-between gap-sm rounded-lg border bg-background px-md text-left text-xs cursor-pointer",
                value ? "text-grayscale-x-dark" : "text-grayscale-medium",
                invalid ? "border-feedback-error-medium" : "border-grayscale-light",
                disabled && "cursor-not-allowed bg-grayscale-light opacity-70",
                triggerClassName,
              )}
            >
              <span className="flex-1 truncate">{displayText}</span>
              <ChevronDown className="size-md shrink-0 text-grayscale-medium" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] overflow-hidden p-0"
            align="start"
          >
            <InfiniteSelectContent
              searchValue={searchText}
              onSearchChange={setSearchText}
              searchPlaceholder={searchPlaceholder}
              options={options}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              onLoadMore={fetchNextPage}
              emptyMessage={emptyMessage}
              renderOption={(option) => {
                const isSelected = value === option.value;

                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => handleSelect(option)}
                      className={infiniteSelectOptionClassName(isSelected)}
                    >
                      <span className="truncate">{option.label}</span>
                    </button>
                  </li>
                );
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
) as <TItem>(
  props: InfiniteSelectInputProps<TItem> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => React.ReactElement;

(InfiniteSelectInput as React.FC).displayName = "InfiniteSelectInput";
