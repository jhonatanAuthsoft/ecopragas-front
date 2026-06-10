import type { OrdemServico } from "../../OrdensServico";

// TODO: organizar tipos
export type OrdemServicoDetalhesData = OrdemServico & {
  clienteCpfCnpj: string;
  clienteTelefone: string;
};
