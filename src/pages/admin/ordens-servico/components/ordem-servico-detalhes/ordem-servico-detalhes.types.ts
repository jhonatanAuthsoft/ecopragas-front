import type { OrdemServicoMock } from "@/model/rest/ordem-servico/ordem-servico.mock.model";

export type TipoServico = OrdemServicoMock["tipoServico"];

export interface OrdemServicoVariationsCardsProps {
  ordem: OrdemServicoMock;
}
