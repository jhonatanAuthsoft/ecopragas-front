import { Download } from "lucide-react";
import { useState } from "react";
import { IdentificationIcon } from "@/assets/icons/identification";
import { MapPinIcon } from "@/assets/icons/map-pin";
import { PencilSquareFilledIcon } from "@/assets/icons/pencil-square-filled";
import { PhoneIcon } from "@/assets/icons/phone";
import { TrashIcon } from "@/assets/icons/trash";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { DetailItem } from "@/atomic/atm.detail-item";
import { Body2, H2, H3 } from "@/atomic/atm.typography";
import { formatCPFCNPJ, formatCurrency, formatPhone } from "@/utils/formatters";
import { TIPO_SERVICO_LABELS } from "../../OrdemServicoDetalhes";
import { DeleteOrdemServicoDialog } from "./components/DeleteOrdemServicoDialog";
import { STATUS_BADGE_COLOR, STATUS_LABELS } from "./ordem-servico-detalhes.labels";
import type { OrdemServicoDetalhesData } from "./ordem-servico-detalhes.types";
import { formatDataHorario } from "./ordem-servico-detalhes.utils";

interface OrdemServicoDetalhesCardProps {
  ordem: OrdemServicoDetalhesData;
  onDelete: () => void;
  onEdit: () => void;
  onDownload: () => void;
}

export function OrdemServicoDetalhesCard({
  ordem,
  onDelete,
  onEdit,
  onDownload,
}: OrdemServicoDetalhesCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const dataHorario = formatDataHorario(ordem);

  return (
    <>
      <div className="flex flex-col gap-md p-lg bg-white rounded-lg shadow-sm border border-grayscale-light">
        <div className="flex flex-col gap-sm">
          <div className="flex justify-between">
            <div className="flex flex-col gap-xs">
              <Badge color={STATUS_BADGE_COLOR[ordem.status]} className="self-start">
                {STATUS_LABELS[ordem.status]} - <b>{ordem.numeroOS}</b>
              </Badge>
              <H2>{ordem.clienteNome}</H2>
            </div>

            {ordem.status !== "agendada" && (
              <div>
                <button
                  type="button"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="p-sm cursor-pointer"
                >
                  <TrashIcon className="text-feedback-error-medium" />
                </button>
                <button type="button" onClick={onDownload} className="p-sm cursor-pointer">
                  <Download className="text-brand-secondary-medium" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-sm text-grayscale-dark text-sm">
            <div className="flex items-center gap-2xs">
              <IdentificationIcon className="size-lg" />
              <Body2>{formatCPFCNPJ(ordem.clienteCpfCnpj)}</Body2>
            </div>
            <div className="flex items-center gap-2xs">
              <PhoneIcon className="size-lg" />
              <Body2>{formatPhone(ordem.clienteTelefone)}</Body2>
            </div>
            <div className="flex items-center gap-2xs">
              <MapPinIcon className="size-lg" />
              <Body2>{ordem.endereco}</Body2>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-grayscale-light" />

        <div className="space-y-4">
          <H3>Dados do Servico</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <DetailItem label="Tipo de Serviço" value={[TIPO_SERVICO_LABELS[ordem.tipoServico]]} />
            <DetailItem label="Técnico responsável" value={[ordem.tecnicoNome]} />
            <DetailItem label="Data e horario" value={[dataHorario]} />
            <DetailItem
              label="Valor do serviço"
              value={[<b key="valor-servico">{formatCurrency(ordem.valorServico)}</b>]}
              valueClassName="text-brand-cta-dark"
            />
          </div>
        </div>

        {ordem.status === "agendada" && (
          <>
            <div className="w-full h-[1px] bg-grayscale-light" />
            <div className="flex items-center justify-center gap-md">
              <Button
                className="w-[170px] border-transparent"
                variant="destructive-outline"
                size="lg"
                leftIcon={<TrashIcon className="size-md" />}
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Excluir
              </Button>
              <Button
                className="w-[170px]"
                size="lg"
                variant="primary"
                leftIcon={<PencilSquareFilledIcon className="size-md" />}
                onClick={onEdit}
              >
                Editar
              </Button>
            </div>
          </>
        )}
      </div>

      <DeleteOrdemServicoDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={onDelete}
      />
    </>
  );
}
