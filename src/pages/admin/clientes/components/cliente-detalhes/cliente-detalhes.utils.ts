import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Cliente, ClienteEnderecoResponse, ClienteUltimoServico } from "@/model/rest/cliente";
import { formatCEP } from "@/utils/formatters";

export function getPrimaryAddress(cliente: Cliente): ClienteEnderecoResponse | undefined {
  return cliente.enderecos?.find((endereco) => endereco.padrao) ?? cliente.enderecos?.[0];
}

export function formatClienteEndereco(cliente: Cliente): string {
  const endereco = getPrimaryAddress(cliente);

  if (!endereco?.rua) {
    if (cliente.cidade && cliente.estado) {
      return `${cliente.cidade} - ${cliente.estado}`;
    }

    return "-";
  }

  const parts = [
    endereco.rua,
    endereco.numero,
    endereco.cep ? formatCEP(endereco.cep) : undefined,
    endereco.cidade,
    endereco.estado,
  ].filter(Boolean);

  return parts.join(", ");
}

export function getUltimoServico(cliente: Cliente): ClienteUltimoServico | undefined {
  return cliente.ultimosServicos?.[0];
}

export function hasUltimoServico(cliente: Cliente): boolean {
  return !!getUltimoServico(cliente);
}

export function formatUltimoServicoDataHora(dataHoraAgendamento?: string): string {
  if (!dataHoraAgendamento) {
    return "-";
  }

  const parsed = new Date(dataHoraAgendamento);

  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return format(parsed, "dd/MM/yyyy - HH:mm", { locale: ptBR });
}
