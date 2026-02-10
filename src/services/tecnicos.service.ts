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

export interface UpdateTecnicoDTO {
  nome: string;
  email: string;
  cpf: string;
  foto: string;
  telefone?: string;
}

export const tecnicosService = {
  getAll: async () => {
    const { data } = await api.get<Tecnico[]>("/admin/tecnicos");
    return data;
  },

  update: async (id: string, data: UpdateTecnicoDTO) => {
    const response = await api.put(`/admin/tecnico/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/admin/tecnico/${id}`);
  },
};
