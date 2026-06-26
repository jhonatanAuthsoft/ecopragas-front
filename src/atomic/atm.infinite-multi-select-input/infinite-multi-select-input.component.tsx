import { Check, ChevronDown } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";
import {
  InfiniteSelectContent,
  infiniteSelectOptionClassName,
} from "@/atomic/atm.infinite-select-input/infinite-select-content.component";
import type { SelectInputOption } from "@/atomic/atm.select-input";
import { Popover, PopoverContent, PopoverTrigger } from "@/atomic/mol.popover/popover.component";
import { Separator } from "@/atomic/obj.separator";
import { type InfiniteSelectQueryConfig, useInfiniteListQuery } from "@/domain/infinite-list";
import { cn } from "@/lib/utils";

export interface InfiniteMultiSelectInputProps<TItem> {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  queryConfig: InfiniteSelectQueryConfig<TItem>;
  value?: string[];
  onChange?: (value: string[]) => void;
  onOptionsChange?: (options: SelectInputOption[]) => void;
  onBlur?: () => void;
  invalid?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  triggerClassName?: string;
}

export const InfiniteMultiSelectInput = forwardRef(
  <TItem,>(
    {
      label,
      placeholder,
      searchPlaceholder = "Buscar",
      emptyMessage,
      queryConfig,
      value = [],
      onChange,
      onOptionsChange,
      onBlur,
      invalid,
      disabled,
      id,
      className,
      triggerClassName,
    }: InfiniteMultiSelectInputProps<TItem>,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedLabels, setSelectedLabels] = useState<Record<string, string>>({});
    const selectedValues = value ?? [];

    const { options, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
      useInfiniteListQuery(queryConfig, searchText);

    const sortedOptions = useMemo(() => {
      const selectedSet = new Set(selectedValues);
      const selected = selectedValues
        .map((optionValue) => {
          const cachedLabel = selectedLabels[optionValue];
          const loadedOption = options.find((option) => option.value === optionValue);

          if (cachedLabel) {
            return { value: optionValue, label: cachedLabel };
          }

          return loadedOption;
        })
        .filter((option): option is SelectInputOption => option != null);
      const unselected = options.filter((option) => !selectedSet.has(option.value));

      return [...selected, ...unselected];
    }, [options, selectedLabels, selectedValues]);

    const displayText = useMemo(() => {
      if (selectedValues.length === 0) {
        return placeholder;
      }

      return selectedValues
        .map((optionValue) => {
          const cachedLabel = selectedLabels[optionValue];
          if (cachedLabel) {
            return cachedLabel;
          }

          return options.find((option) => option.value === optionValue)?.label;
        })
        .filter(Boolean)
        .join(", ");
    }, [options, placeholder, selectedLabels, selectedValues]);

    const toggleOption = (option: SelectInputOption) => {
      const nextValue = selectedValues.includes(option.value)
        ? selectedValues.filter((item) => item !== option.value)
        : [...selectedValues, option.value];

      const nextLabels = { ...selectedLabels, [option.value]: option.label };
      setSelectedLabels(nextLabels);
      onChange?.(nextValue);
      onOptionsChange?.(
        nextValue.map((optionValue) => ({
          value: optionValue,
          label: nextLabels[optionValue] ?? optionValue,
        })),
      );
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
                selectedValues.length > 0 ? "text-grayscale-x-dark" : "text-grayscale-medium",
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
              options={sortedOptions}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              onLoadMore={fetchNextPage}
              emptyMessage={emptyMessage}
              renderOption={(option) => {
                const isSelected = selectedValues.includes(option.value);

                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleOption(option)}
                      className={infiniteSelectOptionClassName(isSelected)}
                    >
                      <span
                        className={cn(
                          "flex size-md shrink-0 items-center justify-center rounded-sm border",
                          isSelected
                            ? "border-brand-primary-dark bg-brand-primary-dark text-primary-foreground"
                            : "border-grayscale-light",
                        )}
                      >
                        {isSelected && <Check className="size-sm" />}
                      </span>
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
  props: InfiniteMultiSelectInputProps<TItem> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => React.ReactElement;

(InfiniteMultiSelectInput as React.FC).displayName = "InfiniteMultiSelectInput";
