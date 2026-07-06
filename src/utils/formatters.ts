import type { OrdemServico } from "@/model/rest/ordem-servico";

export const formatCPFCNPJ = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length <= 11) {
    return cleanValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  } else {
    return cleanValue
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
};

export const formatPhone = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  } else {
    return cleanValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }
};

export const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

export const cleanDigits = (value: string) => {
  return value.replace(/\D/g, "");
};

export const formatCurrency = (value?: string | number | null): string => {
  if (value === undefined || value === null) value = 0;
  const numberValue = typeof value === "number" ? value : Number(value.replace(/\D/g, "")) / 100;

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatCurrencyNumber = (value?: string | number | null): number => {
  if (value === undefined || value === null) return 0;
  if (typeof value === "number") return value;

  const digits = cleanDigits(value);
  if (!digits) return 0;

  return Number(digits) / 100;
};

export const formatNumber = (value: string) => {
  return value.replace(/\D/g, "");
};

export const formatTime = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (!digits) {
    return "";
  }

  if (digits.length <= 2) {
    const hours = Number(digits);

    if (digits.length === 2 && hours > 23) {
      return "23";
    }

    return digits;
  }

  let hours = digits.slice(0, 2);
  let minutes = digits.slice(2, 4);

  if (Number(hours) > 23) {
    hours = "23";
  }

  if (minutes.length === 2 && Number(minutes) > 59) {
    minutes = "59";
  }

  return `${hours}:${minutes}`;
};

export const formatDateInput = (value: string): string => {
  const digits = cleanDigits(value).slice(0, 8);

  if (!digits) {
    return "";
  }

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

export const parseDateInput = (value: string): Date | null => {
  const digits = cleanDigits(value);

  if (digits.length !== 8) {
    return null;
  }

  const day = Number(digits.slice(0, 2));
  const month = Number(digits.slice(2, 4)) - 1;
  const year = Number(digits.slice(4, 8));

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return null;
  }

  const date = new Date(year, month, day);

  if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
    return date;
  }

  return null;
};

export const formatDateDisplay = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};

export const formatYesNo = (value?: boolean) => {
  if (value === undefined) return "-";
  return value ? "Sim" : "Não";
};

export const formatPercentValue = (value?: number, decimals = 0): string => {
  return `${(value ?? 0).toFixed(decimals)}%`;
};

export const TIPO_SERVICO_LABELS: Record<OrdemServico["tipoServico"], string> = {
  SANITIZACAO: "Sanitização",
  CONTROLE_PRAGAS_VETORES: "Controle de Pragas e Vetores",
  HIGIENIZACAO: "Higienização",
  MONITORAMENTO_INSETOS: "Monitoramento de Insetos",
  MONITORAMENTO_ROEDORES: "Monitoramento de Roedores",
};

export const formatTipoServico = (tipo?: string | null): string => {
  if (!tipo) return "Serviço";
  return (
    TIPO_SERVICO_LABELS[tipo] ?? TIPO_SERVICO_LABELS[tipo.toUpperCase()] ?? tipo.replace(/_/g, " ")
  );
};

export const getStatusBadgeClass = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("agendada") || s.includes("agendado")) {
    return "bg-grayscale-light text-grayscale-dark border-grayscale-medium";
  }
  if (s.includes("andamento")) {
    return "bg-feedback-warning-light text-feedback-warning-dark border-brand-accessory-orange";
  }
  if (
    s.includes("concluída") ||
    s.includes("concluida") ||
    s.includes("concluido") ||
    s.includes("concluído")
  ) {
    return "bg-feedback-success-light text-feedback-success-dark border-feedback-success-medium";
  }
  if (s.includes("cancelada") || s.includes("cancelado")) {
    return "bg-feedback-error-light text-feedback-error-dark border-feedback-error-medium";
  }
  return "bg-grayscale-light text-grayscale-dark border-grayscale-medium";
};
