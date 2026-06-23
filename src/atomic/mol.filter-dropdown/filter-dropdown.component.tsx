import { Check, ChevronDown } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Body2 } from "@/atomic/atm.typography";
import { cn } from "@/lib/utils";

export interface FilterDropdownOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: FilterDropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Filtrar",
  icon,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      className={cn("relative inline-block text-left w-full md:w-auto", className)}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-between w-full rounded-small border border-grayscale-light p-md bg-background text-sm font-medium text-grayscale-dark hover:bg-grayscale-x-light focus:outline-none transition-colors shadow-sm"
      >
        <div className="flex items-center gap-xs min-w-0">
          {icon && (
            <span className="text-grayscale-medium size-md flex items-center shrink-0">{icon}</span>
          )}
          <Body2 className="text-grayscale-dark font-medium whitespace-nowrap">
            {selectedLabel ?? placeholder}
          </Body2>
        </div>
        <ChevronDown
          className={cn(
            "size-md text-grayscale-medium ml-xs transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 md:left-0 mt-xs z-50 min-w-full rounded-md border border-grayscale-light bg-popover shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-feedback-success-light hover:text-brand-primary-dark transition-colors"
              >
                {value === option.value && (
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4 text-brand-primary-medium" />
                  </span>
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
