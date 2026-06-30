import type { OrdemServicoDetalhesSectionProps } from "../../../ordem-servico-detalhes.types";
import { FotosLocalSection, RegistroServicoSection, ReservatoriosSection } from "../../sections";
import { DadosProdutoSection } from "./DadosProdutoSection";

export function HigienizacaoDetalhesCards({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  return (
    <>
      <DadosProdutoSection ordemServico={ordemServico} />
      <FotosLocalSection ordemServico={ordemServico} />
      <ReservatoriosSection ordemServico={ordemServico} />
      <RegistroServicoSection ordemServico={ordemServico} />
    </>
  );
}
