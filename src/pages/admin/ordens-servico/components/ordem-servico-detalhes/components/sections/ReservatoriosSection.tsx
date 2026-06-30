import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoDetalhesSectionProps } from "../../ordem-servico-detalhes.types";
import { ReservatoriosTable } from "./tables/ReservatoriosTable";

export function ReservatoriosSection({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  const reservatorios = ordemServico.dadosEspecificos?.reservatorios;

  if (!reservatorios?.length) {
    return null;
  }

  return (
    <SectionCard title="Reservatórios">
      <ReservatoriosTable reservatorios={reservatorios} />
    </SectionCard>
  );
}
