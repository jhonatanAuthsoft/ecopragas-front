import type { OrdemServicoMock } from "@/model/rest/ordem-servico/ordem-servico.mock.model";
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

export const mapOrdemToFormValues = (ordem: OrdemServicoMock): OrdemServicoFormValues => ({
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

export const resolveInitialEnderecoId = (ordem: OrdemServicoMock): string | null => {
  const cliente = MOCK_CLIENTES.find((item) => item.id === ordem.cliente.id);
  if (!cliente) return null;

  const matchedEndereco = cliente.enderecos.find(
    (endereco) => formatEnderecoLabel(endereco) === ordem.endereco,
  );

  return matchedEndereco?.id ?? null;
};

export const buildOrdemServicoUpdatePayload = (
  ordem: OrdemServicoMock,
  values: OrdemServicoFormValues,
  selectedEndereco: ServicoEndereco,
): OrdemServicoMock => {
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
    tipoServico: values.tipoServico as OrdemServicoMock["tipoServico"],
    tecnicoId: values.tecnicoId,
    tecnicoNome: tecnico?.nome ?? ordem.tecnicoNome,
    endereco: formatEnderecoLabel(selectedEndereco),
    status: (values.status || ordem.status) as OrdemServicoMock["status"],
    observacoes: values.observacoes || undefined,
    valorServico: formatCurrencyNumber(values.valorServico),
  };
};
