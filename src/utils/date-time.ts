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
