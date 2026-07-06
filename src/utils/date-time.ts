import { format } from "date-fns";

export interface ParsedDateTime {
  date?: Date;
  time: string;
}

export const parseDateTime = (dateTime?: string | null): ParsedDateTime => {
  if (!dateTime) {
    return { date: undefined, time: "" };
  }

  const parsed = new Date(dateTime);

  if (Number.isNaN(parsed.getTime())) {
    return { date: undefined, time: "" };
  }

  return {
    date: parsed,
    time: format(parsed, "HH:mm"),
  };
};

export const startOfDayTime = (date: Date): number => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized.getTime();
};

export const isDayBefore = (date: Date, limit: Date): boolean => {
  return startOfDayTime(date) < startOfDayTime(limit);
};

export const isDayAfter = (date: Date, limit: Date): boolean => {
  return startOfDayTime(date) > startOfDayTime(limit);
};

export const isDayDisabled = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  if (minDate && isDayBefore(date, minDate)) return true;
  if (maxDate && isDayAfter(date, maxDate)) return true;
  return false;
};

export const DATE_INPUT_MIN_DATE = new Date(2000, 0, 1);
export const DATE_INPUT_MAX_DATE = new Date(2050, 11, 31);
