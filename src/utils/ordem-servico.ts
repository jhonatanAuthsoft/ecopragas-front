import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";

export const formatEnderecoFromOrdemServico = (ordemServico?: OrdemServico): string => {
  if (!ordemServico) {
    return "";
  }

  const rua = [ordemServico.rua, ordemServico.numero].filter(Boolean).join(", ");
  const cidade = [ordemServico.bairro, ordemServico.cidade, ordemServico.estado]
    .filter(Boolean)
    .join(" - ");

  return [rua, cidade].filter(Boolean).join(" | ");
};
