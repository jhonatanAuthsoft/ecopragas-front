import { DetailItem } from "@/atomic/atm.detail-item";
import { Body2, H3 } from "@/atomic/atm.typography";
import type { Cliente } from "@/model/rest/cliente";
import { TIPO_SERVICO_LABELS } from "@/pages/admin/ordens-servico/components/ordem-servico-detalhes/ordem-servico-detalhes.labels";
import { formatCurrency } from "@/utils/formatters";
import { formatUltimoServicoDataHora, hasUltimoServico } from "../../../../cliente-detalhes.utils";

interface ClienteUltimoServicoSectionProps {
  cliente: Cliente;
}

export const ClienteUltimoServicoSection = ({ cliente }: ClienteUltimoServicoSectionProps) => (
  <div className="space-y-4">
    <H3>Último Serviço</H3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md bg-gray-50 rounded-lg">
      {hasUltimoServico(cliente) ? (
        <>
          <DetailItem
            label="Tipo de serviço"
            value={[TIPO_SERVICO_LABELS[cliente.tipoDeServico]]}
          />
          <DetailItem label="Técnico Responsável" value={[cliente.tecnicoResponsavel ?? "-"]} />
          <DetailItem
            label="Data e horario"
            value={[formatUltimoServicoDataHora(cliente.dataUltimoServico)]}
          />
          <DetailItem
            label="Valor do serviço"
            value={[
              cliente.valor != null ? (
                <b key="valor-servico">{formatCurrency(cliente.valor)}</b>
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
