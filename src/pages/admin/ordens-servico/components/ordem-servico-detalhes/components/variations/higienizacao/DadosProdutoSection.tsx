import { DetailItem } from "@/atomic/atm.detail-item";
import { SectionCard } from "@/atomic/mol.section-card";
import { formatYesNo } from "@/utils/formatters";
import type { OrdemServicoDetalhesSectionProps } from "../../../ordem-servico-detalhes.types";

export function DadosProdutoSection({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  const higienizacaoProduto = ordemServico.dadosEspecificos?.higienizacaoProduto;

  if (!higienizacaoProduto) return null;

  return (
    <SectionCard title="Dados do produto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <DetailItem label="Tipo de equipamento" value={[higienizacaoProduto.tipoEquipamento]} />
        <DetailItem label="Nível de chuva" value={[higienizacaoProduto.nivelChuva]} />
        <DetailItem
          label="Tempo de duração estimado"
          value={[higienizacaoProduto.tempoDuracaoEstimado]}
        />
        <DetailItem label="Volume" value={[higienizacaoProduto.volume]} />
        <DetailItem
          label="Realizar coleta"
          value={[formatYesNo(higienizacaoProduto.realizarColeta)]}
        />
        <DetailItem
          label="Fechar registro"
          value={[formatYesNo(higienizacaoProduto.fecharRegistro)]}
        />
      </div>
    </SectionCard>
  );
}
