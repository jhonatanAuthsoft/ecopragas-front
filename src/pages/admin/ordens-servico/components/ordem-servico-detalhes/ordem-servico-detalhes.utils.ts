import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";
import { formatCEP } from "@/utils/formatters";

export const formatEndereco = (
  ordem: Pick<
    OrdemServico,
    "rua" | "numero" | "complemento" | "bairro" | "cidade" | "estado" | "cep"
  >,
): string => {
  const partes = [
    ordem.rua,
    ordem.numero,
    ordem.complemento,
    ordem.bairro,
    ordem.cidade,
    ordem.estado,
    ordem.cep ? formatCEP(ordem.cep) : undefined,
  ].filter(Boolean);

  return partes.length > 0 ? partes.join(", ") : "-";
};

export const formatDataHorario = (dataHoraAgendamento?: string): string => {
  if (!dataHoraAgendamento) {
    return "-";
  }

  const data = new Date(dataHoraAgendamento);

  if (Number.isNaN(data.getTime())) {
    return "-";
  }

  return `${format(data, "dd/MM/yyyy", { locale: ptBR })} - ${format(data, "HH:mm", { locale: ptBR })}`;
};

export const formatTecnicosLabel = (tecnicos?: OrdemServico["tecnicos"]): string => {
  if (!tecnicos?.length) return "-";

  const nomes = tecnicos.map((tecnico) => tecnico.nome).filter(Boolean);
  return nomes.length > 0 ? nomes.join(", ") : "-";
};
