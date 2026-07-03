import type { ClienteUltimoServico } from "@/model/rest/cliente";

export const TIPO_SERVICO_LABELS: Record<ClienteUltimoServico["tipoServico"], string> = {
  CONTROLE_PRAGAS_VETORES: "Controle de Pragas Vetores",
  HIGIENIZACAO: "Higiênização",
  MONITORAMENTO_INSETOS: "Monitoramento de Insetos",
  MONITORAMENTO_ROEDORES: "Monitoramento de Roedores",
  SANITIZACAO: "Sanitização",
};
