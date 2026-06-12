import type { OrdemServico } from "@/model/rest/ordem-servico";
import { formatCurrency, formatCurrencyNumber } from "@/utils/formatters";
import {
  MOCK_CLIENTES,
  MOCK_TECNICOS,
} from "../add-ordem-servico-dialog/add-ordem-servico-dialog.data";
import type {
  OrdemServicoFormValues,
  ServicoEndereco,
} from "../add-ordem-servico-dialog/add-ordem-servico-dialog.types";
import { formatEnderecoLabel } from "../add-ordem-servico-dialog/add-ordem-servico-dialog.utils";

export const mapOrdemToFormValues = (ordem: OrdemServico): OrdemServicoFormValues => ({
  clienteId: ordem.cliente.id,
  tipoServico: ordem.tipoServico,
  tecnicoId: ordem.tecnicoId,
  valorServico: formatCurrency(ordem.valorServico),
  status: ordem.status,
  observacoes: ordem.observacoes ?? "",
  estacoesMonitoramento: [],
  areasMonitoramentoInsetos: [],
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  endereco: "",
  numero: "",
  complemento: "",
});

export const resolveInitialEnderecoId = (ordem: OrdemServico): string | null => {
  const cliente = MOCK_CLIENTES.find((item) => item.id === ordem.cliente.id);
  if (!cliente) return null;

  const matchedEndereco = cliente.enderecos.find(
    (endereco) => formatEnderecoLabel(endereco) === ordem.endereco,
  );

  return matchedEndereco?.id ?? null;
};

export const buildOrdemServicoUpdatePayload = (
  ordem: OrdemServico,
  values: OrdemServicoFormValues,
  selectedEndereco: ServicoEndereco,
): OrdemServico => {
  const cliente = MOCK_CLIENTES.find((item) => item.id === values.clienteId);
  const tecnico = MOCK_TECNICOS.find((item) => item.id === values.tecnicoId);

  return {
    ...ordem,
    cliente: {
      id: values.clienteId,
      nome: cliente?.nome ?? ordem.cliente.nome,
      cpfCnpj: cliente?.cpfCnpj ?? ordem.cliente.cpfCnpj,
      telefone: cliente?.telefone ?? ordem.cliente.telefone,
    },
    tipoServico: values.tipoServico as OrdemServico["tipoServico"],
    tecnicoId: values.tecnicoId,
    tecnicoNome: tecnico?.nome ?? ordem.tecnicoNome,
    endereco: formatEnderecoLabel(selectedEndereco),
    status: (values.status || ordem.status) as OrdemServico["status"],
    observacoes: values.observacoes || undefined,
    valorServico: formatCurrencyNumber(values.valorServico),
  };
};
