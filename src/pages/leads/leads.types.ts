// TODO: vai ser controlado pelo model/
export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  origin: "Google" | "Instagram" | "Indicação" | "Facebook" | "Website" | "Outro";
  value: number;
  status: "novo" | "em_contato" | "proposta_enviada" | "negociacao" | "ganho" | "perdido";
  notes?: string;
  createdAt: Date;
};
