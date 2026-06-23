import { Body2 } from "@/atomic/atm.typography";
import { ImageCarousel } from "@/atomic/mol.image-carousel/image-carousel.component";

interface ServicoFotosProps {
  fotosAntes?: string[];
  fotosDepois?: string[];
  observacoes?: string;
}

export function ServicoFotos({
  fotosAntes = [],
  fotosDepois = [],
  observacoes,
}: ServicoFotosProps) {
  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col gap-sm">
        <h3 className="text-sm font-bold text-grayscale-dark">Antes do Serviço</h3>
        <ImageCarousel images={fotosAntes} pageSize={4} />
      </div>

      <div className="flex flex-col gap-sm">
        <h3 className="text-sm font-bold text-grayscale-dark">Depois do Serviço</h3>
        <ImageCarousel images={fotosDepois} pageSize={4} />
      </div>

      {observacoes && (
        <div className="flex flex-col gap-xs">
          <h3 className="text-sm font-bold text-grayscale-dark">Observações gerais</h3>
          <Body2 className="text-grayscale-dark">{observacoes}</Body2>
        </div>
      )}
    </div>
  );
}
