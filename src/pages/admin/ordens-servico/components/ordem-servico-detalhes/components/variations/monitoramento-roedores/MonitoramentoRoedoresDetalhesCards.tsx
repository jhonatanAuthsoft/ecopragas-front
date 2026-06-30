import type { OrdemServicoDetalhesSectionProps } from "../../../ordem-servico-detalhes.types";
import { EstacoesMonitoramentoRoedoresSection } from "../../sections";

export function MonitoramentoRoedoresDetalhesCards({
  ordemServico,
}: OrdemServicoDetalhesSectionProps) {
  return <EstacoesMonitoramentoRoedoresSection ordemServico={ordemServico} />;
}
