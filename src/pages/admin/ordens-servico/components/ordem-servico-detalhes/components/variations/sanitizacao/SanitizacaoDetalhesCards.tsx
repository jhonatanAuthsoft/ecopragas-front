import type { OrdemServicoDetalhesSectionProps } from "../../../ordem-servico-detalhes.types";
import { RegistroServicoSection, VistoriaSection } from "../../sections";
import { DadosProdutoSection } from "./DadosProdutoSection";
import { DiagnosticoLocalSection } from "./DiagnosticoLocalSection";

export function SanitizacaoDetalhesCards({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  return (
    <>
      <DiagnosticoLocalSection ordemServico={ordemServico} />
      <DadosProdutoSection ordemServico={ordemServico} />
      <VistoriaSection ordemServico={ordemServico} />
      <RegistroServicoSection ordemServico={ordemServico} />
    </>
  );
}
