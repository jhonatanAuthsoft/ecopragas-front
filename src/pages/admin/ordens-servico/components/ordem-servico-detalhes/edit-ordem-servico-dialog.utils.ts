import { formatCurrency, formatCurrencyNumber } from "@/utils/formatters";
import type { OrdemServico } from "../../OrdensServico";
import {
  MOCK_CLIENTES,
  MOCK_TECNICOS,
} from "../add-ordem-servico-dialog/add-ordem-servico-dialog.data";
import type {
  OrdemServicoFormValues,
  ServicoEndereco,
} from "../add-ordem-servico-dialog/add-ordem-servico-dialog.types";
import { formatEnderecoLabel } from "../add-ordem-servico-dialog/add-ordem-servico-dialog.utils";
import type { OrdemServicoDetalhesData } from "./ordem-servico-detalhes.types";

export const mapOrdemToFormValues = (ordem: OrdemServicoDetalhesData): OrdemServicoFormValues => ({
  clienteId: ordem.clienteId,
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

export const resolveInitialEnderecoId = (ordem: OrdemServicoDetalhesData): string | null => {
  const cliente = MOCK_CLIENTES.find((item) => item.id === ordem.clienteId);
  if (!cliente) return null;

  const matchedEndereco = cliente.enderecos.find(
    (endereco) => formatEnderecoLabel(endereco) === ordem.endereco,
  );

  return matchedEndereco?.id ?? null;
};

export const buildOrdemServicoUpdatePayload = (
  ordem: OrdemServicoDetalhesData,
  values: OrdemServicoFormValues,
  selectedEndereco: ServicoEndereco,
): OrdemServicoDetalhesData => {
  const cliente = MOCK_CLIENTES.find((item) => item.id === values.clienteId);
  const tecnico = MOCK_TECNICOS.find((item) => item.id === values.tecnicoId);

  return {
    ...ordem,
    clienteId: values.clienteId,
    clienteNome: cliente?.nome ?? ordem.clienteNome,
    tipoServico: values.tipoServico as OrdemServico["tipoServico"],
    tecnicoId: values.tecnicoId,
    tecnicoNome: tecnico?.nome ?? ordem.tecnicoNome,
    endereco: formatEnderecoLabel(selectedEndereco),
    status: (values.status || ordem.status) as OrdemServico["status"],
    observacoes: values.observacoes || undefined,
    valorServico: formatCurrencyNumber(values.valorServico),
  };
};
