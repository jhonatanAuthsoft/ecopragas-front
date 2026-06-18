import * as z from "zod";
import type { LoginInput } from "@/model/rest/auth";
import { formatCPFCNPJ } from "@/utils/formatters";
import type { LoginIdentifierType } from "./login-form.types";

export function detectLoginIdentifierType(value: string): LoginIdentifierType {
  const trimmed = value.trim();
  if (!trimmed) return "email";

  if (/[a-zA-Z@]/.test(trimmed)) return "email";

  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length > 0) return "cpf";

  return "email";
}

export function formatLoginField(value: string): string {
  if (detectLoginIdentifierType(value) === "cpf") {
    return formatCPFCNPJ(value);
  }
  return value;
}

export function validateLoginField(value: string): true | string {
  if (!value?.trim()) return true;

  const type = detectLoginIdentifierType(value);

  if (type === "email") {
    const result = z.string().email().safeParse(value.trim());
    return result.success || "O e-mail deve ser valido.";
  }

  // TODO: validar CPF
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11) {
    return "O CPF deve conter 11 digitos.";
  }

  return true;
}

function normalizeLogin(value: string, type: LoginIdentifierType): string {
  if (type === "cpf") {
    return value.replace(/\D/g, "");
  }
  return value.trim();
}

export function buildLoginRequest(values: LoginInput): LoginInput {
  const identifierType = detectLoginIdentifierType(values.login);

  return {
    login: normalizeLogin(values.login, identifierType),
    senha: values.senha,
  };
}
