import * as z from "zod";
import type { LoginRequest } from "@/model/rest/auth";
import { formatCPFCNPJ } from "@/utils/formatters";
import type { LoginFormValues, LoginIdentifierType } from "./login-form.types";

export function detectLoginIdentifierType(value: string): LoginIdentifierType {
  const trimmed = value.trim();
  if (!trimmed) return "email";

  if (/[a-zA-Z@]/.test(trimmed)) return "email";

  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length > 0) return "cpf";

  return "email";
}

export function formatLoginUsername(value: string): string {
  if (detectLoginIdentifierType(value) === "cpf") {
    return formatCPFCNPJ(value);
  }
  return value;
}

export function validateLoginUsername(value: string): true | string {
  if (!value?.trim()) return true;

  const type = detectLoginIdentifierType(value);

  if (type === "email") {
    const result = z.string().email().safeParse(value.trim());
    return result.success || "O e-mail deve ser valido.";
  }

  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11) {
    return "O CPF deve conter 11 digitos.";
  }

  return true;
}

function normalizeUsername(value: string, type: LoginIdentifierType): string {
  if (type === "cpf") {
    return value.replace(/\D/g, "");
  }
  return value.trim();
}

export function buildLoginRequest(values: LoginFormValues): LoginRequest {
  const identifierType = detectLoginIdentifierType(values.username);

  return {
    username: normalizeUsername(values.username, identifierType),
    password: values.password,
  };
}
