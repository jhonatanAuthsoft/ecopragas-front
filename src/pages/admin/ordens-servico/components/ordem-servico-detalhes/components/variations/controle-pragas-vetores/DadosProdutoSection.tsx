import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoDetalhesSectionProps } from "../../../ordem-servico-detalhes.types";
import { ControlePragasProdutoTable } from "../../sections/tables/ControlePragasProdutoTable";

export function DadosProdutoSection({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  const produtos = ordemServico.dadosEspecificos?.produtos;

  if (!produtos?.length) {
    return null;
  }

  return (
    <SectionCard title="Dados do produto">
      <ControlePragasProdutoTable produtos={produtos} />
    </SectionCard>
  );
}
