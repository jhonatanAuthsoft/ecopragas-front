import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoDetalhesSectionProps } from "../../ordem-servico-detalhes.types";
import { MonitoramentoCard } from "../variations/monitoramento-insetos/components/MonitoramentoCard";
import { buildDetailRowKey, formatStringList } from "./variation-detail.utils";

export function AreasMonitoramentoInsetosSection({
  ordemServico,
}: OrdemServicoDetalhesSectionProps) {
  const areas = ordemServico.dadosEspecificos?.areasMonitoramentoInsetos ?? [];

  if (!areas.length) {
    return null;
  }

  return (
    <SectionCard title="Áreas monitoradas">
      <div className="flex flex-col gap-md">
        {areas.map((area) => (
          <MonitoramentoCard
            key={buildDetailRowKey(
              "area",
              area.areaMonitorada,
              area.tratamento,
              formatStringList(area.pragasAlvo),
            )}
            area={area}
          />
        ))}
      </div>
    </SectionCard>
  );
}
