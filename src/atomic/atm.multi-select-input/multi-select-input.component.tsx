import { Check, ChevronDown } from "lucide-react";
import { forwardRef, useMemo } from "react";
import type { SelectInputOption } from "@/atomic/atm.select-input";
import { Popover, PopoverContent, PopoverTrigger } from "@/atomic/mol.popover/popover.component";
import { Separator } from "@/atomic/obj.separator";
import { cn } from "@/lib/utils";

export interface MultiSelectInputProps {
  label?: string;
  placeholder?: string;
  options: SelectInputOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  invalid?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  triggerClassName?: string;
}

export const MultiSelectInput = forwardRef<HTMLButtonElement, MultiSelectInputProps>(
  (
    {
      label,
      placeholder,
      options,
      value = [],
      onChange,
      onBlur,
      invalid,
      disabled,
      id,
      className,
      triggerClassName,
    },
    ref,
  ) => {
    const selectedValues = value ?? [];

    const sortedOptions = useMemo(() => {
      const selectedSet = new Set(selectedValues);
      const selected = selectedValues
        .map((optionValue) => options.find((option) => option.value === optionValue))
        .filter((option): option is SelectInputOption => option != null);
      const unselected = options.filter((option) => !selectedSet.has(option.value));

      return [...selected, ...unselected];
    }, [options, selectedValues]);

    const displayText = useMemo(() => {
      if (selectedValues.length === 0) {
        return placeholder;
      }

      return options
        .filter((option) => selectedValues.includes(option.value))
        .map((option) => option.label)
        .join(", ");
    }, [options, placeholder, selectedValues]);

    const toggleOption = (optionValue: string) => {
      const nextValue = selectedValues.includes(optionValue)
        ? selectedValues.filter((item) => item !== optionValue)
        : [...selectedValues, optionValue];

      onChange?.(nextValue);
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
        <Popover>
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
            <div
              className="max-h-60 overflow-y-auto overscroll-contain custom-scrollbar p-xs"
              onWheel={(event) => event.stopPropagation()}
            >
              <ul>
                {sortedOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value);

                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => toggleOption(option.value)}
                        className={cn(
                          "flex w-full cursor-pointer items-center gap-sm rounded-sm px-sm py-xs text-left text-xs outline-none",
                          "hover:bg-feedback-success-light focus:bg-feedback-success-light",
                          isSelected && "text-brand-primary-dark",
                        )}
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
                })}
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

MultiSelectInput.displayName = "MultiSelectInput";
