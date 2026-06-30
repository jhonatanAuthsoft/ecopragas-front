import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { BeakerFilledIcon } from "@/assets/icons/beaker-filled";
import { BugAntIcon } from "@/assets/icons/bug-ant";
import { DetailItem } from "@/atomic/atm.detail-item";
import { Body1, Body2, H3, H4 } from "@/atomic/atm.typography";
import { ImageCarousel } from "@/atomic/mol.image-carousel/image-carousel.component";
import { cn } from "@/lib/utils";
import type { AreaMonitoramentoInsetos } from "@/model/rest/ordem-servico";
import { formatYesNo } from "@/utils/formatters";
import { formatStringList } from "../../../sections/variation-detail.utils";

interface MonitoramentoCardProps {
  area: AreaMonitoramentoInsetos;
}

export function MonitoramentoCard({ area }: MonitoramentoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-xs p-md border border-grayscale-light rounded-2xl">
      <button type="button" className="w-full cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex flex-col gap-xs">
          <div className="flex items-center justify-between">
            <H3 className="font-normal">{area.areaMonitorada}</H3>
            <ChevronDown
              className={cn(
                "size-[26px] text-grayscale-dark transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </div>
          <div className="flex flex-wrap items-center gap-md">
            <div className="flex items-center gap-2xs">
              <BugAntIcon className="size-lg text-grayscale-dark" />
              <Body2 className="text-grayscale-dark">{formatStringList(area.pragasAlvo)}</Body2>
            </div>
            <div className="flex items-center gap-2xs">
              <BugAntIcon className="size-lg text-grayscale-dark" />
              <Body2 className="text-grayscale-dark">{area.grauInfestacao}</Body2>
            </div>
            <div className="flex items-center gap-2xs">
              <BeakerFilledIcon className="size-lg text-grayscale-dark" />
              <Body2 className="text-grayscale-dark">{area.tratamento}</Body2>
            </div>
          </div>
        </div>
      </button>

      {isOpen && (
        <>
          <div className="w-full h-px bg-grayscale-light" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <DetailItem label="Grau de infestação" value={[area.grauInfestacao]} />
            <DetailItem label="Produto utilizado" value={[area.produtoUtilizado]} />
          </div>
          <DetailItem label="Adesiva" value={[area.adesiva]} />

          <div className="w-full h-px bg-grayscale-light" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <DetailItem label="Produto" value={[area.produto]} />
            <DetailItem label="ml/L ou g/m3" value={[area.dosagem]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <DetailItem label="Refil luminosa" value={[formatYesNo(area.refilLuminosa)]} />
            <DetailItem label="Quantidade" value={[area.quantidade]} />
          </div>

          <div className="w-full h-px bg-grayscale-light" />
          <H3 className="font-normal text-grayscale-dark">Fotos do serviço</H3>
          <ImageCarousel images={area.fotos ?? []} pageSize={3.5} />
          <H4>Observações gerais</H4>
          <Body1 className="font-normal text-grayscale-dark">{area.observacoesGerais ?? "-"}</Body1>
        </>
      )}
    </div>
  );
}
