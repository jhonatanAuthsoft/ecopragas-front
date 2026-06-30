import type { ComponentType } from "react";
import type { TipoServicoOrdem } from "@/model/rest/ordem-servico";
import type { OrdemServicoDetalhesSectionProps } from "../ordem-servico-detalhes.types";
import { ControlePragasDetalhesCards } from "./variations/controle-pragas-vetores/ControlePragasDetalhesCards";
import { HigienizacaoDetalhesCards } from "./variations/higienizacao/HigienizacaoDetalhesCards";
import { MonitoramentoInsetosDetalhesCards } from "./variations/monitoramento-insetos/MonitoramentoInsetosDetalhesCards";
import { MonitoramentoRoedoresDetalhesCards } from "./variations/monitoramento-roedores/MonitoramentoRoedoresDetalhesCards";
import { SanitizacaoDetalhesCards } from "./variations/sanitizacao/SanitizacaoDetalhesCards";

const VARIATION_CARDS: Record<TipoServicoOrdem, ComponentType<OrdemServicoDetalhesSectionProps>> = {
  SANITIZACAO: SanitizacaoDetalhesCards,
  CONTROLE_PRAGAS_VETORES: ControlePragasDetalhesCards,
  HIGIENIZACAO: HigienizacaoDetalhesCards,
  MONITORAMENTO_INSETOS: MonitoramentoInsetosDetalhesCards,
  MONITORAMENTO_ROEDORES: MonitoramentoRoedoresDetalhesCards,
};

export function OrdemServicoVariationsCards({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  if (!ordemServico.tipoServico) {
    return null;
  }

  const VariationCards = VARIATION_CARDS[ordemServico.tipoServico];

  return (
    <div className="flex flex-col gap-md pt-md">
      <VariationCards ordemServico={ordemServico} />
    </div>
  );
}
