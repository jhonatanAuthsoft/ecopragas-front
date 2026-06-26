import type { Agendamento } from "@/model/rest/agendamento";

export const AGENDAMENTO_DETALHES_MOCKS: Agendamento[] = [
  {
    id: "1",
    clienteId: "cliente-1",
    clienteNome: "Joao Silva de Jesus",
    clienteCpfCnpj: "12345678901",
    tecnicoResponsavel: "Joao Carlos Silva",
    tipoServico: "LIMPEZA_CAIXA_AGUA",
    dataHoraServico: "2025-12-03T08:00:00",
    rua: "Rio da Dona",
    numero: "139",
    bairro: "Centro",
    cidade: "Cruz das Almas",
    estado: "BA",
    cep: "44380000",
    recorrencia: "NENHUMA",
    status: "AGENDADO",
    ordemServicoId: "os-1",
    observacoes: "",
  },
  {
    id: "2",
    clienteId: "cliente-2",
    clienteNome: "Maria Oliveira",
    clienteCpfCnpj: "98765432100",
    tecnicoResponsavel: "Pedro Lima",
    tipoServico: "DEDETIZACAO",
    dataHoraServico: "2025-12-04T10:30:00",
    rua: "Av. B",
    numero: "456",
    cidade: "Sao Paulo",
    estado: "SP",
    cep: "01000000",
    recorrencia: "MENSAL",
    status: "EM_ANDAMENTO",
    ordemServicoId: "os-2",
  },
  {
    id: "3",
    clienteId: "cliente-3",
    clienteNome: "Roberto Alves",
    tecnicoResponsavel: "Ana Costa",
    tipoServico: "SANITIZACAO",
    dataHoraServico: "2025-12-05T14:00:00",
    rua: "Rua das Flores",
    numero: "789",
    cidade: "Salvador",
    estado: "BA",
    recorrencia: "NENHUMA",
    status: "CONCLUIDO",
  },
];

export const getAgendamentoDetalhesById = (id: string): Agendamento => {
  return AGENDAMENTO_DETALHES_MOCKS.find((item) => item.id === id) ?? AGENDAMENTO_DETALHES_MOCKS[0];
};
