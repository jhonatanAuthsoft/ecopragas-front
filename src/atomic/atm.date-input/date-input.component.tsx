import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";
import { forwardRef } from "react";
import { CalendarIcon } from "@/assets/icons/calendar";
import { Caption } from "@/atomic/atm.caption";
import { Calendar } from "@/atomic/mol.calendar/calendar.component";
import { Popover, PopoverContent, PopoverTrigger } from "@/atomic/mol.popover/popover.component";
import { Separator } from "@/atomic/obj.separator";
import { cn } from "@/lib/utils";

export interface DateInputProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  onBlur?: () => void;
  invalid?: boolean;
  error?: string;
  disabled?: boolean;
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
      id,
      className,
      triggerClassName,
    },
    ref,
  ) => (
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
              "flex h-[55px] w-full items-center gap-sm rounded-lg border bg-background px-md text-left text-xs",
              value ? "text-grayscale-x-dark" : "text-grayscale-medium",
              invalid ? "border-feedback-error-medium" : "border-grayscale-light",
              disabled && "cursor-not-allowed bg-grayscale-light opacity-70",
              triggerClassName,
            )}
          >
            <CalendarIcon className="size-lg shrink-0 text-grayscale-medium" />
            <span className="flex-1 truncate">
              {value ? format(value, "dd/MM/yyyy", { locale: ptBR }) : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={value} onSelect={onChange} locale={ptBR} initialFocus />
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
  ),
);

DateInput.displayName = "DateInput";
