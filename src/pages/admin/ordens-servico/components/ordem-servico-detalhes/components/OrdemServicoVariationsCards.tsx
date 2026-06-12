import type { ComponentType } from "react";
import type { OrdemServico } from "../../../OrdensServico";
import type { OrdemServicoVariationsCardsProps } from "../ordem-servico-detalhes.types";
import { ControlePragasDetalhesCards } from "./variations/controle-pragas-vetores/ControlePragasDetalhesCards";
import { HigienizacaoDetalhesCards } from "./variations/higienizacao/HigienizacaoDetalhesCards";
import { MonitoramentoInsetosDetalhesCards } from "./variations/monitoramento-insetos/MonitoramentoInsetosDetalhesCards";
import { MonitoramentoRoedoresDetalhesCards } from "./variations/monitoramento-roedores/MonitoramentoRoedoresDetalhesCards";
import { SanitizacaoDetalhesCards } from "./variations/sanitizacao/SanitizacaoDetalhesCards";

type TipoServico = OrdemServico["tipoServico"];

const VARIATION_CARDS: Record<TipoServico, ComponentType<OrdemServicoVariationsCardsProps>> = {
  sanitizacao: SanitizacaoDetalhesCards,
  controle_pragas_vetores: ControlePragasDetalhesCards,
  higienizacao: HigienizacaoDetalhesCards,
  monitoramento_insetos: MonitoramentoInsetosDetalhesCards,
  monitoramento_roedores: MonitoramentoRoedoresDetalhesCards,
};

export function OrdemServicoVariationsCards({ ordem }: OrdemServicoVariationsCardsProps) {
  const VariationCards = VARIATION_CARDS[ordem.tipoServico];

  return (
    <div className="flex flex-col gap-md">
      <VariationCards ordem={ordem} />
    </div>
  );
}
