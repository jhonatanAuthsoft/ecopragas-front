// TODO: apagar após substituição por chamada do back
import api from "./api";

export interface LeadDTO {
  id?: string;
  nome: string;
  empresa?: string;
  email?: string;
  telefone: string;
  origem: string;
  valorEstimado: number;
  status: string;
  observacoes?: string;
  dataCriacao?: string;
}

export interface LeadResponse {
  content: LeadDTO[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const leadsService = {
  getAll: async (page = 0, size = 20, sort?: string[]) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    if (sort) {
      sort.forEach((s) => params.append("sort", s));
    }
    const response = await api.get<LeadResponse>("/admin/leads", { params });
    return response.data;
  },

  create: async (lead: Omit<LeadDTO, "id" | "dataCriacao">) => {
    const response = await api.post<LeadDTO>("/admin/leads", lead);
    return response.data;
  },

  update: async (id: string, lead: Omit<LeadDTO, "id" | "dataCriacao">) => {
    const response = await api.put<LeadDTO>(`/admin/leads/${id}`, lead);
    return response.data;
  },
};
