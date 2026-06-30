export const formatBoolean = (value?: boolean) => {
  if (value === undefined) {
    return "-";
  }
  return value ? "Sim" : "Não";
};

export const formatStringList = (values?: string[]) => {
  if (!values?.length) {
    return "-";
  }
  return values.join(", ");
};

export const buildDetailRowKey = (...parts: (string | number | undefined | null)[]) =>
  parts.filter((part) => part != null && part !== "").join("-");
