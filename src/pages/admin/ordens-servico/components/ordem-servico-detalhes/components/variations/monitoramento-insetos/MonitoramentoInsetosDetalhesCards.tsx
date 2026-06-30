import type { OrdemServicoDetalhesSectionProps } from "../../../ordem-servico-detalhes.types";
import { AreasMonitoramentoInsetosSection } from "../../sections";

export function MonitoramentoInsetosDetalhesCards({
  ordemServico,
}: OrdemServicoDetalhesSectionProps) {
  return <AreasMonitoramentoInsetosSection ordemServico={ordemServico} />;
}
