import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Cliente, ClienteEnderecoResponse } from "@/model/rest/cliente";
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

export function hasUltimoServico(cliente: Cliente): boolean {
  return (
    !!cliente.dataUltimoServico ||
    !!cliente.tipoDeServico ||
    !!cliente.tecnicoResponsavel ||
    cliente.valor != null
  );
}

export function formatUltimoServicoDataHora(dataUltimoServico?: string): string {
  if (!dataUltimoServico) {
    return "-";
  }

  const parsed = new Date(dataUltimoServico);

  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return format(parsed, "dd/MM/yyyy", { locale: ptBR });
}
