export type Cliente = {
  id: string;
  nome: string;
  cpfCnpj: string;
  tipoCliente: "fixo" | "esporadico";
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  status: "ativo" | "inativo";
  datacadastro: Date;
  ultimoServico?: Date;
  observacoes?: string;
};
