import type { OrdemServico } from "@/model/rest/ordem-servico";

export type TipoServico = OrdemServico["tipoServico"];

export interface OrdemServicoVariationsCardsProps {
  ordem: OrdemServico;
}
