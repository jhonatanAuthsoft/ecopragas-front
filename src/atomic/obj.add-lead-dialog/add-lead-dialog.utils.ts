import type { CadastrarLeadRequest } from "@/model/rest/lead";
import { cleanDigits, formatCurrencyNumber } from "@/utils/formatters";

export const buildCadastrarLeadInput = (values: CadastrarLeadRequest): CadastrarLeadRequest => ({
  ...values,
  telefone: values.telefone ? cleanDigits(values.telefone) : values.telefone,
  valorEstimado: formatCurrencyNumber(values.valorEstimado),
});
