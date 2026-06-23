import type { ClienteUltimoServico } from "@/model/rest/cliente";

export const TIPO_SERVICO_LABELS: Record<ClienteUltimoServico["tipoServico"], string> = {
  DEDETIZACAO: "Dedetização",
  LIMPEZA_CAIXA_AGUA: "Limpeza de Caixa d'água",
  SANITIZACAO: "Sanitização",
  DESRATIZACAO: "Desratização",
  OUTROS: "Outros",
};
