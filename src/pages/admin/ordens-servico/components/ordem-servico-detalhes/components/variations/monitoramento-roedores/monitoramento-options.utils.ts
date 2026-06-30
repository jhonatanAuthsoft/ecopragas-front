import type { EstacaoMonitoramentoRoedores } from "@/model/rest/ordem-servico";
import {
  ARMADILHA_ADESIVA_ALIASES,
  ARMADILHA_ADESIVA_LABELS,
  PORTA_ISCA_RATICIDA_ALIASES,
  PORTA_ISCA_RATICIDA_LABELS,
} from "../../../ordem-servico-detalhes.labels";
import { formatStringList } from "../../sections/variation-detail.utils";

type EstacaoMonitoramentoRaw = EstacaoMonitoramentoRoedores & {
  porta_isca_raticida?: string | string[];
  armadilha_adesiva?: string | string[];
};

const normalizeOptionKey = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_");

const toOptionValues = (values: unknown): string[] => {
  if (Array.isArray(values)) {
    return values.map(String);
  }

  if (typeof values === "string" && values.length > 0) {
    return [values];
  }

  return [];
};

export const resolveMonitoramentoOptionKey = (
  rawValue: string,
  options: Record<string, string>,
  aliases: Record<string, string> = {},
): string | undefined => {
  const normalized = normalizeOptionKey(rawValue);

  if (options[normalized]) {
    return normalized;
  }

  if (aliases[normalized]) {
    return aliases[normalized];
  }

  const byLabel = Object.entries(options).find(
    ([, label]) => normalizeOptionKey(label) === normalized,
  );

  return byLabel?.[0];
};

export const toMonitoramentoOptionKeys = (
  values: unknown,
  options: Record<string, string>,
  aliases: Record<string, string> = {},
): string[] => {
  const resolvedKeys = toOptionValues(values)
    .map((value) => resolveMonitoramentoOptionKey(value, options, aliases))
    .filter((key): key is string => !!key);

  return [...new Set(resolvedKeys)];
};

export const getEstacaoPortaIscaValues = (estacao: EstacaoMonitoramentoRoedores) => {
  const rawEstacao = estacao as EstacaoMonitoramentoRaw;

  return toMonitoramentoOptionKeys(
    rawEstacao.portaIscaRaticida ?? rawEstacao.porta_isca_raticida,
    PORTA_ISCA_RATICIDA_LABELS,
    PORTA_ISCA_RATICIDA_ALIASES,
  );
};

export const getEstacaoArmadilhaAdesivaValues = (estacao: EstacaoMonitoramentoRoedores) => {
  const rawEstacao = estacao as EstacaoMonitoramentoRaw;

  return toMonitoramentoOptionKeys(
    rawEstacao.armadilhaAdesiva ?? rawEstacao.armadilha_adesiva,
    ARMADILHA_ADESIVA_LABELS,
    ARMADILHA_ADESIVA_ALIASES,
  );
};

export const formatMonitoramentoOptionList = (
  values: string[],
  options: Record<string, string>,
) => formatStringList(values.map((value) => options[value] ?? value));
