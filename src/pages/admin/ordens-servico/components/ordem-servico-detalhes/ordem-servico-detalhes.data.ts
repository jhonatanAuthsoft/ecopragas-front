import type { OrdemServicoMock } from "@/model/rest/ordem-servico/ordem-servico.mock.model";
import { OS_MOCKS } from "../../ordens-servico.mock";

export const ORDEM_SERVICO_DETALHES_MOCKS: OrdemServicoMock[] = OS_MOCKS;

export const getOrdemServicoDetalhesById = (id: string): OrdemServicoMock => {
  return ORDEM_SERVICO_DETALHES_MOCKS.find((os) => os.id === id) ?? ORDEM_SERVICO_DETALHES_MOCKS[3];
};
