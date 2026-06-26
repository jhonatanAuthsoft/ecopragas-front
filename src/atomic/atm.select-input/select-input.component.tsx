import { forwardRef } from "react";
import { Body2 } from "@/atomic/atm.typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/atomic/mol.select/select.component";
import { cn } from "@/lib/utils";
import { Separator } from "../obj.separator";

// TODO: deixar mais reutilizável
export interface SelectInputOption {
  value: string;
  label: string;
}

export interface SelectInputProps extends Omit<React.ComponentProps<"select">, "onChange"> {
  label?: string;
  placeholder?: string;
  options: SelectInputOption[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
  triggerClassName?: string;
}

export const SelectInput = forwardRef<HTMLButtonElement, SelectInputProps>(
  (
    {
      label,
      placeholder,
      options,
      value,
      onChange,
      onBlur,
      invalid,
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
      <Select
        value={value || undefined}
        onValueChange={(nextValue) => onChange?.(nextValue)}
        disabled={disabled}
      >
        <SelectTrigger
          ref={ref}
          id={id}
          onBlur={onBlur}
          className={cn(
            "rounded-lg h-[55px] mb-0 text-xs",
            value ? "text-grayscale-x-dark" : "text-grayscale-medium",
            invalid ? "border-feedback-error-medium" : "border-grayscale-light",
            disabled && "bg-grayscale-light opacity-70!",
            triggerClassName,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length <= 0 ? (
            <Body2 className="p-xs text-grayscale-dark">Nenhum resultado encontrado</Body2>
          ) : (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  ),
);

SelectInput.displayName = "SelectInput";
