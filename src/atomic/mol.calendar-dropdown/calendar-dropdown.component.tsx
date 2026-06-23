import { ChevronDown } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "@/assets/icons/calendar";
import { Body2 } from "@/atomic/atm.typography";
import { cn } from "@/lib/utils";
import { CalendarPicker } from "../mol.calendar-picker";

interface CalendarDropdownProps {
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  maxDate?: Date;
}

export const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  label = "Selecione uma data",
  value: propValue,
  onChange,
  className,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<any>(propValue || null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync internal state with propValue
  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (newValue: any) => {
    setValue(newValue);
    onChange?.(newValue);

    // Auto-close on single date selection or completed range
    if (newValue instanceof Date) {
      setIsOpen(false);
    } else if (newValue && newValue.start && newValue.end) {
      setIsOpen(false);
    }
  };

  const getSelectedText = () => {
    if (value instanceof Date) {
      return value.toLocaleDateString("pt-BR");
    }
    if (value && value.start && value.end) {
      return `${value.start.toLocaleDateString("pt-BR")} - ${value.end.toLocaleDateString("pt-BR")}`;
    }
    if (value && value.start && !value.end) {
      return `${value.start.toLocaleDateString("pt-BR")} - ...`;
    }
    return label;
  };

  return (
    <div
      className={cn("relative inline-block text-left w-full md:w-auto", className)}
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between w-full rounded-small border border-grayscale-light p-md bg-background text-sm font-medium text-grayscale-dark hover:bg-grayscale-x-light focus:outline-none transition-colors shadow-sm"
        >
          <div className="flex items-center gap-xs">
            <CalendarIcon className="text-grayscale-medium size-md" />
            <Body2 className="text-grayscale-dark font-medium">{getSelectedText()}</Body2>
          </div>
          <ChevronDown
            className={cn(
              "size-md text-grayscale-medium ml-xs transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </div>

      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <div
            className="md:hidden fixed inset-0 bg-grayscale-x-dark/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed md:absolute left-1/2 md:left-auto md:right-0 top-1/2 md:top-auto md:mt-xs -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 z-50">
            <div className="max-sm:scale-90 transform-gpu">
              <CalendarPicker
                value={value}
                type={value && value?.start ? "range" : "single"}
                onChange={handleDateChange}
                maxDate={maxDate}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarDropdown;
