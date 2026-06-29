import { useState } from "react";
import { IdentificationIcon } from "@/assets/icons/identification";
import { MapPinIcon } from "@/assets/icons/map-pin";
import { PhoneIcon } from "@/assets/icons/phone";
import { TrashIcon } from "@/assets/icons/trash";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { DetailItem } from "@/atomic/atm.detail-item";
import { Body2, H2, H3 } from "@/atomic/atm.typography";
import type { Agendamento } from "@/model/rest/agendamento";
import { formatCurrency, formatPhone } from "@/utils/formatters";
import { formatTecnicosLabel } from "../../agendamentos.utils";
import { DeleteAgendamentoDialog } from "../DeleteAgendamentoDialog";
import { getBadgeRecorrenciaLabel, TIPO_SERVICO_LABELS } from "./agendamento-detalhes.labels";
import { formatDataHorario, formatEndereco } from "./agendamento-detalhes.utils";

interface AgendamentoDetalhesCardProps {
  agendamento: Agendamento;
  onDelete: () => void;
  onReagendar: () => void;
  isDeleteLoading?: boolean;
}

export function AgendamentoDetalhesCard({
  agendamento,
  onDelete,
  onReagendar,
  isDeleteLoading = false,
}: AgendamentoDetalhesCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const endereco = formatEndereco(agendamento);
  const dataHorario = formatDataHorario(agendamento.dataHoraServico);
  const recorrenciaLabel = getBadgeRecorrenciaLabel(agendamento.recorrencia);
  const isAgendado = agendamento.status === "AGENDADO";

  return (
    <>
      <div className="flex flex-col gap-lg p-lg bg-white rounded-medium shadow-sm border border-grayscale-light">
        <div className="flex flex-col gap-sm pb-sm border-b border-grayscale-light">
          <Badge color="blue" className="self-start">
            {/* TODO: adicionar ao atualizar back */}
            {recorrenciaLabel} - <b>{agendamento.ordemServicoId ?? "-"}</b>
          </Badge>

          <H2>{agendamento.tipoServico ? TIPO_SERVICO_LABELS[agendamento.tipoServico] : "-"}</H2>

          <div className="flex flex-wrap items-center gap-sm text-grayscale-dark">
            <div className="flex items-center gap-2xs">
              <IdentificationIcon className="size-lg" />
              <Body2>{agendamento.clienteNome ?? "-"}</Body2>
            </div>
            <div className="flex items-center gap-2xs">
              <PhoneIcon className="size-lg" />
              <Body2>
                {agendamento.clienteTelefone ? formatPhone(agendamento.clienteTelefone) : "-"}
              </Body2>
            </div>
            <div className="flex items-center gap-2xs">
              <MapPinIcon className="size-lg" />
              <Body2>{endereco}</Body2>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-md pb-sm border-b border-grayscale-light">
          <H3>Dados do Serviço</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <DetailItem
              label="Tipo de Servico"
              value={[agendamento.tipoServico ? TIPO_SERVICO_LABELS[agendamento.tipoServico] : "-"]}
            />
            <DetailItem
              label="Técnico responsável"
              value={[formatTecnicosLabel(agendamento.tecnicos)]}
            />
            <DetailItem
              label="Data e horário"
              value={[agendamento.dataHoraServico ? dataHorario : "-"]}
            />
            <DetailItem
              label="Valor do serviço"
              value={[
                <b key="valor-servico">
                  {agendamento.valor != null ? formatCurrency(agendamento.valor) : "-"}
                </b>,
              ]}
              valueClassName="text-brand-cta-dark"
            />
          </div>
        </div>

        {isAgendado && (
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
            <Button className="w-[170px]" size="lg" variant="primary" onClick={onReagendar}>
              Reagendar
            </Button>
          </div>
        )}
      </div>

      <DeleteAgendamentoDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={onDelete}
        isLoading={isDeleteLoading}
      />
    </>
  );
}
