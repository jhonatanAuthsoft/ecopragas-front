import { ImageCarousel } from "@/atomic/mol.image-carousel/image-carousel.component";
import { SectionCard } from "@/atomic/mol.section-card";
import type { OrdemServicoDetalhesSectionProps } from "../../ordem-servico-detalhes.types";

export function FotosLocalSection({ ordemServico }: OrdemServicoDetalhesSectionProps) {
  const fotosLocal = ordemServico.dadosEspecificos?.fotosLocal;

  if (!fotosLocal?.length) {
    return null;
  }

  return (
    <SectionCard title="Fotos do local">
      <ImageCarousel images={fotosLocal} pageSize={4} />
    </SectionCard>
  );
}
