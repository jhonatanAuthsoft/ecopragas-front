import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoDetalhesSectionProps } from "../../ordem-servico-detalhes.types";
import { VistoriaTable } from "./tables/VistoriaTable";

export function VistoriaSection({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  const vistoria = ordemServico.dadosEspecificos?.vistoria;

  if (!vistoria?.length) {
    return null;
  }

  return (
    <SectionCard title="Vistoria">
      <VistoriaTable vistoria={vistoria} />
    </SectionCard>
  );
}
