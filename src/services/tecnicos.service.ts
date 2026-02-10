import api from "./api";

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

export const tecnicosService = {
  getAll: async () => {
    const { data } = await api.get<Tecnico[]>("/admin/tecnicos");
    return data;
  },
};
