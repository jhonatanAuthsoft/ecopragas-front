import { DetailItem } from "@/atomic/atm.detail-item";
import { Body2, H3 } from "@/atomic/atm.typography";
import type { Cliente } from "@/model/rest/cliente";
import { formatTecnicosLabel } from "@/pages/admin/agendamentos/agendamentos.utils";
import { formatCurrency } from "@/utils/formatters";
import {
  formatUltimoServicoDataHora,
  getUltimoServico,
  hasUltimoServico,
} from "../../../../cliente-detalhes.utils";
import { TIPO_SERVICO_LABELS } from "./cliente-ultimo-servico-section.labels";

interface ClienteUltimoServicoSectionProps {
  cliente: Cliente;
}

export const ClienteUltimoServicoSection = ({ cliente }: ClienteUltimoServicoSectionProps) => {
  const ultimoServico = getUltimoServico(cliente);

  return (
    <div className="space-y-4">
      <H3>Último Serviço</H3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md bg-gray-50 rounded-lg">
        {hasUltimoServico(cliente) && ultimoServico ? (
          <>
            <DetailItem
              label="Tipo de serviço"
              value={[TIPO_SERVICO_LABELS[ultimoServico.tipoServico]]}
            />
            <DetailItem
              label="Técnico Responsável"
              // TODO: Adicionar técnicos responsáveis
              value={[formatTecnicosLabel(ultimoServico.tecnicos)]}
            />
            <DetailItem
              label="Data e horário"
              value={[formatUltimoServicoDataHora(ultimoServico.dataHoraAgendamento)]}
            />
            <DetailItem
              label="Valor do serviço"
              value={[
                ultimoServico.valor != null ? (
                  <b key="valor-servico">{formatCurrency(ultimoServico.valor)}</b>
                ) : (
                  "-"
                ),
              ]}
              valueClassName="text-brand-cta-dark"
            />
          </>
        ) : (
          <Body2 className="text-grayscale-medium">
            Informações do último serviço indisponíveis.
          </Body2>
        )}
      </div>
    </div>
  );
};
