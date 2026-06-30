import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Body1, Body2, H3, H4 } from "@/atomic/atm.typography";
import { InputLabel } from "@/atomic/atm.typography/typography.component";
import { ImageCarousel } from "@/atomic/mol.image-carousel/image-carousel.component";
import { cn } from "@/lib/utils";
import type { EstacaoMonitoramentoRoedores } from "@/model/rest/ordem-servico";
import {
  ARMADILHA_ADESIVA_LABELS,
  PORTA_ISCA_RATICIDA_LABELS,
} from "../../../../ordem-servico-detalhes.labels";
import {
  formatMonitoramentoOptionList,
  getEstacaoArmadilhaAdesivaValues,
  getEstacaoPortaIscaValues,
} from "../monitoramento-options.utils";
import { ControleTable } from "./ControleTable";
import { PontosVariaveisTable } from "./PontosVariaveisTable";

interface EstacoesCardProps {
  estacao: EstacaoMonitoramentoRoedores;
}

export function EstacoesCard({ estacao }: EstacoesCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const estacaoKey = estacao.nome ?? "estacao";
  const portaIscaSelecionadas = getEstacaoPortaIscaValues(estacao);
  const armadilhaAdesivaSelecionadas = getEstacaoArmadilhaAdesivaValues(estacao);

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
            <div className="flex gap-2xs text-left">
              <Body2 className="text-grayscale-dark">
                Porta Isca:{" "}
                {formatMonitoramentoOptionList(portaIscaSelecionadas, PORTA_ISCA_RATICIDA_LABELS)}
              </Body2>
              <div className="w-px h-lg bg-grayscale-light" />
              <Body2 className="text-grayscale-dark">
                Armadilha Adesiva:{" "}
                {formatMonitoramentoOptionList(
                  armadilhaAdesivaSelecionadas,
                  ARMADILHA_ADESIVA_LABELS,
                )}
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
            <MonitoramentoOptionsGroup
              label="Porta Isca Raticida"
              options={PORTA_ISCA_RATICIDA_LABELS}
              selectedValues={portaIscaSelecionadas}
              keyPrefix={`${estacaoKey}-porta-isca`}
            />
            <MonitoramentoOptionsGroup
              label="Armadilha Adesiva"
              options={ARMADILHA_ADESIVA_LABELS}
              selectedValues={armadilhaAdesivaSelecionadas}
              keyPrefix={`${estacaoKey}-armadilha-adesiva`}
            />
          </div>

          <div className="w-full h-px bg-grayscale-light" />

          <H4 className="text-grayscale-dark">Controle</H4>
          <ControleTable controle={estacao.controle} />

          <div className="w-full h-px bg-grayscale-light" />

          <H4 className="text-grayscale-dark">Pontos variáveis</H4>
          <PontosVariaveisTable pontosVariaveis={estacao.pontosVariaveis} />

          <div className="w-full h-px bg-grayscale-light" />

          <H4>Fotos do serviço</H4>
          <ImageCarousel images={estacao.fotos ?? []} pageSize={3.5} />
          <H4>Observações gerais</H4>
          <Body1 className="font-normal text-grayscale-dark">
            {estacao.observacoesGerais ?? "-"}
          </Body1>
        </>
      )}
    </div>
  );
}

interface MonitoramentoOptionsGroupProps {
  label: string;
  options: Record<string, string>;
  selectedValues: string[];
  keyPrefix: string;
}
function MonitoramentoOptionsGroup({
  label,
  options,
  selectedValues,
  keyPrefix,
}: MonitoramentoOptionsGroupProps) {
  const selectedSet = new Set(selectedValues);

  return (
    <div className="flex flex-col gap-xs">
      <InputLabel>{label}</InputLabel>
      <div className="flex flex-wrap gap-xs">
        {Object.entries(options).map(([value, optionLabel]) => (
          <MonitoramentoOptionBadge
            key={`${keyPrefix}-${value}`}
            label={optionLabel}
            isSelected={selectedSet.has(value)}
          />
        ))}
      </div>
    </div>
  );
}

interface MonitoramentoOptionBadgeProps {
  label: string;
  isSelected: boolean;
}
function MonitoramentoOptionBadge({ label, isSelected }: MonitoramentoOptionBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2xs py-xs rounded-small border border-grayscale-medium",
        isSelected ? "px-xs bg-feedback-success-medium text-white" : "px-lg text-grayscale-dark",
      )}
    >
      {isSelected && <Check className="size-md shrink-0" />}
      <Body1>{label}</Body1>
    </div>
  );
}
