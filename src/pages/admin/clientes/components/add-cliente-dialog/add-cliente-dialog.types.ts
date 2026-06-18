import type { ClienteFormValues } from "@/model/rest/cliente";

export type ClienteDialogTab = "dados" | "endereco" | "documentacao";

export type InitialClienteData = Partial<
  Pick<ClienteFormValues, "nomeRazaoSocial" | "email" | "telefone" | "observacoes">
>;

export type ViaCepResponse = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};
