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

export type ClienteDocumento = {
  id: string;
  nome: string;
  conteudo: string;
  tamanho?: string;
  tipo?: string;
};

export type ClienteDetalhes = Cliente & {
  documentos?: ClienteDocumento[];
};
