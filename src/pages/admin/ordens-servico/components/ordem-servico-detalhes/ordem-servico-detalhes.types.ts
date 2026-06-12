import type { OrdemServico } from "../../OrdensServico";

export type TipoServico = OrdemServico["tipoServico"];

export interface OrdemServicoVariationsCardsProps {
  ordem: OrdemServico;
}
