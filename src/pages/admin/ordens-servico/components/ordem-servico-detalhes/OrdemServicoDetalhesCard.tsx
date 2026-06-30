import { Download } from "lucide-react";
import { useState } from "react";
import { IdentificationIcon } from "@/assets/icons/identification";
import { MapPinIcon } from "@/assets/icons/map-pin";
import { PencilSquareFilledIcon } from "@/assets/icons/pencil-square-filled";
import { TrashIcon } from "@/assets/icons/trash";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { DetailItem } from "@/atomic/atm.detail-item";
import { Body2, H2, H3 } from "@/atomic/atm.typography";
import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";
import { formatCPFCNPJ, formatCurrency } from "@/utils/formatters";
import { formatOsNumero } from "@/utils/ordem-servico";
import { DeleteOrdemServicoDialog } from "./components/DeleteOrdemServicoDialog";
import {
  STATUS_BADGE_COLOR,
  STATUS_LABELS,
  TIPO_SERVICO_LABELS,
} from "./ordem-servico-detalhes.labels";
import {
  formatDataHorario,
  formatEndereco,
  formatTecnicosLabel,
} from "./ordem-servico-detalhes.utils";

interface OrdemServicoDetalhesCardProps {
  ordem: OrdemServico;
  onDelete: () => void;
  onEdit: () => void;
  onDownload: () => void;
  isDeleteLoading?: boolean;
  isDownloadLoading?: boolean;
}

export function OrdemServicoDetalhesCard({
  ordem,
  onDelete,
  onEdit,
  onDownload,
  isDeleteLoading = false,
  isDownloadLoading = false,
}: OrdemServicoDetalhesCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const endereco = formatEndereco(ordem);
  const dataHorario = formatDataHorario(ordem.dataHoraServico);
  const tipoServicoLabel = ordem.tipoServico ? TIPO_SERVICO_LABELS[ordem.tipoServico] : "-";
  const statusLabel = ordem.status ? STATUS_LABELS[ordem.status] : "Criado";
  const isDone = ordem.status === "CONCLUIDO" || ordem.status === "EM_ANDAMENTO";

  return (
    <>
      <div className="flex flex-col gap-md p-lg bg-white rounded-medium shadow-sm border border-grayscale-light">
        <div className="flex flex-col gap-sm">
          <div className="flex justify-between">
            <div className="flex flex-col gap-xs">
              <Badge
                color={ordem.status ? STATUS_BADGE_COLOR[ordem.status] : "neutral"}
                className="self-start"
              >
                {statusLabel} - <b className="ml-2xs">{formatOsNumero(ordem.osNumero)}</b>
              </Badge>
              <H2>{ordem.clienteNome ?? "-"}</H2>
            </div>

            {isDone && (
              <div>
                <button
                  type="button"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="p-sm cursor-pointer"
                  disabled={isDeleteLoading}
                >
                  <TrashIcon className="text-feedback-error-medium" />
                </button>
                <button
                  type="button"
                  onClick={onDownload}
                  disabled={isDownloadLoading}
                  className="p-sm cursor-pointer disabled:opacity-50"
                >
                  <Download className="text-brand-secondary-medium" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-sm text-grayscale-dark text-sm">
            {ordem.clienteCpfCnpj && (
              <div className="flex items-center gap-2xs">
                <IdentificationIcon className="size-lg" />
                <Body2>{formatCPFCNPJ(ordem.clienteCpfCnpj)}</Body2>
              </div>
            )}
            <div className="flex items-center gap-2xs">
              <MapPinIcon className="size-lg" />
              <Body2>{endereco}</Body2>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-grayscale-light" />

        <div className="space-y-4">
          <H3>Dados do Serviço</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <DetailItem label="Tipo de Serviço" value={[tipoServicoLabel]} />
            <DetailItem label="Técnico responsável" value={[formatTecnicosLabel(ordem.tecnicos)]} />
            <DetailItem label="Data e horário" value={[dataHorario]} />
            <DetailItem
              label="Valor do serviço"
              value={[
                <b key="valor-servico">
                  {ordem.valor != null ? formatCurrency(ordem.valor) : "-"}
                </b>,
              ]}
              valueClassName="text-brand-cta-dark"
            />
          </div>
        </div>

        {(!isDone || ordem.status !== "CANCELADO") && (
          <>
            <div className="w-full h-[1px] bg-grayscale-light" />

            <div className="flex items-center justify-center gap-md">
              <Button
                className="w-[170px] border-transparent"
                variant="destructive-outline"
                size="lg"
                leftIcon={<TrashIcon className="size-md" />}
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={isDeleteLoading}
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
        isLoading={isDeleteLoading}
      />
    </>
  );
}
