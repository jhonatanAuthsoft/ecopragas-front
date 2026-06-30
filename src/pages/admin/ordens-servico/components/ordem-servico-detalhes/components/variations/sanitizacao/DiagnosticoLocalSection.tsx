import { DetailItem } from "@/atomic/atm.detail-item";
import { SectionCard } from "@/atomic/mol.section-card";
import { formatYesNo } from "@/utils/formatters";
import type { OrdemServicoDetalhesSectionProps } from "../../../ordem-servico-detalhes.types";
import { formatStringList } from "../../sections/variation-detail.utils";

export function DiagnosticoLocalSection({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  const diagnosticoLocal = ordemServico.dadosEspecificos?.diagnosticoLocal;

  if (!diagnosticoLocal) {
    return null;
  }

  return (
    <SectionCard title="Diagnóstico do local">
      <DetailItem label="Pragas alvo" value={[formatStringList(diagnosticoLocal.pragasAlvo)]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <DetailItem label="Área externa" value={[diagnosticoLocal.areaExterna]} />
        <DetailItem label="Área vacinal" value={[formatYesNo(diagnosticoLocal.areaVacinal)]} />
      </div>
    </SectionCard>
  );
}
