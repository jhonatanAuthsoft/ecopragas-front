import type { OrdemServicoDetalhesSectionProps } from "../../../ordem-servico-detalhes.types";
import { DescricaoServicoSection, RegistroServicoSection } from "../../sections";
import { DadosProdutoSection } from "./DadosProdutoSection";
import { DiagnosticoLocalSection } from "./DiagnosticoLocalSection";

export function ControlePragasDetalhesCards({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  return (
    <>
      <DiagnosticoLocalSection ordemServico={ordemServico} />
      <DadosProdutoSection ordemServico={ordemServico} />
      <DescricaoServicoSection ordemServico={ordemServico} />
      <RegistroServicoSection ordemServico={ordemServico} />
    </>
  );
}
