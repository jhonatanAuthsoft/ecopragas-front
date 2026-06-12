import { DetailItem } from "@/atomic/atm.detail-item";
import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServico } from "@/pages/admin/ordens-servico/OrdensServico";

interface DiagnosticoLocalSectionProps {
  diagnosticoLocal?: OrdemServico["diagnosticoLocal"];
}

const formatBoolean = (value?: boolean) => {
  if (value === undefined) return "-";
  return value ? "Sim" : "Não";
};

export function DiagnosticoLocalSection({ diagnosticoLocal }: DiagnosticoLocalSectionProps) {
  return (
    <SectionCard title="Diagnostico do Local">
      <DetailItem label="Pragas alvo" value={diagnosticoLocal?.pragasAlvo} />
      <div className="h-px w-full bg-grayscale-light" />
      <div className="flex flex-col gap-xs">
        <DetailItem label="Ponto de referencia" value={[diagnosticoLocal?.pontoDeReferencia]} />
        <div className="flex gap-md">
          <DetailItem label="Piscina" value={[formatBoolean(diagnosticoLocal?.piscina)]} />
          <DetailItem label="Pet" value={[formatBoolean(diagnosticoLocal?.pet)]} />
        </div>
      </div>
    </SectionCard>
  );
}
