import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoVariationsCardsProps } from "../../../ordem-servico-detalhes.types";
import { EstacoesCard } from "./components/EstacoesCard";

export function MonitoramentoRoedoresDetalhesCards({ ordem }: OrdemServicoVariationsCardsProps) {
  return (
    <SectionCard title="Estações">
      {ordem.estacoes?.map((estacao) => (
        <EstacoesCard key={estacao.id} estacao={estacao} />
      ))}
    </SectionCard>
  );
}
