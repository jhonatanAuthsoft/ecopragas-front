import { X } from "lucide-react";
import { forwardRef, type MouseEvent, useState } from "react";
import { CalendarIcon } from "@/assets/icons/calendar";
import { Caption } from "@/atomic/atm.caption";
import { CalendarPicker } from "@/atomic/mol.calendar-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/atomic/mol.popover/popover.component";
import { Separator } from "@/atomic/obj.separator";
import { cn } from "@/lib/utils";
import { DATE_INPUT_MAX_DATE, DATE_INPUT_MIN_DATE, isDayDisabled } from "@/utils/date-time";
import { formatDateDisplay } from "@/utils/formatters";

export interface DateInputProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  onBlur?: () => void;
  invalid?: boolean;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  id?: string;
  className?: string;
  triggerClassName?: string;
}

export const DateInput = forwardRef<HTMLButtonElement, DateInputProps>(
  (
    {
      label,
      placeholder = "00/00/0000",
      value,
      onChange,
      onBlur,
      invalid,
      error,
      disabled,
      minDate: minDateProp,
      maxDate: maxDateProp,
      id,
      className,
      triggerClassName,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const minDate = minDateProp ?? DATE_INPUT_MIN_DATE;
    const maxDate = maxDateProp ?? DATE_INPUT_MAX_DATE;

    const handlePopoverMouseDown = (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea")) return;
      event.preventDefault();
    };

    const handleDateChange = (newValue: Date | { start: Date | null; end: Date | null } | null) => {
      if (newValue instanceof Date) {
        if (isDayDisabled(newValue, minDate, maxDate)) return;

        onChange?.(newValue);
        setOpen(false);
        return;
      }

      if (newValue === null) {
        onChange?.(undefined);
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
        <Popover
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);
            if (!nextOpen) onBlur?.();
          }}
        >
          <PopoverTrigger asChild>
            <button
              ref={ref}
              id={id}
              type="button"
              disabled={disabled}
              className={cn(
                "flex h-[55px] w-full items-center gap-sm rounded-lg border bg-background px-md text-left text-xs",
                value ? "text-grayscale-x-dark" : "text-grayscale-medium",
                invalid ? "border-feedback-error-medium" : "border-grayscale-light",
                disabled && "cursor-not-allowed bg-grayscale-light opacity-70",
                triggerClassName,
              )}
            >
              <CalendarIcon className="size-lg shrink-0 text-grayscale-medium" />
              <span className="flex-1 truncate">
                {value ? formatDateDisplay(value) : placeholder}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto border-0 bg-transparent p-0 shadow-none"
            align="start"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <div onMouseDown={handlePopoverMouseDown}>
              {open && (
                <CalendarPicker
                  key={value?.getTime() ?? "empty"}
                  type="single"
                  allowRange={false}
                  formatInput
                  value={value}
                  maxDate={maxDate}
                  onChange={handleDateChange}
                />
              )}
            </div>
          </PopoverContent>
        </Popover>

        {invalid && error && (
          <>
            <Separator size="2xs" />
            <div className="flex items-center gap-2xs">
              <X className="size-md text-feedback-error-medium" />
              <Caption htmlFor={id} status="error">
                {error}
              </Caption>
            </div>
          </>
        )}
      </div>
    );
  },
);

DateInput.displayName = "DateInput";
