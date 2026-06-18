import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Body1, Body2, H3, H4, InputLabel } from "@/atomic/atm.typography";
import { ImageCarousel } from "@/atomic/mol.image-carousel";
import { cn } from "@/lib/utils";
import type {
  ArmadilhaAdesivaTypes,
  OrdemServico,
  PortaIscaRaticidaTypes,
} from "@/model/rest/ordem-servico";
import { ControleTable } from "./ControleTable";
import { PontosVariaveisTable } from "./PontosVariaveisTable";

const PORTA_ISCAS_RATICIDA_LABELS: Record<PortaIscaRaticidaTypes, string> = {
  isca_consumida: "Isca consumida",
  isca_danificada: "Isca danificada",
  isca_extraviada: "Isca extraviada",
  porta_isca_extraviado: "Porta Isca extraviada",
  isca_em_conformidade: "Isca em conformidade",
};

const ARMADILHA_ADESIVA_LABELS: Record<ArmadilhaAdesivaTypes, string> = {
  cola_danificada: "Cola danificada",
  porta_adesivo_quebrado: "Porta adesivo quebrado",
  porta_adesivo_extraviado: "Porta adesivo extraviada",
  em_conformidade: "Em conformidade",
};

interface EstacoesCardProps {
  estacao: OrdemServico["estacoes"][number];
}

export function EstacoesCard({ estacao }: EstacoesCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const estacaoKey = estacao.id ?? estacao.nome ?? "estacao";

  return (
    <div className="flex flex-col gap-md p-lg border border-grayscale-light rounded-large">
      <button type="button" className="w-full cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <H3 className="font-normal">{estacao.nome}</H3>
            <ChevronDown
              className={cn(
                "size-[26px] text-grayscale-dark transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </div>

          {!isOpen ? (
            <div className="flex gap-2xs">
              <Body2 className="text-grayscale-dark pr-2xs border-r border-grayscale-light">
                Porta Isca: {estacao.portaIscaRaticida?.length}
              </Body2>
              <Body2 className="text-grayscale-dark">
                Armadilha Adesiva: {estacao.armadilhaAdesiva?.length}
              </Body2>
            </div>
          ) : (
            <div className="w-full h-px bg-grayscale-light" />
          )}
        </div>
      </button>

      {isOpen && (
        <>
          <div className="flex flex-col gap-md">
            <InputLabel>Porta Isca Raticida</InputLabel>
            <div className="flex flex-wrap gap-xs">
              {Object.entries(PORTA_ISCAS_RATICIDA_LABELS).map(([portaType, portaLabel]) => {
                const isSelected = estacao.portaIscaRaticida?.includes(
                  portaType as PortaIscaRaticidaTypes,
                );

                return (
                  <div
                    key={`${estacaoKey}-porta-isca-${portaType}`}
                    className={cn(
                      "flex items-center gap-2xs py-xs rounded-small border border-grayscale-medium",
                      isSelected
                        ? "px-xs bg-feedback-success-medium text-white"
                        : "px-lg text-grayscale-dark",
                    )}
                  >
                    {isSelected && <Check />}
                    <Body1>{portaLabel}</Body1>
                  </div>
                );
              })}
            </div>

            <InputLabel>Armadilha Adesiva</InputLabel>
            <div className="flex flex-wrap gap-xs">
              {Object.entries(ARMADILHA_ADESIVA_LABELS).map(([armadilhaType, armadilhaLabel]) => {
                const isSelected = estacao.armadilhaAdesiva?.includes(
                  armadilhaType as ArmadilhaAdesivaTypes,
                );

                return (
                  <div
                    key={`${estacaoKey}-armadilha-adesiva-${armadilhaType}`}
                    className={cn(
                      "flex items-center gap-2xs py-xs rounded-small border border-grayscale-medium",
                      isSelected
                        ? "px-xs bg-feedback-success-medium text-white"
                        : "px-lg text-grayscale-dark",
                    )}
                  >
                    {isSelected && <Check />}
                    <Body1>{armadilhaLabel}</Body1>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full h-px bg-grayscale-light" />

          <H4 className="text-grayscale-dark">Controle</H4>
          <ControleTable controle={estacao.controle} />

          <div className="w-full h-px bg-grayscale-light" />

          <H4 className="text-grayscale-dark">Pontos Variaveis</H4>
          <PontosVariaveisTable pontosVariaveis={estacao.pontosVariaveis} />

          <div className="w-full h-px bg-grayscale-light" />

          <H4>Fotos do serviço</H4>
          <ImageCarousel images={estacao.fotos} pageSize={4} />
          <H4>Observações gerais</H4>
          <Body1 className="font-normal text-grayscale-dark">{estacao?.observacoes ?? "-"}</Body1>
        </>
      )}
    </div>
  );
}
