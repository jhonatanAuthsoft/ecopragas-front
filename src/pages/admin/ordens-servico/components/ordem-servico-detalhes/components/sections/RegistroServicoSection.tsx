import { Body1, H3, H4 } from "@/atomic/atm.typography";
import { ImageCarousel } from "@/atomic/mol.image-carousel/image-carousel.component";
import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoDetalhesSectionProps } from "../../ordem-servico-detalhes.types";

export function RegistroServicoSection({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  const registroServico = ordemServico.dadosEspecificos?.registroServico;
  const imagensAntes = registroServico?.imagensAntes ?? [];
  const imagensDepois = registroServico?.imagensDepois ?? [];
  const imagens = registroServico?.imagens ?? [];
  const observacoes = registroServico?.observacoesGerais;

  if (
    imagensAntes.length === 0 &&
    imagensDepois.length === 0 &&
    imagens.length === 0 &&
    !observacoes
  ) {
    return null;
  }

  return (
    <SectionCard title="Registro do serviço">
      {imagens.length > 0 && (
        <div className="flex flex-col gap-xs">
          <H3 className="text-grayscale-dark font-normal text-base">Imagens</H3>
          <ImageCarousel images={imagens} pageSize={4} />
        </div>
      )}

      {(imagensAntes.length > 0 || imagensDepois.length > 0) && (
        <div className="flex flex-col gap-md">
          {imagensAntes.length > 0 && (
            <div className="flex flex-col gap-xs">
              <H3 className="text-grayscale-dark font-normal text-base">Antes</H3>
              <ImageCarousel images={imagensAntes} pageSize={4} />
            </div>
          )}
          {imagensDepois.length > 0 && (
            <div className="flex flex-col gap-xs">
              <H3 className="text-grayscale-dark font-normal text-base">Depois</H3>
              <ImageCarousel images={imagensDepois} pageSize={4} />
            </div>
          )}
        </div>
      )}

      {observacoes && (
        <div className="flex flex-col gap-xs">
          <H4>Observações gerais</H4>
          <Body1 className="font-normal text-grayscale-dark">{observacoes}</Body1>
        </div>
      )}
    </SectionCard>
  );
}
