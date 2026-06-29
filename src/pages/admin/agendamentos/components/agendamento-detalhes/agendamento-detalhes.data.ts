import type { Agendamento } from "@/model/rest/agendamento";

export const AGENDAMENTO_DETALHES_MOCKS: Agendamento[] = [
  {
    id: "1",
    clienteId: "cliente-1",
    clienteNome: "Joao Silva de Jesus",
    clienteTelefone: "71999990000",
    tecnicos: [{ id: "tecnico-1", nome: "Joao Carlos Silva" }],
    tipoServico: "HIGIENIZACAO",
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
    valor: 250,
  },
  {
    id: "2",
    clienteId: "cliente-2",
    clienteNome: "Maria Oliveira",
    clienteTelefone: "71988880000",
    tecnicos: [{ id: "tecnico-2", nome: "Pedro Lima" }],
    tipoServico: "CONTROLE_PRAGAS_VETORES",
    dataHoraServico: "2025-12-04T10:30:00",
    rua: "Av. B",
    numero: "456",
    cidade: "Sao Paulo",
    estado: "SP",
    cep: "01000000",
    recorrencia: "MENSAL",
    status: "EM_ANDAMENTO",
    ordemServicoId: "os-2",
    valor: 180,
  },
  {
    id: "3",
    clienteId: "cliente-3",
    clienteNome: "Roberto Alves",
    tecnicos: [{ id: "tecnico-3", nome: "Ana Costa" }],
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
