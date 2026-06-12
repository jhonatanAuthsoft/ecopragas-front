import type { OrdemServico } from "../../OrdensServico";
import { OS_MOCKS } from "../../ordens-servico.mock";

export const ORDEM_SERVICO_DETALHES_MOCKS: OrdemServico[] = OS_MOCKS;

export const getOrdemServicoDetalhesById = (id: string): OrdemServico => {
  return ORDEM_SERVICO_DETALHES_MOCKS.find((os) => os.id === id) ?? ORDEM_SERVICO_DETALHES_MOCKS[3];
};
