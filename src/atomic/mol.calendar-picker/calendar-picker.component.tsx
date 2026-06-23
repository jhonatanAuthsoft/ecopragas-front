import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Separator } from "@/atomic/atm.separator/separator.component";
import { Switch } from "@/atomic/atm.switch/switch.component";
import { TextInput } from "@/atomic/atm.text-input";
import { Body1, Body2, H2 } from "@/atomic/atm.typography";
import { cn } from "@/lib/utils";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface CalendarPickerProps {
  type?: "single" | "range";
  value?: Date | DateRange;
  onChange?: (value: Date | DateRange | null) => void;
  className?: string;
  maxDate?: Date;
}

const DAYS_OF_WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  type = "single",
  value,
  onChange,
  className,
  maxDate,
}) => {
  const [currentDate, setCurrentDate] = useState(() => {
    if (value instanceof Date) return value;
    if (value && (value as DateRange).start) return (value as DateRange).start as Date;
    return new Date();
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    return value instanceof Date ? value : null;
  });
  const [range, setRange] = useState<DateRange>(() => {
    if (value && !(value instanceof Date)) return value as DateRange;
    return { start: null, end: null };
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isRange, setIsRange] = useState(() => {
    if (value && !(value instanceof Date)) return true;
    return type === "range";
  });

  // Estados para controlar o texto digitado nos inputs
  const [inputDate, setInputDate] = useState(() => {
    return value instanceof Date ? value.toLocaleDateString("pt-BR") : "";
  });
  const [inputRange, setInputRange] = useState(() => {
    if (value && !(value instanceof Date)) {
      const r = value as DateRange;
      return {
        start: r.start ? r.start.toLocaleDateString("pt-BR") : "",
        end: r.end ? r.end.toLocaleDateString("pt-BR") : "",
      };
    }
    return { start: "", end: "" };
  });

  // Estados de erro para os inputs
  const [inputError, setInputError] = useState(false);
  const [inputRangeError, setInputRangeError] = useState({
    start: false,
    end: false,
  });

  useEffect(() => {
    setIsRange(type === "range");
  }, [type]);

  // Sincroniza os inputs quando as datas mudam via clique no calendário
  useEffect(() => {
    if (selectedDate) {
      setInputDate(selectedDate.toLocaleDateString("pt-BR"));
      setInputError(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    setInputRange({
      start: range.start ? range.start.toLocaleDateString("pt-BR") : "",
      end: range.end ? range.end.toLocaleDateString("pt-BR") : "",
    });
    setInputRangeError({ start: false, end: false });
  }, [range]);

  const viewMonth = currentDate.getMonth();
  const viewYear = currentDate.getFullYear();

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const days = [];
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0).getDate();

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(viewYear, viewMonth, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(viewYear, viewMonth, i),
        isCurrentMonth: true,
      });
    }

    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(viewYear, viewMonth + 1, i),
        isCurrentMonth: false,
      });
    }
    return days;
  }, [viewMonth, viewYear]);

  const handlePrevMonth = () => setCurrentDate(new Date(viewYear, viewMonth - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(viewYear, viewMonth + 1, 1));

  const isSameDay = (d1: Date, d2: Date | null) => {
    if (!d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isBetween = (date: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false;
    const d = date.getTime();
    const s = start.getTime();
    const e = end.getTime();
    return d > Math.min(s, e) && d < Math.max(s, e);
  };

  const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;

    if (maxDate && date > maxDate) return;

    if (!isRange) {
      setSelectedDate(date);
      onChange?.(date);
      return;
    }
    if (!range.start || (range.start && range.end)) {
      const newRange = { start: date, end: null };
      setRange(newRange);
      onChange?.(newRange);
    } else {
      const newRange = { start: range.start, end: date };
      setRange(newRange);
      onChange?.(newRange);
    }
  };

  const parseDate = (value: string): Date | null => {
    let day, month, year;

    if (value.includes("/")) {
      const parts = value.split("/");
      if (parts.length !== 3) return null;
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      year = parseInt(parts[2], 10);
    } else if (value.length === 8 && /^\d+$/.test(value)) {
      day = parseInt(value.substring(0, 2), 10);
      month = parseInt(value.substring(2, 4), 10) - 1;
      year = parseInt(value.substring(4, 8), 10);
    } else {
      return null;
    }

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    const date = new Date(year, month, day);
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  };

  const handleBlur = (rangePart?: "start" | "end") => {
    const valueStr = !isRange
      ? inputDate
      : rangePart === "start"
        ? inputRange.start
        : inputRange.end;

    if (!valueStr) {
      if (!isRange) {
        setSelectedDate(null);
        setInputError(false);
        onChange?.(null);
      } else {
        const newRange = { ...range };
        if (rangePart === "start") {
          newRange.start = null;
          setInputRangeError((prev) => ({ ...prev, start: false }));
        } else {
          newRange.end = null;
          setInputRangeError((prev) => ({ ...prev, end: false }));
        }
        setRange(newRange);
        onChange?.(newRange);
      }
      return;
    }

    const newDate = parseDate(valueStr);

    if (newDate) {
      if (maxDate && newDate > maxDate) {
        if (!isRange) setInputError(true);
        else if (rangePart === "start") setInputRangeError((prev) => ({ ...prev, start: true }));
        else setInputRangeError((prev) => ({ ...prev, end: true }));
        return;
      }

      if (!isRange) {
        setSelectedDate(newDate);
        setCurrentDate(newDate);
        setInputError(false);
        onChange?.(newDate);
        setInputDate(newDate.toLocaleDateString("pt-BR"));
      } else {
        const newRange = { ...range };
        if (rangePart === "start") {
          if (newRange.end && newDate > newRange.end) {
            newRange.end = null;
          }
          newRange.start = newDate;
          setInputRange((prev) => ({
            ...prev,
            start: newDate.toLocaleDateString("pt-BR"),
            end: newRange.end ? newRange.end.toLocaleDateString("pt-BR") : "",
          }));
          setInputRangeError((prev) => ({ ...prev, start: false }));
        } else {
          if (newRange.start && newDate < newRange.start) {
            setInputRangeError((prev) => ({ ...prev, end: true }));
            return;
          }
          newRange.end = newDate;
          setInputRange((prev) => ({
            ...prev,
            end: newDate.toLocaleDateString("pt-BR"),
          }));
          setInputRangeError((prev) => ({ ...prev, end: false }));
        }
        setRange(newRange);
        setCurrentDate(newDate);
        if (newRange.start && newRange.end) {
          onChange?.(newRange);
        }
      }
    } else {
      if (!isRange) {
        setInputError(true);
      } else {
        if (rangePart === "start") {
          setInputRangeError((prev) => ({ ...prev, start: true }));
        } else {
          setInputRangeError((prev) => ({ ...prev, end: true }));
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center w-[366px] bg-background rounded-small px-md pb-md pt-xs gap-2 shadow-dropshadow border border-grayscale-light",
        className,
      )}
    >
      {!isRange ? (
        <TextInput
          value={inputDate}
          onChange={(val) => {
            setInputDate(val);
            if (inputError) setInputError(false);
          }}
          onBlur={() => handleBlur()}
          onKeyDown={handleKeyDown}
          invalid={inputError}
          error={inputError ? "Data inválida" : undefined}
          placeholder="DD/MM/AAAA"
          className="bg-background! rounded-xl! px-md! py-sm! h-auto!"
          id="calendar-single-input"
        />
      ) : (
        <div className="flex gap-xs self-stretch">
          <TextInput
            value={inputRange.start}
            onChange={(val) => {
              setInputRange((prev) => ({ ...prev, start: val }));
              if (inputRangeError.start) setInputRangeError((prev) => ({ ...prev, start: false }));
            }}
            onBlur={() => handleBlur("start")}
            onKeyDown={handleKeyDown}
            invalid={inputRangeError.start}
            error={inputRangeError.start ? "Data inválida" : undefined}
            placeholder="DD/MM/AAAA"
            className="bg-transparent! rounded-xl! px-md! py-sm! h-auto!"
            id="calendar-range-start"
          />
          <TextInput
            value={inputRange.end}
            onChange={(val) => {
              setInputRange((prev) => ({ ...prev, end: val }));
              if (inputRangeError.end) setInputRangeError((prev) => ({ ...prev, end: false }));
            }}
            onBlur={() => handleBlur("end")}
            onKeyDown={handleKeyDown}
            invalid={inputRangeError.end}
            error={inputRangeError.end ? "Data inválida" : undefined}
            placeholder="DD/MM/AAAA"
            className="bg-transparent! rounded-xl! px-md! py-sm! h-auto!"
            id="calendar-range-end"
          />
        </div>
      )}

      <div className="flex items-center justify-between w-full px-1">
        <H2 className="text-grayscale-dark! leading-snug">
          {MONTHS[viewMonth]}, {viewYear}
        </H2>
        <div className="flex items-center gap-[12px]">
          <button
            onClick={handlePrevMonth}
            className="flex items-center justify-center text-grayscale-dark hover:text-brand-primary-medium transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextMonth}
            className="flex items-center justify-center text-grayscale-dark hover:text-brand-primary-medium transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 w-full">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="flex justify-center">
            <Body2 className="text-grayscale-medium">{day}</Body2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5 w-full">
        {calendarDays.map((item, idx) => {
          if (!item.isCurrentMonth) {
            return <div key={idx} className="h-9" />;
          }

          const isSelected =
            isSameDay(item.date, isRange ? range.start : selectedDate) ||
            (isRange && isSameDay(item.date, range.end));

          const inRange =
            isRange &&
            (isBetween(item.date, range.start, range.end) ||
              (range.start &&
                !range.end &&
                hoverDate &&
                isBetween(item.date, range.start, hoverDate)));

          const isStart = isRange && range.start && isSameDay(item.date, range.start);
          const isEnd = isRange && range.end && isSameDay(item.date, range.end);

          const isDisabled = maxDate && item.date > maxDate;

          return (
            <div
              key={idx}
              onClick={() => !isDisabled && handleDayClick(item.date, item.isCurrentMonth)}
              onMouseEnter={() => !isDisabled && setHoverDate(item.date)}
              onMouseLeave={() => setHoverDate(null)}
              className={cn(
                "relative h-9 flex items-center justify-center transition-all",
                !isDisabled && "cursor-pointer",
                isDisabled && "cursor-not-allowed opacity-30",
                inRange && "bg-brand-primary-light/20 text-brand-primary-dark",
                isSelected && "bg-brand-primary-medium text-grayscale-white rounded-small z-10",
                !isSelected && !isDisabled && "hover:bg-grayscale-x-light hover:rounded-small",
                isStart && range.end && "rounded-r-none",
                isEnd && "rounded-l-none",
              )}
            >
              <Body1
                className={cn(
                  isSelected
                    ? "text-grayscale-white!"
                    : inRange
                      ? "text-brand-primary-dark"
                      : "text-grayscale-dark",
                )}
              >
                {item.date.getDate()}
              </Body1>
            </div>
          );
        })}
      </div>

      <Separator />

      <div className="flex items-center justify-between w-full px-1">
        <Body2 className="text-grayscale-dark">Data de término</Body2>
        <Switch checked={isRange} onCheckedChange={(checked) => setIsRange(checked)} />
      </div>
    </div>
  );
};
