import { DetailItem } from "@/atomic/atm.detail-item";
import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoDetalhesSectionProps } from "../../../ordem-servico-detalhes.types";

export function DadosProdutoSection({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  const dadosProduto = ordemServico.dadosEspecificos?.dadosProduto;

  if (!dadosProduto) {
    return null;
  }

  return (
    <SectionCard title="Dados do produto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <DetailItem label="Princípio ativo" value={[dadosProduto.principioAtivo]} />
        <DetailItem label="Produto" value={[dadosProduto.produto]} />
        <DetailItem label="Diluente" value={[dadosProduto.diluente]} />
        <DetailItem label="Volume" value={[dadosProduto.volume]} />
        <DetailItem label="Setor" value={[dadosProduto.setor]} />
        <DetailItem label="Equipamento" value={[dadosProduto.equipamento]} />
      </div>
    </SectionCard>
  );
}
