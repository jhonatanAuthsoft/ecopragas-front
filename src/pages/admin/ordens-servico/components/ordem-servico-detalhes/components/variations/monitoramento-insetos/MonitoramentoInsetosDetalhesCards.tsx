import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoVariationsCardsProps } from "../../../ordem-servico-detalhes.types";
import { MonitoramentoCard } from "./components/MonitoramentoCard";

export function MonitoramentoInsetosDetalhesCards({ ordem }: OrdemServicoVariationsCardsProps) {
  return (
    <SectionCard title="Monitoramento">
      {ordem.monitoramento?.map((item) => (
        <MonitoramentoCard key={item.id} monitoramento={item} />
      ))}
    </SectionCard>
  );
}
