import { DetailItem } from "@/atomic/atm.detail-item";
import { Body1, H4 } from "@/atomic/atm.typography";
import { ImageCarousel } from "@/atomic/mol.image-carousel";
import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoVariationsCardsProps } from "../../../ordem-servico-detalhes.types";
import { VistoriaTable } from "./components/VistoriaTable";

export function SanitizacaoDetalhesCards({ ordem }: OrdemServicoVariationsCardsProps) {
  return (
    <>
      <SectionCard title="Diagnostico do Local">
        <DetailItem label="Pragas alvo" value={ordem.diagnosticoLocal?.pragasAlvo ?? []} />
        <div className="flex gap-md">
          <DetailItem label="Área externa" value={[ordem.diagnosticoLocal?.areaExterna]} />
          <DetailItem label="Área vicinal" value={[ordem.diagnosticoLocal?.areaVicinal]} />
        </div>
      </SectionCard>

      <SectionCard title="Dados do produto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <DetailItem
            label="Principio ativo"
            value={[ordem.dadosProduto?.sanitizacao?.principioAtivo]}
          />
          <DetailItem label="Produto" value={[ordem.dadosProduto?.sanitizacao?.produto]} />
          <DetailItem label="Diluente" value={[ordem.dadosProduto?.sanitizacao?.diluente]} />
          <DetailItem label="Volume" value={[ordem.dadosProduto?.sanitizacao?.volume]} />
          <DetailItem label="Setor" value={[ordem.dadosProduto?.sanitizacao?.setor]} />
          <DetailItem label="Equipamento" value={[ordem.dadosProduto?.sanitizacao?.equipamento]} />
        </div>
      </SectionCard>

      <SectionCard title="Vistoria">
        <VistoriaTable vistoria={ordem.vistoria} />
      </SectionCard>

      <SectionCard title="Registro do Serviço">
        <ImageCarousel images={ordem.fotos} pageSize={4} />
        <div className="flex flex-col gap-xs mt-xs">
          <H4>Observações gerais</H4>
          <Body1 className="font-normal text-grayscale-dark">{ordem?.observacoes ?? "-"}</Body1>
        </div>
      </SectionCard>
    </>
  );
}
