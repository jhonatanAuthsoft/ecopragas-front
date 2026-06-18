import { Body1, H3, H4 } from "@/atomic/atm.typography";
import { ImageCarousel } from "@/atomic/mol.image-carousel";
import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoVariationsCardsProps } from "../../../ordem-servico-detalhes.types";
import { ControlePragasProdutoTable } from "./components/ControlePragasProdutoTable";
import { DescricaoServicoTable } from "./components/DescricaoServicoTable";
import { DiagnosticoLocalSection } from "./components/DiagnosticoLocalSection";

export function ControlePragasDetalhesCards({ ordem }: OrdemServicoVariationsCardsProps) {
  return (
    <>
      <DiagnosticoLocalSection diagnosticoLocal={ordem.diagnosticoLocal} />
      <SectionCard title="Dados do produto">
        <ControlePragasProdutoTable produtos={ordem.dadosProduto?.controlePragasVetores} />
      </SectionCard>
      <SectionCard title="Descrição do serviço">
        <DescricaoServicoTable descricaoServico={ordem.descricaoServico} />
      </SectionCard>
      <SectionCard title="Registro do serviço">
        <div className="flex flex-col gap-xs">
          <H3 className="text-grayscale-dark">Antes</H3>
          <ImageCarousel images={ordem.fotosAntes} pageSize={4} />
          <H3 className="text-grayscale-dark">Depois</H3>
          <ImageCarousel images={ordem.fotosDepois} pageSize={4} />
        </div>
        <div className="flex flex-col gap-xs">
          <H4>Observações gerais</H4>
          <Body1 className="font-normal text-grayscale-dark">{ordem?.observacoes ?? "-"}</Body1>
        </div>
      </SectionCard>
    </>
  );
}
