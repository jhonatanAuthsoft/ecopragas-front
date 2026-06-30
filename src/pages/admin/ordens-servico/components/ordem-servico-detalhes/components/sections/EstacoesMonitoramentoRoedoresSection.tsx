import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoDetalhesSectionProps } from "../../ordem-servico-detalhes.types";
import { EstacoesCard } from "../variations/monitoramento-roedores/components/EstacoesCard";
import { buildDetailRowKey } from "./variation-detail.utils";

export function EstacoesMonitoramentoRoedoresSection({
  ordemServico,
}: OrdemServicoDetalhesSectionProps) {
  const estacoes = ordemServico.dadosEspecificos?.estacoesMonitoramentoRoedores ?? [];

  if (!estacoes.length) {
    return null;
  }

  return (
    <SectionCard title="Estações de monitoramento">
      <div className="flex flex-col gap-md">
        {estacoes.map((estacao) => (
          <EstacoesCard key={buildDetailRowKey("estacao", estacao.nome)} estacao={estacao} />
        ))}
      </div>
    </SectionCard>
  );
}
