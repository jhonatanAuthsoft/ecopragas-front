export interface Tecnico {
  id: string;
  nome: string;
  email: string;
  cpfCnpj: string;
  telefone: string | null;
  foto: string;
  observacoes: string | null;
  status: "ATIVO" | "INATIVO";
  permissao: string;
}

export interface UpdateTecnicoDTO {
  nome: string;
  email: string;
  cpf: string;
  foto: string;
  telefone?: string;
}

export interface CreateTecnicoDTO {
  nome: string;
  email: string;
  cpf: string;
  foto: string;
  telefone: string;
}
