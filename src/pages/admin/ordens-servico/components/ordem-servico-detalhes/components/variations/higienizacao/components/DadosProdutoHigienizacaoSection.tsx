import { DetailItem } from "@/atomic/atm.detail-item";
import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServico } from "@/model/rest/ordem-servico";
import { formatYesNo } from "@/utils/formatters";

interface DadosProdutoHigienizacaoSectionProps {
  dadosProduto?: OrdemServico["dadosProduto"]["higienizacao"];
}

export function DadosProdutoHigienizacaoSection({
  dadosProduto,
}: DadosProdutoHigienizacaoSectionProps) {
  return (
    <SectionCard title="Dados do produto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <DetailItem label="Tipo de equipamento" value={[dadosProduto?.tipoEquipamento]} />
        <DetailItem label="Nivel de chuva" value={[dadosProduto?.nivelChuva]} />
        <DetailItem
          label="Tempo de duracao estimado"
          value={[`${dadosProduto?.tempoDuracaoEstimado}h`]}
        />
        <DetailItem label="Volume" value={[`${dadosProduto?.volume}ml`]} />
        <DetailItem label="Realizar coleta" value={[formatYesNo(dadosProduto?.realizarColeta)]} />
        <DetailItem label="Fechar registro" value={[formatYesNo(dadosProduto?.fecharRegistro)]} />
      </div>
    </SectionCard>
  );
}
