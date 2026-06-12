import { Body1, H3, H4 } from "@/atomic/atm.typography";
import { ImageCarousel } from "@/atomic/mol.image-carousel";
import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoVariationsCardsProps } from "../../../ordem-servico-detalhes.types";
import { DadosProdutoHigienizacaoSection } from "./components/DadosProdutoHigienizacaoSection";
import { ReservatoriosTable } from "./components/ReservatoriosTable";

export function HigienizacaoDetalhesCards({ ordem }: OrdemServicoVariationsCardsProps) {
  return (
    <>
      <DadosProdutoHigienizacaoSection dadosProduto={ordem.dadosProduto?.higienizacao} />
      <SectionCard title="Fotos do local">
        <ImageCarousel images={ordem.fotos} pageSize={4} />
      </SectionCard>
      <SectionCard title="Reservatórios">
        <ReservatoriosTable reservatorios={ordem.reservatorios} />
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
