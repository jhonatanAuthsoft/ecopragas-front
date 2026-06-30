import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoDetalhesSectionProps } from "../../ordem-servico-detalhes.types";
import { DescricaoServicoTable } from "./tables/DescricaoServicoTable";

export function DescricaoServicoSection({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  const descricaoServico = ordemServico.dadosEspecificos?.descricaoServico;

  if (!descricaoServico?.length) {
    return null;
  }

  return (
    <SectionCard title="Descrição do serviço">
      <DescricaoServicoTable descricaoServico={descricaoServico} />
    </SectionCard>
  );
}
